import { beforeAll, describe, expect, test } from "@jest/globals";
import { WeatherSummary } from "@weather/types/weather-summary.type";
import { WeatherUnit } from "@weather/constants/weather-unit";
import "dotenv/config";
import { OpenWeatherRepository } from "../repositories/open-weather.repository";
import { OpenWeatherProvider } from "./open-weather.provider";
import { WeatherListItem } from "@open-weather/types/weather.type";
import { HttpException } from "@common/constants/http-exceptions";

let openWeatherProvider: OpenWeatherProvider;
let openWeatherRepository: OpenWeatherRepository;
let apiUrl: string;
let apiKey: string;
const temperature: number = 5;
const unit: WeatherUnit = WeatherUnit.CELSIUS;
const cities: number[] = [2618425]; // Copenhagen

beforeAll(() => {
  apiUrl = String(process.env.OPEN_WEATHER_API_URL);
  apiKey = String(process.env.OPEN_WEATHER_API_KEY);
  openWeatherRepository = new OpenWeatherRepository(apiUrl, apiKey);
  openWeatherProvider = new OpenWeatherProvider(openWeatherRepository);
});

describe("OpenWeatherProvider", () => {
  test(`should return the weather summary for city id's ${cities.join(", ")} if temperature is above ${temperature}`, async () => {
    const data: WeatherSummary[] = await openWeatherProvider.getWeatherSummary({
      unit,
      cities,
      temperature,
    });
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].id).toBeDefined();
    expect(data[0].name).toBeDefined();
    expect(data[0].coord).toBeDefined();
    expect(data[0].country).toBeDefined();
    expect(data[0].population).toBeDefined();
    expect(data[0].timezone).toBeDefined();
    expect(data[0].sunrise).toBeDefined();
    expect(data[0].sunset).toBeDefined();
  });

  test("should return the city weather", async () => {
    const data: WeatherListItem[] =
      await openWeatherProvider.getWeatherByCityId({
        id: cities[0],
      });
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].main.humidity).toBeDefined();
    expect(data[0].main.temp).toBeDefined();
    expect(data[0].main.temp_max).toBeDefined();
    expect(data[0].main.temp_min).toBeDefined();
    expect(data[0].weather[0].description).toBeDefined();
    expect(data[0].weather[0].icon).toBeDefined();
    expect(data[0].dt_txt).toBeDefined();
    expect(data[0].wind.speed).toBeDefined();
    expect(data[0].wind.deg).toBeDefined();
    expect(data[0].clouds.all).toBeDefined();
    expect(data[0].sys.pod).toBeDefined();
    expect(data[0].dt).toBeDefined();
    expect(data[0].visibility).toBeDefined();
    expect(data[0].pop).toBeDefined();
    expect(data[0].dt_txt).toBeDefined();
  });

  test("should throw an error when the city id is invalid", async () => {
    const invalidCityId = 0;
    try {
      await openWeatherProvider.getWeatherByCityId({
        id: invalidCityId,
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(HttpException);
      if (error instanceof HttpException) {
        expect(error.message).toBe("Failed to fetch weather data");
      }
    }
  });
});
