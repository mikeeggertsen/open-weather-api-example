import { z } from "zod";
import { weatherUnitSchema } from "./weather-unit.schema";

export const weatherSummaryArgsSchema = z.object({
  unit: weatherUnitSchema,
  temperature: z.number(),
  cities: z.array(z.number()),
});
