# Weather Integration API

## Description

This project implements an integration layer for weather data to ensure that API rate limits are not exceeded when querying OpenWeatherMap. The solution provides two endpoints to query weather data while controlling the number of calls made to the third-party API.

## API Endpoints

### `GET /weather/summary`

This endpoint returns a list of the user's favorite cities where the temperature will be above a certain threshold on the next day. The favorite cities are passed by the client.

#### Query Parameters:

- **unit (string)**: The unit for the temperature (celsius or fahrenheit).
- **temperature (integer)**: The minimum temperature threshold.
- **cities (string)**: A comma-separated list of city IDs.

Example Request: `GET /weather/summary?unit=celsius&temperature=5&cities=2618425`

Example Response:

```json
[
  {
    "id": 2618425,
    "name": "Copenhagen",
    "coord": {
      "lat": 55.6759,
      "lon": 12.5655
    },
    "country": "DK",
    "population": 0,
    "timezone": 3600,
    "sunrise": 1742533756,
    "sunset": 1742577869
  },
  ...
]
```

### `GET /weather/cities/<city_id>`

This endpoint returns the weather forecast for the next 5 days for a specific city.

#### Path Parameter:

- **city_id (integer)**: The ID of the city.

Example Request: `GET /weather/cities/2618425`

Example Response:

```json
[
  {
    "dt": 1742558400,
    "main": {
      "temp": 282.87,
      "feels_like": 280.43,
      "temp_min": 282.14,
      "temp_max": 282.87,
      "pressure": 1024,
      "sea_level": 1024,
      "grnd_level": 1023,
      "humidity": 52,
      "temp_kf": 0.73
    },
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }
    ],
    "clouds": {
      "all": 2
    },
    "wind": {
      "speed": 4.9,
      "deg": 104,
      "gust": 7.2
    },
    "visibility": 10000,
    "pop": 0,
    "sys": {
      "pod": "d"
    },
    "dt_txt": "2025-03-21 12:00:00"
  },
  ...
]
```

### Setup and Installation

Clone this repository:

`git clone https://github.com/shape-interviews/backend-take-home-mikeeggertsen.git`

Install dependencies:

`pnpm install`

Set up your OpenWeatherMap API key. Add the following to your environment variables:

```
OPEN_WEATHER_API_URL=https://api.openweathermap.org/data
OPEN_WEATHER_API_KEY=YOUR_API_KEY
PORT=3000
NODE_ENV=development
```

Start the server:

`pnpm run dev`

The server will run locally on port 3000 or the port you've specified in your .env file.

You can test the API by making requests to:

`http://localhost:3000/weather/summary`

`http://localhost:3000/weather/cities/{city_id}`

### Project Structure

- **src/**: Contains all the application code.
- **infrastructure/**: Contains all the application infrastructure code.
- **open-weather/**: Contains all the code regarding the third-party OpenWeatherMap API.
- **weather/**: Contains the code handling the API requests .
- **common/**: Stores miscellanous common code including environment variables, helpers, middleware etc.

### Rate Limiting

To ensure that we stay within the rate limit of the OpenWeatherMap API (10,000 requests per day), the integration layer implements a caching mechanism. It caches the responses for weather data to avoid making multiple API calls for the same data in a short period of time.

### Error Handling

The application includes basic error handling for:

- **HttpExceptions**: For standard HTTP errors e.g NotFound, InternalServerError etc.
- **ZodErrors**: For invalid input parameters

### Tests

The solution includes tests for API endpoints using Jest. To run the tests:
`pnpm run test`

### Github Actions Workflows

To make the test workflow work, you need to add the environment variables to the repository secrects & variables.

1. Go to `Settings`
2. Then go to `Secrets and Variables` under `Security`
3. Then click the `Actions` menu item.
4. Finally add the `OPEN_WEATHER_API_KEY` to your `Secrets` and add the rest under `Variables`

### Future Improvements

- Caching Mechanism: Implement a more robust caching system (e.g Redis) to store weather data for longer periods, reducing the number of API calls.
- Error Monitoring: Add a centralized logging and error monitoring system (e.g., using Sentry).
- Rate Limiting for Multiple Users: Extend the rate limiting logic to consider multiple users and prioritize based on user requests.
- More iterations: To ensure better experience from the consumer point of view, feedback should be prioritized to iterate on API e.g optimizing the response model, performance etc.
- More test coverage: Expand the test suite to include additional edge cases, error handling scenarios, and integration tests to ensure robustness and reliability.
