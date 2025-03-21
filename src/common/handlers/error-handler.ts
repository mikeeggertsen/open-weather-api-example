import { Hono } from "hono";
import { HttpException } from "../constants/http-exceptions";
import { HttpStatus } from "../constants/http-status";
import { ZodError } from "zod";

export class ErrorHandler {
  constructor(private readonly app: Hono) {}

  register() {
    this.app.onError((error) => {
      if (error instanceof HttpException) {
        return this.handleHttpException(error);
      }
      if (error instanceof ZodError) {
        return this.handleZodError(error);
      }
      return new Response("Internal server error", {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    });
  }

  private handleHttpException(error: HttpException) {
    return new Response(error.message, {
      status: error.status,
    });
  }

  private handleZodError(error: ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    return new Response(JSON.stringify(formattedErrors), {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}
