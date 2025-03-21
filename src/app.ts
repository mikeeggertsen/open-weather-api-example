import { asClass, asValue, Lifetime } from "awilix";
import { Hono } from "hono";
import { env } from "./common/env/env";
import { ErrorHandler } from "./common/handlers/error-handler";
import { container } from "./common/di-container";
import { OpenWeatherInjectables } from "./open-weather/constants/injectables";
import { OpenWeatherProvider } from "./open-weather/providers/open-weather.provider";
import { OpenWeatherRepository } from "./open-weather/repositories/open-weather.repository";
import { WeatherRoutes } from "./weather/routes/weather.routes";
import { HealthRoutes } from "health/routes/health.routes";
import { Logger } from "@common/middleware/logger";
// import { RateLimiter } from "@common/middleware/rate-limiter";
// import { MAX_REQUESTS } from "@open-weather/constants/max-requests";

const app = new Hono();

// Optional - Will prevent cached data to be read if limit is hit
// const rateLimiter = new RateLimiter(MAX_REQUESTS);
// app.use("/weather/*", rateLimiter.run);

const logger = new Logger("log.txt");
if (env.NODE_ENV !== "test") {
  app.use(logger.run);
}

const healthRoutes = new HealthRoutes(app);
healthRoutes.register();

const weatherRoutes = new WeatherRoutes(app);
weatherRoutes.register();

const errorHandler = new ErrorHandler(app);
errorHandler.register();

container.register({
  [OpenWeatherInjectables.OpenWeatherRepository]: asClass(
    OpenWeatherRepository,
  ).setLifetime(Lifetime.SINGLETON),
  [OpenWeatherInjectables.OpenWeatherProvider]: asClass(
    OpenWeatherProvider,
  ).setLifetime(Lifetime.SINGLETON),
  [OpenWeatherInjectables.OpenWeatherApiUrl]: asValue(env.OPEN_WEATHER_API_URL),
  [OpenWeatherInjectables.OpenWeatherApiKey]: asValue(env.OPEN_WEATHER_API_KEY),
});

export { app };
