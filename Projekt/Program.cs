using Projekt.Request;
using Projekt.Services;
using Refit;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IWeatherService, WeatherService>();
builder.Services.AddRefitClient<IWeatherApi>().ConfigureHttpClient(c => c.BaseAddress = new Uri("https://weather.visualcrossing.com"));
var app = builder.Build();
app.MapWeatherEndpoint();

app.Run();
