// Inicjalizacja pól daty z bieżącą datą i poprzednim tygodniem
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    
    document.getElementById('dateFrom').valueAsDate = lastWeek;
    document.getElementById('dateTo').valueAsDate = today;
    
    // Ustawienie nasłuchiwania zdarzeń
    document.getElementById('currentWeatherForm').addEventListener('submit', getCurrentWeather);
    document.getElementById('historicalWeatherForm').addEventListener('submit', getHistoricalWeather);
    
    // Inicjalizacja zmiennej wykresu jako null
    window.weatherChart = null;
});

// Pobranie aktualnej pogody
async function getCurrentWeather(event) {
    event.preventDefault();
    
    const cityName = document.getElementById('currentCity').value;
    const resultDiv = document.getElementById('currentWeatherResult');
    
    resultDiv.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Ładowanie...</span></div></div>';
    
    try {
        const response = await fetch(`/api/weather/get-current?city=${encodeURIComponent(cityName)}`);
        
        if (!response.ok) {
            throw new Error(`Błąd HTTP! Status: ${response.status}`);
        }
        
        const weatherData = await response.json();
        displayCurrentWeather(weatherData, resultDiv);
    } catch (error) {
        resultDiv.innerHTML = `<div class="alert alert-danger">Błąd: ${error.message}</div>`;
        console.error('Błąd pobierania aktualnej pogody:', error);
    }
}

// Pobranie historycznej pogody
async function getHistoricalWeather(event) {
    event.preventDefault();
    
    const cityName = document.getElementById('historicalCity').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const resultDiv = document.getElementById('historicalWeatherResult');
    
    resultDiv.innerHTML = '<div class="text-center"><div class="spinner-border text-info" role="status"><span class="visually-hidden">Ładowanie...</span></div></div>';
    
    try {
        const response = await fetch(`/api/weather/get-historical?city=${encodeURIComponent(cityName)}&dateFrom=${dateFrom}&dateTo=${dateTo}`);
        
        if (!response.ok) {
            throw new Error(`Błąd HTTP! Status: ${response.status}`);
        }
        
        const weatherData = await response.json();
        displayHistoricalWeather(weatherData, resultDiv);
        createWeatherChart(weatherData);
    } catch (error) {
        resultDiv.innerHTML = `<div class="alert alert-danger">Błąd: ${error.message}</div>`;
        console.error('Błąd pobierania historycznej pogody:', error);
    }
}

// Wyświetlenie danych aktualnej pogody
function displayCurrentWeather(data, container) {
    if (!data || !data.days || data.days.length === 0) {
        container.innerHTML = '<div class="alert alert-warning">Brak dostępnych danych pogodowych</div>';
        return;
    }
    
    const currentDay = data.days[0];
    
    // Tworzenie HTML dla wyświetlenia pogody
    const html = `
        <div class="weather-card">
            <h3 class="mb-3">${data.resolvedAddress}</h3>
            <div class="weather-temp">${currentDay.temp.toFixed(1)}°C</div>
            <div class="weather-desc">${currentDay.conditions}</div>
            <div class="weather-details mt-3">
                <div class="weather-detail-item">
                    <span>Odczuwalna</span>
                    <strong>${currentDay.feelslike.toFixed(1)}°C</strong>
                </div>
                <div class="weather-detail-item">
                    <span>Min</span>
                    <strong>${currentDay.tempmin.toFixed(1)}°C</strong>
                </div>
                <div class="weather-detail-item">
                    <span>Max</span>
                    <strong>${currentDay.tempmax.toFixed(1)}°C</strong>
                </div>
                <div class="weather-detail-item">
                    <span>Wiatr</span>
                    <strong>${currentDay.windspeed.toFixed(1)} km/h</strong>
                </div>
            </div>
            <div class="mt-3">
                <p><strong>Wschód słońca:</strong> ${currentDay.sunrise}</p>
                <p><strong>Zachód słońca:</strong> ${currentDay.sunset}</p>
                <p><strong>Opis:</strong> ${currentDay.description || 'Brak dostępnego opisu'}</p>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Wyświetlenie danych historycznej pogody
function displayHistoricalWeather(data, container) {
    if (!data || !data.days || data.days.length === 0) {
        container.innerHTML = '<div class="alert alert-warning">Brak dostępnych historycznych danych pogodowych</div>';
        return;
    }
    
    // Tworzenie tabeli dla danych historycznych
    let html = `
        <h4 class="mb-3">${data.resolvedAddress}</h4>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Temp</th>
                        <th>Min</th>
                        <th>Max</th>
                        <th>Warunki</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Dodanie wierszy dla każdego dnia
    data.days.forEach(day => {
        html += `
            <tr class="historical-day" data-date="${day.datetime}">
                <td>${day.datetime}</td>
                <td>${day.temp.toFixed(1)}°C</td>
                <td>${day.tempmin.toFixed(1)}°C</td>
                <td>${day.tempmax.toFixed(1)}°C</td>
                <td>${day.conditions}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Dodanie nasłuchiwania zdarzeń do wierszy
    document.querySelectorAll('.historical-day').forEach(row => {
        row.addEventListener('click', function() {
            // Usuń klasę wybraną ze wszystkich wierszy
            document.querySelectorAll('.historical-day').forEach(r => r.classList.remove('selected-day'));
            
            // Dodaj klasę wybraną do klikniętego wiersza
            this.classList.add('selected-day');
            
            // Znajdź dane dla danego dnia
            const date = this.getAttribute('data-date');
            const dayData = data.days.find(d => d.datetime === date);
            
            // Zaktualizuj wyświetlanie aktualnej pogody danymi historycznymi
            if (dayData) {
                const currentResultDiv = document.getElementById('currentWeatherResult');
                displayCurrentWeather({ resolvedAddress: data.resolvedAddress, days: [dayData] }, currentResultDiv);
            }
        });
    });
}

// Tworzenie wykresu pogody dla danych historycznych
function createWeatherChart(data) {
    if (!data || !data.days || data.days.length === 0) return;
    
    const ctx = document.getElementById('weatherChart').getContext('2d');
    
    // Przygotowanie danych dla wykresu
    const labels = data.days.map(day => day.datetime);
    const tempData = data.days.map(day => day.temp);
    const minTempData = data.days.map(day => day.tempmin);
    const maxTempData = data.days.map(day => day.tempmax);
    
    // Zniszczenie istniejącego wykresu, jeśli istnieje
    if (window.weatherChart !== null) {
        window.weatherChart.destroy();
    }
    
    // Tworzenie nowego wykresu
    window.weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Średnia temperatura (°C)',
                    data: tempData,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Minimalna temperatura (°C)',
                    data: minTempData,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Maksymalna temperatura (°C)',
                    data: maxTempData,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Trendy temperatur dla ${data.resolvedAddress}`
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            interaction: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Temperatura (°C)'
                    }
                }
            }
        }
    });
}