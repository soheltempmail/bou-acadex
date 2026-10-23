import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "static");
const PORT = Number(process.env.PORT || 4200);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".dat": "application/octet-stream",
  ".bcmap": "application/octet-stream",
  ".wasm": "application/wasm",
  ".ttf": "font/ttf",
  ".pfb": "application/x-font-type1",
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url || "/", "http://localhost");
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  const target = path.join(ROOT, pathname);
  if (!target.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  let file = target;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!pathname.endsWith("/")) {
      response.writeHead(301, { location: pathname + "/" + url.search });
      response.end();
      return;
    }
    file = path.join(file, "index.html");
  }

  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    response.end("<h1>404</h1>");
    return;
  }

  response.writeHead(200, {
    "content-type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
    "cache-control": "no-store",
  });
  fs.createReadStream(file).pipe(response);
});

server.listen(PORT, () => {
  console.log(`Static server: http://localhost:${PORT}/home/`);
});
