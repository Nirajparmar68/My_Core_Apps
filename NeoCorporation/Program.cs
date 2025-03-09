var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles(); // Enables index.html as default
app.UseStaticFiles(); // Allows serving static files like HTML, CSS, JS from wwwroot

app.Run();
