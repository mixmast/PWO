using Refit;
using System.Threading.Tasks;

public interface IWeatherApi
{
    [Get("/VisualCrossingWebServices/rest/services/timeline/{city}")]
    Task<WeatherResponse> GetCurrentWeatherAsync(string city, [Query] string key, [Query] string unitGroup = "metric");

    [Get("/VisualCrossingWebServices/rest/services/timeline/{city}/{date1}/{date2}")]
    Task<WeatherResponse> GetHistoricalWeatherAsync(string city, string date1, string date2,[Query] string key, [Query] string unitGroup = "metric");
}