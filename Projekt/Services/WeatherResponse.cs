using Refit;
using System.Threading.Tasks;


public class WeatherResponse
{
    public int QueryCost { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string ResolvedAddress { get; set; }
    public string Address { get; set; }
    public string Timezone { get; set; }
    public double Tzoffset { get; set; }
    public List<Day> Days { get; set; }
}

public class Day
{
    public string Datetime { get; set; }
    public int DatetimeEpoch { get; set; }
    public double Tempmax { get; set; }
    public double Tempmin { get; set; }
    public double Temp { get; set; }
    public double Feelslike { get; set; }
    public List<string> Preciptype { get; set; }
    public double Windspeed { get; set; }
    public string Sunrise { get; set; }
    public string Sunset { get; set; }
    public double Moonphase { get; set; }
    public string Conditions { get; set; }
    public string Description { get; set; }
    public string Icon { get; set; }
    public string Source { get; set; }
    //public List<Hour> Hours { get; set; }
}

//public class Hour
//{
//    public string Datetime { get; set; }
//    public int DatetimeEpoch { get; set; }
//    public double Temp { get; set; }
//    public double Feelslike { get; set; }
//    public List<string> Preciptype { get; set; }
//    public double Windspeed { get; set; }
//    public string Conditions { get; set; }
//    public string Icon { get; set; }
//    public string Source { get; set; }
//}