using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CV_Niraj_Parmar.Pages
{
    public class PortfolioDetailsModel : PageModel
    {
        public string Id { get; set; } = default!;
        public PortfolioItem? Portfolio { get; set; } = default!;

        public void OnGet(string id)
        {
            Id = id;

            // Mock data (Replace with DB or API)
            var portfolioItems = new List<PortfolioItem>
            {
                new PortfolioItem { Id = "arabic-poetry", Title = "Arabic Poetry", Description = "A mobile app for exploring and saving Arabic poetry.", ImageUrl = "/assets/img/portfolio/arabic-poetry.webp" },
                new PortfolioItem { Id = "the-dojo", Title = "The Dojo", Description = "A web platform for martial arts enthusiasts to book training and track progress.", ImageUrl = "/assets/img/portfolio/the-dojo.webp" },
                new PortfolioItem { Id = "bookie", Title = "Bookie", Description = "A bookstore app with secure payments and AI-powered recommendations.", ImageUrl = "/assets/img/portfolio/bookie.webp" },
                new PortfolioItem { Id = "mutah-it", Title = "Mutah IT", Description = "A digital business card generator for professionals.", ImageUrl = "/assets/img/portfolio/mutah-it.webp" },
                new PortfolioItem { Id = "astro", Title = "Astro", Description = "A horoscope is used to provide information about the present and to predict events to come.", ImageUrl = "/assets/img/portfolio/astro.png" },
                new PortfolioItem { Id = "logi-work", Title = "Logi Work", Description = "A logistics and fleet management application with live tracking.", ImageUrl = "/assets/img/portfolio/logiwork.png" },
                new PortfolioItem { Id = "voice-converter", Title = "Voice Converter", Description = "An app that converts voice recordings into multiple text formats.", ImageUrl = "/assets/img/portfolio/voice_converter.png" },
                new PortfolioItem { Id = "gekko", Title = "Gekko", Description = "Gekko is a Bitcoin TA trading and backtesting platform that connects to popular Bitcoin exchanges. It is written in JavaScript and runs on Node.js.", ImageUrl = "/assets/img/portfolio/gekko.png" },
                new PortfolioItem { Id = "search-engine", Title = "Search Engine", Description = "A lightweight and efficient web search engine for curated content.", ImageUrl = "/assets/img/portfolio/search_engine.png" }
            };


            Portfolio = portfolioItems.FirstOrDefault(p => p.Id == id);
        }

        public class PortfolioItem
        {
            public string Id { get; set; } = default!;
            public string Title { get; set; } = default!;
            public string Description { get; set; } = default!;
            public string ImageUrl { get; set; } = default!;
        }
    }
}
