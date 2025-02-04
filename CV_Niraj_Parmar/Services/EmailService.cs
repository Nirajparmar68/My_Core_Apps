using CV_Niraj_Parmar.Models;
using CV_Niraj_Parmar.Services.Interfaces;
using FluentEmail.Core;
using FluentEmail.Core.Models;

namespace CV_Niraj_Parmar.Services
{
    public class EmailService : IEmailService
    {
        private readonly IFluentEmail _fluentEmail;
        private readonly ILogger<EmailService> _logger;
        private readonly string _myWorkEmail = "neocorporation68@gmail.com";
        public EmailService(IFluentEmail fluentEmail, ILogger<EmailService> logger)
        {
            _fluentEmail = fluentEmail
                ?? throw new ArgumentNullException(nameof(fluentEmail));
            _logger = logger
                ?? throw new ArgumentNullException(nameof(logger));
        }
        public async Task<SendResponse> SendEmailAsync(EmailMetadata emailMetadata)
        {
            try
            {
                var email = await _fluentEmail
                    .To(_myWorkEmail)
                    .Subject(emailMetadata.Subject)
                    .Body(emailMetadata.Body)
                    .SendAsync();

                return email;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<bool> SendSinlgeEmailAsync(EmailMetadata emailMetadata)
        {
            try
            {
                var email = await _fluentEmail
                .To(emailMetadata.ToAddress)
                .Subject(emailMetadata.Subject)
                .Body(emailMetadata.Body)
                .SendAsync();

                return email.Successful;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email to {Recipient}", emailMetadata.ToAddress);
                return false;
            }
        }
    }
}
