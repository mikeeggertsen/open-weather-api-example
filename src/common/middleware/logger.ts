import { Context, Next } from "hono";
import fs from "fs";
import { getConnInfo } from "@hono/node-server/conninfo";

export class Logger {
  constructor(private readonly filePath: string) {
    this.run = this.run.bind(this);
  }

  async run(c: Context, next: Next) {
    const start = Date.now();
    await next();
    const duration = Date.now() - start;
    const connInfo = getConnInfo(c);
    const ip =
      c.req.header("x-forwarded-for") || connInfo.remote.address || "unknown";
    const log = `[${new Date().toISOString()}] ${c.res.status} ${c.req.method} ${c.req.path} - ${duration}ms - IP: ${ip}`;
    fs.appendFileSync(this.filePath, log + "\n");
  }
}
