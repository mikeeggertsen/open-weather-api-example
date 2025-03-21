import { z } from "zod";
import { weatherSummaryParamsSchema } from "../schemas/weather-summary-params.schema";

export type WeatherSummaryParams = z.infer<typeof weatherSummaryParamsSchema>;
