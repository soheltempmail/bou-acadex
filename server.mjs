import http from "node:http";
import net from "node:net";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = path.resolve(process.cwd(), "static");
const PORT = Number(process.env.PORT || 3000);
const BETA_PORT = Number(process.env.BETA_PORT || 3100);
const DEV = process.argv.includes("--dev") || process.env.BETA_DEV === "1";
const BETA_URL = new URL(process.env.BETA_URL || `http://127.0.0.1:${BETA_PORT}`);
const startBeta = !process.env.BETA_URL;

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

function isBetaPath(pathname) {
  return pathname === "/beta" || pathname.startsWith("/beta/");
}

function serveStatic(request, response, pathname) {
  let target;
  try {
    target = path.join(ROOT, decodeURIComponent(pathname));
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  if (!target.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  let file = target;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!pathname.endsWith("/")) {
      response.writeHead(301, { location: pathname + "/" });
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
  });
  fs.createReadStream(file).pipe(response);
}

function proxyBeta(request, response) {
  const proxyRequest = http.request(
    {
      hostname: BETA_URL.hostname,
      port: BETA_URL.port || 80,
      path: request.url,
      method: request.method,
      headers: { ...request.headers, host: BETA_URL.host },
    },
    (proxyResponse) => {
      response.writeHead(proxyResponse.statusCode || 502, proxyResponse.headers);
      proxyResponse.pipe(response);
    }
  );

  proxyRequest.on("error", (error) => {
    response.writeHead(502, { "content-type": "text/html; charset=utf-8" });
    response.end(
      `<h1>Beta app is not running</h1><p>${error.message}</p><p>Start it with <code>npm run beta:start</code>.</p>`
    );
  });

  request.pipe(proxyRequest);
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url || "/", "http://localhost");
  if (isBetaPath(url.pathname)) {
    proxyBeta(request, response);
    return;
  }
  serveStatic(request, response, url.pathname);
});

let beta = null;
if (startBeta) {
  const betaScript = DEV ? "dev" : "start";
  const betaArgs = [
    "--prefix",
    "beta",
    "run",
    betaScript,
    "--",
    "-p",
    String(BETA_PORT),
  ];
  beta =
    process.platform === "win32"
      ? spawn("cmd.exe", ["/c", "npm", ...betaArgs], { stdio: "inherit" })
      : spawn("npm", betaArgs, { stdio: "inherit" });
}

server.on("upgrade", (request, socket, head) => {
  let pathname;
  try {
    pathname = new URL(request.url || "/", "http://localhost").pathname;
  } catch {
    socket.destroy();
    return;
  }
  if (!isBetaPath(pathname)) {
    socket.destroy();
    return;
  }

  const target = net.connect(Number(BETA_URL.port || 80), BETA_URL.hostname, () => {
    const headers = Object.entries(request.headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\r\n");
    target.write(`${request.method} ${request.url} HTTP/1.1\r\n${headers}\r\n\r\n`);
    if (head && head.length) target.write(head);
    socket.pipe(target).pipe(socket);
  });
  target.on("error", () => socket.destroy());
});

server.listen(PORT, () => {
  console.log(`Main site: http://localhost:${PORT}/`);
  console.log(`Beta app:  http://localhost:${PORT}/beta`);
  if (DEV) console.log(`Mode: development (next dev on ${BETA_PORT})`);
});

function shutdown() {
  server.close();
  if (beta) beta.kill();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
