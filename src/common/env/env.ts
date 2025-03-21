import { z } from "zod";
import "dotenv/config";

export const envSchema = z.object({
  OPEN_WEATHER_API_URL: z.string().min(1),
  OPEN_WEATHER_API_KEY: z.string().min(1),
  PORT: z.string().min(1),
  NODE_ENV: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
