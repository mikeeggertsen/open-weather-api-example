import { describe, expect, test } from "@jest/globals";
import { app } from "../../src/app";
import { WeatherUnit } from "../../src/weather/constants/weather-unit";
import { HttpStatus } from "../../src/common/constants/http-status";
import { WeatherSummary } from "../../src/weather/types/weather-summary.type";
import { WeatherListItem } from "../../src/open-weather/types/weather.type";

const temperature: number = 5;
const unit: WeatherUnit = WeatherUnit.CELSIUS;
const cities: number[] = [2618425]; // Copenhagen

describe("Weather API", () => {
  test("GET /weather/summary", async () => {
    const params = new URLSearchParams();
    params.set("cities", cities.join(","));
    params.set("unit", unit);
    params.set("temperature", String(temperature));

    const res = await app.request(`/weather/summary?${params.toString()}`);
    const data = (await res.json()) as WeatherSummary[];

    expect(res).toBeDefined();
    expect(res.ok).toBeTruthy();
    expect(res.status).toBe(HttpStatus.OK);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].id).toBeDefined();
    expect(data[0].name).toBeDefined();
    expect(data[0].country).toBeDefined();
    expect(data[0].coord).toBeDefined();
    expect(data[0].population).toBeDefined();
    expect(data[0].timezone).toBeDefined();
    expect(data[0].sunrise).toBeDefined();
    expect(data[0].sunset).toBeDefined();
  });

  test("GET /weather/cities/<city_id>", async () => {
    const res = await app.request(`/weather/cities/${cities[0]}`);
    const data = (await res.json()) as WeatherListItem[];
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
});
