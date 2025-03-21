import { Context, Next } from "hono";
import { DateHelper } from "../helpers/date-helper";
import { HttpException } from "@common/constants/http-exceptions";
import { HttpStatus } from "@common/constants/http-status";
import { ONE_DAY_IN_MS } from "@common/constants/dates";

export class RateLimiter {
  private count: number;
  private rateLimit: number;
  private datetime: Date;

  constructor(rateLimit: number) {
    this.count = 0;
    this.rateLimit = rateLimit;
    this.datetime = new Date();
    this.run = this.run.bind(this);
  }

  async run(c: Context, next: Next) {
    const now = new Date();
    const isSameDay = DateHelper.isSameDay(now, this.datetime);
    const oneDayAgo = now.getTime() - ONE_DAY_IN_MS;
    const hasOneDayPassed = oneDayAgo > this.datetime.getTime();
    const newCount = this.count + 1;

    if (isSameDay && newCount > this.rateLimit) {
      throw new HttpException(
        "Rate limit exceeded",
        HttpStatus.RATE_LIMIT_EXCEEDED,
      );
    }

    if (hasOneDayPassed) {
      this.count = 0;
      this.datetime = now;
    } else {
      this.count = newCount;
    }

    const remaining = this.rateLimit - this.count;
    const resetDate = this.datetime.getTime() + ONE_DAY_IN_MS;

    c.header("X-Rate-Limit-Limit", String(this.rateLimit));
    c.header("X-Rate-Limit-Remaining", String(remaining));
    c.header("X-Rate-Limit-Reset", String(resetDate));

    await next();
  }
}
