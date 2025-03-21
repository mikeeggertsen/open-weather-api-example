import { z } from "zod";
import {
  weatherListItemSchema,
  weatherResponseSchema,
} from "../schemas/weather-response.schema";

export type WeatherResponse = z.infer<typeof weatherResponseSchema>;

export type WeatherListItem = z.infer<typeof weatherListItemSchema>;
