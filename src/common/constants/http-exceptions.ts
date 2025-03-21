import { HttpStatus } from "./http-status";

export class HttpException extends Error {
  status: number;
  message: string;

  constructor(message: string, status: HttpStatus) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
