import { z } from "zod";
import { cityWeatherArgsSchema } from "../schemas/city-weather-args.schema";

export type CityWeatherArgs = z.infer<typeof cityWeatherArgsSchema>;
