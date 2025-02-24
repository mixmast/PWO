using Projekt.Request;
using Projekt.Services;
using Refit;

var builder = WebApplication.CreateBuilder(args);

// Dodanie usług do kontenera
builder.Services.AddScoped<IWeatherService, WeatherService>();
builder.Services.AddRefitClient<IWeatherApi>().ConfigureHttpClient(c => c.BaseAddress = new Uri("https://weather.visualcrossing.com"));

// Dodanie polityki CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", 
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Konfiguracja potoku żądań HTTP
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowAll");

// Włączenie serwowania plików statycznych z folderu wwwroot
app.UseDefaultFiles();
app.UseStaticFiles();

// Mapowanie endpointów API
app.MapWeatherEndpoint();

// Dodanie trasy fallback do index.html dla zachowania podobnego do SPA
app.MapFallbackToFile("index.html");

app.Run();