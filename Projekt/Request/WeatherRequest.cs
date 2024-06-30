using Microsoft.AspNetCore.Mvc;
using Projekt.Services;

namespace Projekt.Request;
internal static class WeatherRequests
{
    public static WebApplication MapWeatherEndpoint(this WebApplication app)
    {
        app.MapGet("/api/weather/get-current", WeatherRequests.GetCurrent);
        app.MapGet("/api/weather/get-historical", WeatherRequests.GetHistorical);

        return app;
    }

    private static async Task<IResult> GetCurrent(IWeatherService service, [FromQuery] string city)
    {
        var response = await service.GetCurrentWeatherAsync(city);

        return Results.Ok(response);
    }

    private static async Task<IResult> GetHistorical(IWeatherService service, [FromQuery] string city, [FromQuery] string dateFrom, [FromQuery] string dateTo)
    {
        var response = await service.GetHistoricalWeatherAsync(city, dateFrom,dateTo);

        return Results.Ok(response);
    }
}