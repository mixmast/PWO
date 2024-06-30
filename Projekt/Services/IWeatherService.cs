namespace Projekt.Services;

public interface IWeatherService
{
    Task<WeatherResponse> GetHistoricalWeatherAsync(string city, string dateFrom, string dateTo );
    Task<WeatherResponse> GetCurrentWeatherAsync(string city );
}

public class WeatherService : IWeatherService
{
    private readonly IWeatherApi weatherApi;
    private readonly string apiKey;

    public WeatherService(IWeatherApi weatherApi)
    {
        this.weatherApi = weatherApi;
        this.apiKey = "S7Y23NARKNR9MSGUERJJ3H98D";
    }
    public async Task<WeatherResponse> GetCurrentWeatherAsync(string city)
    {
        return await weatherApi.GetCurrentWeatherAsync(city, apiKey);
    }

    public async Task<WeatherResponse> GetHistoricalWeatherAsync(string city, string dateFrom, string dateTo)
    {
        return await weatherApi.GetHistoricalWeatherAsync(city, dateFrom, dateTo, apiKey);
    }
}