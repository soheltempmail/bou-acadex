import fs from "node:fs";
import path from "node:path";

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".dat": "application/octet-stream",
  ".bcmap": "application/octet-stream",
  ".wasm": "application/wasm",
  ".ttf": "font/ttf",
  ".pfb": "application/x-font-type1",
};

export function serveStaticFile(relativePath: string = ""): Response {
  const root = path.resolve(process.cwd(), "static");
  const clean = relativePath.replace(/^\/+|\/+$/g, "");

  const candidates = [
    path.join(root, clean, "index.html"),
    path.join(root, `${clean}.html`),
    path.join(root, clean),
  ];

  for (const file of candidates) {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      const ext = path.extname(file).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      const content = fs.readFileSync(file);
      return new Response(content, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=0, must-revalidate",
        },
      });
    }
  }

  return new Response("<h1>404 - Static Page Not Found</h1>", {
    status: 404,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
