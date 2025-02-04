using Newtonsoft.Json;

namespace CV_Niraj_Parmar.Models
{
    public class RecaptchaResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; }
    }
}
