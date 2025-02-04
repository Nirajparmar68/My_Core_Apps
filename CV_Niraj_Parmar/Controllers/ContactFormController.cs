using CV_Niraj_Parmar.Models;
using CV_Niraj_Parmar.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CV_Niraj_Parmar.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class ContactFormController : ControllerBase
    {
        private readonly ILogger<ContactFormController> _logger;
        private readonly IEmailService? _emailService;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private EmailMetadata EmailMetadata { get; set; } = default!;

        public ContactFormController(ILogger<ContactFormController> logger,
            IEmailService emailService,
            IConfiguration configuration,
            HttpClient httpClient)
        {
            _logger = logger;
            _emailService = emailService;
            _configuration = configuration;
            _httpClient = httpClient;
        }


        [HttpGet("{id}")]
        public string Get(int id)
        {
            _logger.LogInformation("Received request to send contact form.");
            return "value";
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromForm] ContactFormModel model, [FromForm] string recaptchaResponse)
        {
            _logger.LogInformation("Received request to send contact form.");

            if (string.IsNullOrEmpty(recaptchaResponse))
            {
                return BadRequest(new { success = false, errorMessage = "reCAPTCHA token is required." });
            }

            bool isHuman = await VerifyReCaptcha(recaptchaResponse);
            if (!isHuman)
            {
                return BadRequest(new { success = false, errorMessage = "reCAPTCHA validation failed." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid form data");
            }

            try
            {
                // ✅ 2. Send email if CAPTCHA is valid
                EmailMetadata = new EmailMetadata(model.Email, model.Subject, $"Name: {model.Name}\nEmail: {model.Email}\nSubject: {model.Subject}\nMessage: {model.Message}");

                if (_emailService != null)
                {
                    var email = await _emailService.SendEmailAsync(EmailMetadata);

                    if (email.Successful)
                    {
                        return Ok("OK");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                _logger.LogError("Error sending email: " + ex.Message);
                return StatusCode(500, "Error sending message. Please try again.");
            }
            return StatusCode(500, "Unexpected error occurred.");
        }

        // ✅ Function to Verify reCAPTCHA
        private async Task<bool> VerifyReCaptcha(string recaptchaResponse)
        {
            var secretKey = _configuration["reCAPTCHA:SecretKey"];

            var response = await _httpClient.PostAsync(
                $"https://www.google.com/recaptcha/api/siteverify?secret={secretKey}&response={recaptchaResponse}",
                null
            );

            var jsonResponse = await response.Content.ReadAsStringAsync();
            using var jsonDoc = JsonDocument.Parse(jsonResponse);

            // Check reCAPTCHA success and minimum score threshold (e.g., 0.5)
            bool isSuccess = jsonDoc.RootElement.GetProperty("success").GetBoolean();
            double score = jsonDoc.RootElement.GetProperty("score").GetDouble();
            string action = jsonDoc.RootElement.GetProperty("action").GetString() ?? string.Empty;

            return isSuccess && score >= 0.5 && action == "CONTACT_FORM_SUBMIT";
        }

    }
}
