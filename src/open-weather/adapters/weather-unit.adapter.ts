import { WeatherUnit } from "@weather/constants/weather-unit";
import { OpenWeatherUnit } from "../constants/open-weather-unit";

export class WeatherUnitAdapter {
  static convertUnit(unit: WeatherUnit): OpenWeatherUnit {
    switch (unit) {
      case WeatherUnit.CELSIUS:
        return OpenWeatherUnit.METRIC;
      case WeatherUnit.FAHRENHEIT:
        return OpenWeatherUnit.IMPERIAL;
      default:
        return OpenWeatherUnit.STANDARD;
    }
  }
}
