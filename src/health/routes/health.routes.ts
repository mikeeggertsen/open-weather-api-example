import { Hono } from "hono";
import { HttpStatus } from "@common/constants/http-status";
import { IBaseRoutes } from "@common/interfaces/base-routes.interface";

export class HealthRoutes implements IBaseRoutes {
  constructor(private readonly app: Hono) {}

  register(): void {
    this.app.get("/health", () => {
      return new Response("OK", { status: HttpStatus.OK });
    });
  }
}
