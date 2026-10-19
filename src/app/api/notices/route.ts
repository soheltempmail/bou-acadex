import { NextResponse } from "next/server";
import noticesData from "@/data/notices.json";
import type { Notice } from "@/types";
import { apiResponse, apiError, errorMessage, preflight } from "@/lib/http";

export async function OPTIONS(): Promise<NextResponse> {
  return preflight();
}

export async function GET(): Promise<NextResponse> {
  try {
    const notices = noticesData as Notice[];
    return apiResponse(
      { success: true, count: notices.length, data: notices },
      { cache: "public, s-maxage=1800, stale-while-revalidate=86400" }
    );
  } catch (error) {
    return apiError("Failed to fetch notices: " + errorMessage(error));
  }
}
