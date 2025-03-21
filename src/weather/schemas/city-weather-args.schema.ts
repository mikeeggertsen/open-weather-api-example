import { z } from "zod";

export const cityWeatherArgsSchema = z.object({
  id: z.number(),
  mode: z.enum(["json", "xml"]).optional(),
  cnt: z.string().optional(),
  units: z.enum(["standard", "metric", "imperial"]).optional(),
  lang: z.string().optional(),
});
