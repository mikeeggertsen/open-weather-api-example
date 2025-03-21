import { z } from "zod";
import { weatherUnitSchema } from "./weather-unit.schema";

export const weatherSummaryParamsSchema = z.object({
  unit: weatherUnitSchema,
  temperature: z.string(),
  cities: z.string(),
});
