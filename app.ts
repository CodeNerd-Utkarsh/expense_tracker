import { Hono } from "hono";
import { logger } from "hono/logger";

export const app = new Hono();

app.use("*", logger())

app.get('/', (c) => {
    return c.text("hello world!")
})