using System.Net;
using System.Net.Mail;

namespace CV_Niraj_Parmar.Services
{
    public static class FluentEmailExtensions
    {
        public static IServiceCollection AddFluentEmail(this IServiceCollection services, ConfigurationManager configuration)
        {
            try
            {
                var emailSettings = configuration.GetSection("EmailSettings");
                var defaultFromEmail = emailSettings["DefaultFromEmail"];
                var host = emailSettings["EmailHost"];
                var port = emailSettings.GetValue<int>("EmailPort");
                var enableSsl = emailSettings.GetValue<bool>("EnableSsl");
                var userName = emailSettings["UserName"];
                var password = emailSettings["Password"];
                services.AddFluentEmail(defaultFromEmail)
                .AddSmtpSender(() => new SmtpClient(host, port)
                {
                    EnableSsl = enableSsl,
                    UseDefaultCredentials = false,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(userName, password),
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return services;
        }
    }
}
