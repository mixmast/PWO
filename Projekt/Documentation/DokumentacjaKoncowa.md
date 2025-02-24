# Dokumentacja Końcowa Projektu - WeatherInsight

## 1. Wprowadzenie

### 1.1 Cel dokumentu
Niniejszy dokument stanowi końcową dokumentację projektu WeatherInsight, kompleksowej aplikacji do monitorowania i analizy historycznej pogody. Dokument ten zawiera szczegółowe informacje dotyczące architektury systemu, wykorzystanych technologii, funkcjonalności, oraz instrukcje wdrożenia i użytkowania.

### 1.2 Zakres projektu
WeatherInsight to aplikacja internetowa umożliwiająca użytkownikom dostęp do bieżących i historycznych danych pogodowych z intuicyjnym interfejsem i wizualizacjami. Aplikacja integruje się z API Visual Crossing Weather do pobierania danych pogodowych i prezentuje je w czytelny sposób.

### 1.3 Skład zespołu projektowego
- Przemysław Nowak - Backend Developer / Lider Zespołu
- Wojciech Połeć - Frontend Developer
- Przemysław Nowak & Wojciech Połeć - Tester / Dokumentacja
- Wojciech Połeć - UI/UX Designer

## 2. Architektura systemu

### 2.1 Przegląd architektury
WeatherInsight wykorzystuje architekturę klient-serwer z RESTowym API. Backend aplikacji jest zbudowany na platformie ASP.NET Core, który komunikuje się z zewnętrznym API pogodowym i udostępnia dane frontendowi zbudowanemu z HTML, CSS i JavaScript.

### 2.2 Diagram architektury
```
+----------------+     +----------------+     +--------------------+
|                |     |                |     |                    |
|  Frontend      |<--->|  Backend API   |<--->|  Visual Crossing   |
|  (HTML/JS/CSS) |     |  (ASP.NET Core)|     |  Weather API       |
|                |     |                |     |                    |
+----------------+     +----------------+     +--------------------+
```

### 2.3 Komponenty systemu
- **Frontend**: Interfejs użytkownika zbudowany z HTML, CSS (Bootstrap) i JavaScript.
- **Backend API**: RESTowe API zbudowane w ASP.NET Core.
- **Serwis pogodowy**: Warstwa abstrakcji dla komunikacji z zewnętrznym API.
- **Zewnętrzne API**: Visual Crossing Weather API dostarczające dane pogodowe.

## 3. Wykorzystane technologie

### 3.1 Backend
- ASP.NET Core 8.0
- C#
- Refit (klient HTTP dla API)

### 3.2 Frontend
- HTML5
- CSS3 z Bootstrap 5
- JavaScript (ES6+)
- Chart.js (wizualizacja danych)

### 3.3 Narzędzia deweloperskie
- Visual Studio 2022
- Git (kontrola wersji)
- Postman (testowanie API)

## 4. Struktura projektu

### 4.1 Struktura katalogów
```
WeatherInsight/
├── Projekt/
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── Request/
│   │   └── WeatherRequest.cs
│   ├── Services/
│   │   ├── IWeatherApi.cs
│   │   └── IWeatherService.cs
│   ├── wwwroot/
│   │   ├── css/
│   │   │   └── site.css
│   │   ├── js/
│   │   │   └── site.js
│   │   └── index.html
│   ├── WeatherResponse.cs
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   └── Program.cs
└── Documentation/
    ├── DokumentacjaKoncowa.md
    ├── MapaDrogowa.md
    ├── PrezentacjaProjektu.md
    ├── Retrospekcja.md
    └── WizjaProjektu.md
```

### 4.2 Opis głównych plików
- **Program.cs**: Punkt wejściowy aplikacji, konfiguracja usług i potoku HTTP.
- **WeatherRequest.cs**: Definicja endpointów API dla danych pogodowych.
- **IWeatherApi.cs**: Interfejs dla klienta API Visual Crossing.
- **IWeatherService.cs**: Interfejs i implementacja serwisu pogodowego.
- **WeatherResponse.cs**: Modele danych dla odpowiedzi API.

## 5. Funkcjonalności aplikacji

### 5.1 Pobieranie bieżącej pogody
- Endpoint: `/api/weather/get-current?city={cityName}`
- Metoda: GET
- Parametry: `city` - nazwa miasta
- Zwraca: Dane pogodowe dla bieżącego dnia

### 5.2 Pobieranie historycznej pogody
- Endpoint: `/api/weather/get-historical?city={cityName}&dateFrom={dateFrom}&dateTo={dateTo}`
- Metoda: GET
- Parametry:
  - `city` - nazwa miasta
  - `dateFrom` - data początkowa (format: YYYY-MM-DD)
  - `dateTo` - data końcowa (format: YYYY-MM-DD)
- Zwraca: Dane pogodowe dla wybranego zakresu dat

### 5.3 Wizualizacja danych
Aplikacja oferuje wizualizację danych w formie:
- Kart informacyjnych dla bieżącej pogody
- Tabelarycznego widoku dla danych historycznych
- Interaktywnych wykresów dla trendów temperatur (min, max, średnia)

## 6. Interfejs użytkownika

### 6.1 Strona główna
Strona główna zawiera dwa główne panele:
- Panel bieżącej pogody - pozwala użytkownikowi sprawdzić aktualną pogodę dla wybranego miasta
- Panel historycznej pogody - umożliwia analizę historycznych danych pogodowych

### 6.2 Interakcje użytkownika
- Wprowadzanie nazwy miasta
- Wybór zakresu dat dla danych historycznych
- Przeglądanie i interakcja z wykresami
- Wybór poszczególnych dni z tabeli historycznej

## 7. API i integracje

### 7.1 Visual Crossing Weather API
Aplikacja wykorzystuje Visual Crossing Weather API do pobierania danych pogodowych:
- Bazowy URL: `https://weather.visualcrossing.com`
- Endpointy:
  - `/VisualCrossingWebServices/rest/services/timeline/{city}` - bieżąca pogoda
  - `/VisualCrossingWebServices/rest/services/timeline/{city}/{date1}/{date2}` - historyczna pogoda

### 7.2 Autentykacja API
Aplikacja używa klucza API dla autentykacji z Visual Crossing Weather API. Klucz jest przechowywany w kodzie serwisu pogodowego.

## 8. Instrukcja wdrożenia

### 8.1 Wymagania systemowe
- .NET 8.0 SDK lub nowszy
- Nowoczesna przeglądarka internetowa
- Dostęp do internetu (dla komunikacji z API pogodowym)

### 8.2 Kroki instalacji
1. Sklonuj repozytorium projektu z systemu kontroli wersji
2. Otwórz terminal w katalogu projektu
3. Uruchom polecenie `dotnet restore` aby zainstalować zależności
4. Uruchom polecenie `dotnet build` aby skompilować projekt
5. Uruchom polecenie `dotnet run` aby uruchomić aplikację

### 8.3 Konfiguracja
- Aplikacja domyślnie uruchamia się na portach:
  - HTTP: 5265
  - HTTPS: 7048
- Ustawienia można zmienić w pliku `Properties/launchSettings.json`

## 9. Instrukcja użytkowania

### 9.1 Sprawdzanie bieżącej pogody
1. Otwórz aplikację w przeglądarce
2. W panelu "Aktualna pogoda" wprowadź nazwę miasta
3. Kliknij przycisk "Sprawdź pogodę"
4. Wyniki zostaną wyświetlone poniżej formularza

### 9.2 Analiza historycznej pogody
1. W panelu "Historyczna pogoda" wprowadź nazwę miasta
2. Wybierz datę początkową i końcową z kalendarza
3. Kliknij przycisk "Pobierz dane historyczne"
4. Dane zostaną wyświetlone w tabeli, a trendy na wykresie
5. Kliknij na wiersz w tabeli, aby zobaczyć szczegóły dla wybranego dnia

## 10. Znane ograniczenia i plany rozwoju

### 10.1 Ograniczenia
- Aplikacja jest ograniczona limitem zapytań do API Visual Crossing Weather
- Brak mechanizmu cachowania danych (każde zapytanie pobiera dane z API)
- Brak obsługi błędów sieciowych i trybu offline

### 10.2 Plany rozwoju
- Dodanie systemu uwierzytelniania użytkowników
- Implementacja cachowania danych
- Dodanie opcji wykrywania lokalizacji użytkownika
- Rozszerzenie funkcji wizualizacji danych
- Dodanie powiadomień pogodowych

## 11. Wnioski

WeatherInsight to funkcjonalna aplikacja dostarczająca użytkownikom aktualne i historyczne dane pogodowe w przyjazny i intuicyjny sposób. Projekt został zrealizowany zgodnie z założeniami i wymaganiami, z wykorzystaniem nowoczesnych technologii webowych.

Aplikacja stanowi solidną podstawę do dalszego rozwoju i rozbudowy o dodatkowe funkcjonalności, które mogą jeszcze bardziej zwiększyć jej użyteczność dla końcowych użytkowników.

---

## Załączniki

### Załącznik A: Słownik pojęć
- **API** - Application Programming Interface, interfejs programistyczny aplikacji
- **Endpoint** - Punkt końcowy API, adres URL używany do komunikacji z API
- **Frontend** - Część aplikacji widoczna i dostępna dla użytkownika
- **Backend** - Część aplikacji działająca po stronie serwera, niewidoczna dla użytkownika
- **REST** - Representational State Transfer, styl architektury oprogramowania

### Załącznik B: Przykłady odpowiedzi API

#### Przykładowa odpowiedź dla bieżącej pogody
```json
{
  "queryCity": 1,
  "latitude": 50.041111,
  "longitude": 21.999119,
  "resolvedAddress": "Rzeszów, Woj. Podkarpackie, Polska",
  "address": "Rzeszow",
  "timezone": "Europe/Warsaw",
  "tzoffset": 1.0,
  "days": [
    {
      "datetime": "2025-02-24",
      "datetimeEpoch": 1708815600,
      "tempmax": 3.0,
      "tempmin": 1.0,
      "temp": 2.2,
      "feelslike": -0.9,
      "preciptype": ["Snow", "Rain", "Freezing Drizzle"],
      "windspeed": 16.6,
      "sunrise": "06:25:14",
      "sunset": "17:05:57",
      "moonphase": 0.81,
      "conditions": "Snow, Rain, Freezing Drizzle/Freezing Rain, Overcast",
      "description": "Cloudy skies throughout the day with rain or snow.",
      "icon": "snow",
      "source": "fcst"
    }
  ]
}
```