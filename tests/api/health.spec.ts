import { describe, expect, test } from "@jest/globals";
import { app } from "../../src/app";
import { HttpStatus } from "../../src/common/constants/http-status";

describe("Health API", () => {
  test("GET /health", async () => {
    const res = await app.request("/health");
    const text = await res.text();
    expect(res.status).toBe(HttpStatus.OK);
    expect(text).toBe("OK");
  });
});
