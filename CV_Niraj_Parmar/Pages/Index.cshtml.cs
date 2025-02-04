using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CV_Niraj_Parmar.Pages
{
    public class IndexModel : PageModel
    {
        // Example Date of Birth
        public DateTime DateOfBirth { get; set; } = new DateTime(1994, 01, 07);

        public void OnGet()
        {

        }

        public int CalculateAge(DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;

            if (dob.Date > today.AddYears(-age)) age--; // Adjust if birthday hasn't occurred yet this year

            return age;
        }
    }
}