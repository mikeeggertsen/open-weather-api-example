import { z } from "zod";

export const weatherSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const mainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  sea_level: z.number(),
  grnd_level: z.number(),
  humidity: z.number(),
  temp_kf: z.number(),
});

export const cloudsSchema = z.object({
  all: z.number(),
});

export const windSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number(),
});

export const sysSchema = z.object({
  pod: z.string(),
});

export const weatherListItemSchema = z.object({
  dt: z.number(),
  main: mainSchema,
  weather: z.array(weatherSchema),
  clouds: cloudsSchema,
  wind: windSchema,
  visibility: z.number(),
  pop: z.number(),
  sys: sysSchema,
  dt_txt: z.string(),
});

export const coordSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export const citySchema = z.object({
  id: z.number(),
  name: z.string(),
  coord: coordSchema,
  country: z.string(),
  population: z.number(),
  timezone: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
});

export const weatherResponseSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(weatherListItemSchema),
  city: citySchema,
});
