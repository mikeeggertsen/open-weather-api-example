import { z } from "zod";
import { weatherSummaryArgsSchema } from "../schemas/weather-summary-args.schema";

export type WeatherSummaryArgs = z.infer<typeof weatherSummaryArgsSchema>;
