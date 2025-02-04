using CV_Niraj_Parmar.Models;
using CV_Niraj_Parmar.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CV_Niraj_Parmar.Pages.Shared
{
    public class _ContactForm : PageModel
    {
        private readonly IEmailService? _emailService;

        public _ContactForm(IEmailService? emailService)
        {
            _emailService = emailService;
            StatusMessage = string.Empty;
        }

        private EmailMetadata emailMetadata { get; set; } = default!;
        [BindProperty]
        public ContactFormModel ContactForm { get; set; } = new();
        public string StatusMessage { get; set; } = string.Empty;

        public void OnGet()
        {
        }
        public void OnPost()
        {
        }

        public async Task<IActionResult> SendEmailAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            try
            {

                emailMetadata.ToAddress = ContactForm.Email;
                emailMetadata.Subject = $"Name: {ContactForm.Name}\nEmail: {ContactForm.Email}\nMessage: {ContactForm.Message}";
                emailMetadata.Body = ContactForm.Message;

                if (_emailService != null)
                {
                    var email = await _emailService.SendEmailAsync(emailMetadata);

                    if (email.Successful)
                    {
                        StatusMessage = "Your message has been sent successfully!";
                        ModelState.Clear();
                    }
                }
            }
            catch
            {
                StatusMessage = "Error sending message. Please try again.";
            }

            return Page();
        }
    }
}
