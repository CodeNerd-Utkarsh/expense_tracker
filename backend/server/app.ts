import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRouteHandler } from "./routes/expenses";
import { serveStatic } from "hono/bun";
import { join } from 'path';

export const app = new Hono();

// middlewares
app.use("*", logger());

const apiRoutes = app.basePath("/api")
    // expense route
    .route("/expenses", expensesRouteHandler);

// serving static files
const frontendPath = join(import.meta.dir, '../../frontend/dist');
// Serve all static files from the frontendPath
app.get('*', serveStatic({ root: frontendPath }));

// Serve the index.html file for all other routes (SPA fallback)
app.get('*', serveStatic({ path: join(frontendPath, 'index.html') }));

app.fire();
