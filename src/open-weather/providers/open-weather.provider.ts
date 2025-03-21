import { DateHelper } from "@common/helpers/date-helper";
import { WeatherSummaryArgs } from "@weather/types/weather-summary-args.type";
import { WeatherUnitAdapter } from "../adapters/weather-unit.adapter";
import { OpenWeatherUnit } from "../constants/open-weather-unit";
import { OpenWeatherRepository } from "../repositories/open-weather.repository";
import { CityWeatherArgs } from "../../weather/types/city-weather-args.type";
import { WeatherListItem, WeatherResponse } from "../types/weather.type";
import { WeatherSummary } from "@weather/types/weather-summary.type";

export class OpenWeatherProvider {
  constructor(private readonly openWeatherRepository: OpenWeatherRepository) {}

  async getWeatherSummary(args: WeatherSummaryArgs): Promise<WeatherSummary[]> {
    const summary: (WeatherSummary | undefined)[] = await Promise.all(
      args.cities.map(async (cityId) => {
        const formattedUnit: OpenWeatherUnit = WeatherUnitAdapter.convertUnit(
          args.unit,
        );

        const res: WeatherResponse =
          await this.openWeatherRepository.getWeatherByCityId({
            id: cityId,
            units: formattedUnit,
          });

        const tomorrowsWeather: WeatherListItem[] = res.list.filter((item) => {
          const weatherDate: Date = new Date(item.dt * 1000);
          return DateHelper.isTomorrow(weatherDate);
        });

        const hasWeatherAboveTemperature: boolean = tomorrowsWeather.some(
          (item) => item.main.temp >= args.temperature,
        );

        if (!hasWeatherAboveTemperature) {
          return;
        }

        return res.city;
      }),
    );
    const filteredSummary: WeatherSummary[] = summary.filter(
      (item) => item !== undefined,
    );
    return filteredSummary;
  }

  async getWeatherByCityId(
    params: CityWeatherArgs,
  ): Promise<WeatherListItem[]> {
    const res: WeatherResponse =
      await this.openWeatherRepository.getWeatherByCityId(params);
    return res.list;
  }
}
