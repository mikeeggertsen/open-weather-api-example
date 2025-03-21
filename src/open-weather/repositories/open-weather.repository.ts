import { HttpException } from "@common/constants/http-exceptions";
import { HttpStatus } from "@common/constants/http-status";
import { InMemoryDataSource } from "@infrastructure/in-memory-data-source";
import { CityWeatherArgs } from "../../weather/types/city-weather-args.type";
import { WeatherResponse } from "../types/weather.type";

export class OpenWeatherRepository extends InMemoryDataSource<WeatherResponse> {
  constructor(
    private readonly openWeatherApiUrl: string,
    private readonly openWeatherApiKey: string,
  ) {
    super();
  }

  async getWeatherByCityId(args: CityWeatherArgs): Promise<WeatherResponse> {
    const baseUrl: string = `${this.openWeatherApiUrl}/2.5/forecast`;

    const key: string = this.generateKey(baseUrl, args);
    const cachedResponse = this.get(key);
    if (cachedResponse) {
      return cachedResponse;
    }

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(args)) {
      params.set(key, value.toString());
    }
    params.set("appid", this.openWeatherApiKey);

    const url = `${baseUrl}?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new HttpException(
        "Failed to fetch weather data",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const data: WeatherResponse = (await res.json()) as WeatherResponse;
    this.save(key, data);
    return data;
  }
}
