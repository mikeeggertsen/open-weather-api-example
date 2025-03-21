import { z } from "zod";
import { WeatherUnit } from "../constants/weather-unit";

export const weatherUnitSchema = z.nativeEnum(WeatherUnit);
