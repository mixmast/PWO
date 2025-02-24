# WeatherInsight
## Kompleksowy system monitorowania i analizy historycznej pogody

---

## Zespół projektowy

- Przemysław Nowak - Backend Developer / Lider Zespołu
- Wojciech Połeć - Frontend Developer
- Przemysław Nowak & Wojciech Połeć - Tester / Dokumentacja
- Wojciech Połeć - UI/UX Designer

---

## Problem

- Informacje pogodowe są kluczowe dla codziennego planowania i podejmowania decyzji
- Istniejące rozwiązania często nie posiadają możliwości analizy historycznej
- Użytkownicy potrzebują zarówno bieżących warunków, jak i historycznych wzorców pogodowych
- Wizualizacja danych pogodowych jest zazwyczaj ograniczona lub zbyt skomplikowana

---

## Nasze rozwiązanie: WeatherInsight

Kompleksowa aplikacja webowa, która:

- Dostarcza bieżące dane pogodowe dla dowolnej lokalizacji
- Umożliwia analizę historycznych danych pogodowych z możliwością dostosowania zakresu dat
- Prezentuje dane w intuicyjny i wizualny sposób
- Zapewnia prosty i przyjazny dla użytkownika interfejs

---

## Główne funkcjonalności

- **Monitorowanie bieżącej pogody**
  - Temperatura aktualna, odczuwalna, minimalna i maksymalna
  - Prędkość wiatru
  - Wschód i zachód słońca
  - Warunki pogodowe i opis

- **Analiza historycznej pogody**
  - Wybór dowolnego zakresu dat
  - Tabela z danymi dziennymi
  - Wykresy trendów temperatur
  - Szczegółowe informacje dla wybranych dni

---

## Technologie

**Backend:**
- ASP.NET Core 8.0
- C#
- Refit (klient HTTP dla API)

**Frontend:**
- HTML5, CSS3 z Bootstrap 5
- JavaScript
- Chart.js (wizualizacja danych)

**Integracje:**
- Visual Crossing Weather API

---

## Architektura systemu

```
+----------------+     +----------------+     +--------------------+
|                |     |                |     |                    |
|  Frontend      |<--->|  Backend API   |<--->|  Visual Crossing   |
|  (HTML/JS/CSS) |     |  (ASP.NET Core)|     |  Weather API       |
|                |     |                |     |                    |
+----------------+     +----------------+     +--------------------+
```

- **Frontend** - Warstwa prezentacji z interfejsem użytkownika
- **Backend API** - Serwer pośredniczący, obsługujący zapytania
- **Zewnętrzne API** - Źródło danych pogodowych

---

## Demonstracja

- Strona główna z panelami pogodowymi
- Panel aktualnej pogody z danymi dla Rzeszowa
- Panel historycznej pogody z tabelą i wykresem
- Responsywność aplikacji na urządzeniach mobilnych

---

## Proces rozwoju

1. **Faza 1**: Inicjalizacja projektu i badania
   - Definicja wymagań i zakresu
   - Wybór technologii i API

2. **Faza 2**: Rozwój backendu
   - Integracja z API pogodowym
   - Implementacja endpointów

3. **Faza 3**: Rozwój frontendu
   - Stworzenie responsywnego interfejsu
   - Implementacja wizualizacji danych

4. **Faza 4**: Testowanie i dokumentacja

---

## Wyzwania i rozwiązania

**Wyzwania:**
- Integracja z zewnętrznym API pogodowym
- Efektywne wyświetlanie dużej ilości danych historycznych
- Tworzenie intuicyjnych wizualizacji danych

**Rozwiązania:**
- Warstwa abstrakcji serwisu dla uproszczenia integracji
- Paginacja i filtrowanie danych
- Wykorzystanie biblioteki Chart.js dla interaktywnych wykresów

---

## Rezultaty projektu

- Funkcjonalna aplikacja webowa do monitorowania i analizy pogody
- Intuicyjny interfejs użytkownika z responsywnym designem
- Kompleksowa integracja z API pogodowym
- Interaktywne wizualizacje danych pogodowych

---

## Plany na przyszłość

- Implementacja kont użytkowników i zapisywanie ulubionych lokalizacji
- Dodanie opcji powiadomień pogodowych
- Rozszerzenie możliwości analizy danych
- Stworzenie aplikacji mobilnej
- Integracja z dodatkowymi źródłami danych pogodowych

---

## Wnioski

- WeatherInsight skutecznie łączy bieżące i historyczne dane pogodowe
- Aplikacja oferuje wartość dodaną poprzez intuicyjną wizualizację danych
- Projekt dostarczył zespołowi cennych doświadczeń w rozwoju aplikacji webowych
- Stworzona aplikacja stanowi solidną podstawę do dalszego rozwoju

---

## Pytania?

Dziękujemy za uwagę!

- GitHub: [\[link do repozytorium\]](https://github.com/mixmast/PWO)