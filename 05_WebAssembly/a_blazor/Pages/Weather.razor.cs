using a_blazor.Models;
using Microsoft.AspNetCore.Components;
using System.Net.Http.Json;

namespace a_blazor.Pages;

public partial class Weather : ComponentBase
{
    [Inject]
    private HttpClient Http { get; set; } = default!;

    private WeatherForecast[]? forecasts;

    protected override async Task OnInitializedAsync()
    {
        forecasts = await Http.GetFromJsonAsync<WeatherForecast[]>("sample-data/weather.json");
    }
}
