import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRouteHandler } from "./routes/expenses";

export const app = new Hono();

app.use("*", logger())

// global path
app.get('/', (c) => {
    return c.text("hello world!")
})

// expense route

app.route("/api/expenses", expensesRouteHandler)