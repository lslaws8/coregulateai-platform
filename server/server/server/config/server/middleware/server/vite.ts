import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function log(message: string) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${timestamp} [express] ${message}`);
}

export async function setupVite(app: express.Express, server: any) {
  if (process.env.NODE_ENV === "production") {
    // Production mode - serve static files
    const distPath = path.resolve(__dirname, "../dist/public");
    app.use(express.static(distPath));
    
    // Serve index.html for all non-API routes
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        return next();
      }
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application not built. Run 'npm run build' first.");
      }
    });
  } else {
    // Development mode - use Vite dev server
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.ssrFixStacktrace);
    app.use(vite.middlewares);
  }
}

export function serveStatic(app: express.Express) {
  // This function is for compatibility
  return app;
}
