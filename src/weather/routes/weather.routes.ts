import { Hono } from "hono";
import { weatherSummaryParamsSchema } from "../schemas/weather-summary-params.schema";
import { WeatherSummaryParams } from "../types/weather-summary.params.type";
import { OpenWeatherProvider } from "@open-weather/providers/open-weather.provider";
import { container } from "@common/di-container";
import { OpenWeatherInjectables } from "@open-weather/constants/injectables";
import { WeatherListItem } from "@open-weather/types/weather.type";
import { CityWeatherArgs } from "@weather/types/city-weather-args.type";
import { WeatherSummaryArgs } from "../types/weather-summary-args.type";
import { WeatherSummary } from "@weather/types/weather-summary.type";
import { IBaseRoutes } from "@common/interfaces/base-routes.interface";

export class WeatherRoutes implements IBaseRoutes {
  constructor(private readonly app: Hono) {}

  register() {
    this.app.get("/weather/summary", async (c) => {
      const params = c.req.query();
      const weatherParams: WeatherSummaryParams =
        weatherSummaryParamsSchema.parse(params);

      const weatherArgs: WeatherSummaryArgs = {
        cities: weatherParams.cities.split(",").map(Number),
        temperature: Number(weatherParams.temperature),
        unit: weatherParams.unit,
      };

      const provider: OpenWeatherProvider = container.resolve(
        OpenWeatherInjectables.OpenWeatherProvider,
      );

      const data: WeatherSummary[] =
        await provider.getWeatherSummary(weatherArgs);
      return c.json(data);
    });

    this.app.get("/weather/cities/:cityId", async (c) => {
      const cityId: string = c.req.param("cityId");

      const provider: OpenWeatherProvider = container.resolve(
        OpenWeatherInjectables.OpenWeatherProvider,
      );

      const params: CityWeatherArgs = {
        id: Number(cityId),
      };

      const data: WeatherListItem[] = await provider.getWeatherByCityId(params);
      return c.json(data);
    });
  }
}
