import { NextResponse } from "next/server";
import suggestionsData from "@/data/suggestions.json";
import type { Suggestion } from "@/types";
import { apiResponse, apiError, errorMessage, preflight } from "@/lib/http";

export async function OPTIONS(): Promise<NextResponse> {
  return preflight();
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const program = searchParams.get("program");
    const school = searchParams.get("school");
    const semester = searchParams.get("semester");
    const priority = searchParams.get("priority");
    const query = searchParams.get("q")?.toLowerCase().trim();

    const suggestions = suggestionsData as Suggestion[];
    let results = [...suggestions];

    if (program && program !== "all") {
      results = results.filter((item) => item.program.toLowerCase() === program.toLowerCase());
    }
    if (school && school !== "all") {
      results = results.filter((item) => item.school.toLowerCase() === school.toLowerCase());
    }
    if (semester && semester !== "all") {
      results = results.filter((item) => item.semester === semester);
    }
    if (priority && priority !== "all") {
      results = results.filter((item) => item.priority.toLowerCase() === priority.toLowerCase());
    }
    if (query) {
      results = results.filter(
        (item) =>
          item.subjectName.toLowerCase().includes(query) ||
          item.subjectCode.toLowerCase().includes(query) ||
          item.highlights.some((highlight) => highlight.toLowerCase().includes(query))
      );
    }

    return apiResponse({ success: true, count: results.length, data: results });
  } catch (error) {
    return apiError("Failed to fetch suggestions: " + errorMessage(error));
  }
}
