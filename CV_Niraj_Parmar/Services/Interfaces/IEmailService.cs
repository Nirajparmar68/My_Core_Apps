using CV_Niraj_Parmar.Models;
using FluentEmail.Core.Models;

namespace CV_Niraj_Parmar.Services.Interfaces
{
    public interface IEmailService
    {
        Task<SendResponse> SendEmailAsync(EmailMetadata emailMetadata);
        Task<bool> SendSinlgeEmailAsync(EmailMetadata emailMetadata);
    }
}
