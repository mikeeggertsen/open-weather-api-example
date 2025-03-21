import { env } from "@common/env/env";
import { serve } from "@hono/node-server";
import { app } from "app";

serve(
  {
    fetch: app.fetch,
    port: Number(env.PORT),
  },
  () => {
    console.log(`Server is running on port ${env.PORT} 🚀`);
  },
);
