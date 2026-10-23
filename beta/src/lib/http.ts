import { NextResponse } from "next/server";

export const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const DEFAULT_CACHE = "public, s-maxage=3600, stale-while-revalidate=86400";

interface ResponseOptions {
  status?: number;
  cache?: string;
}

export function apiResponse(body: unknown, options: ResponseOptions = {}): NextResponse {
  return NextResponse.json(body, {
    status: options.status ?? 200,
    headers: {
      ...CORS_HEADERS,
      "Cache-Control": options.cache ?? DEFAULT_CACHE,
    },
  });
}

export function apiError(message: string, status = 500): NextResponse {
  return apiResponse({ success: false, error: message }, { status, cache: "no-store" });
}

export function preflight(): NextResponse {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
