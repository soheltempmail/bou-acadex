import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const ROOT = path.join(process.cwd(), "public", "pdfjs");

const CONTENT_TYPES: Record<string, string> = {
  ".pfb": "application/x-font-type1",
  ".ttf": "font/ttf",
  ".bcmap": "application/octet-stream",
  ".wasm": "application/wasm",
};

export async function GET(
  _request: Request,
  { params }: { params: { path?: string[] } }
) {
  const segments = (params.path ?? []).filter(
    (segment) => segment && !segment.includes("..") && !segment.includes("/")
  );

  if (segments.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(ROOT, ...segments);
  const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";

  try {
    const data = await readFile(filePath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
