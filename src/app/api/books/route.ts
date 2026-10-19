import { NextResponse } from "next/server";
import booksData from "@/data/books.json";
import type { Book } from "@/types";
import { apiResponse, apiError, errorMessage, preflight } from "@/lib/http";

export async function OPTIONS(): Promise<NextResponse> {
  return preflight();
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const school = searchParams.get("school");
    const program = searchParams.get("program");
    const level = searchParams.get("level");
    const query = searchParams.get("q")?.toLowerCase().trim();

    const books = booksData as Book[];
    let results = [...books];

    if (school && school !== "all") {
      results = results.filter((book) => book.school.toLowerCase() === school.toLowerCase());
    }
    if (program && program !== "all") {
      results = results.filter((book) => book.program.toLowerCase() === program.toLowerCase());
    }
    if (level && level !== "all") {
      results = results.filter((book) => book.level.toLowerCase() === level.toLowerCase());
    }
    if (query) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.subjectCode.toLowerCase().includes(query) ||
          book.summary.toLowerCase().includes(query)
      );
    }

    return apiResponse({ success: true, count: results.length, data: results });
  } catch (error) {
    return apiError("Failed to fetch books: " + errorMessage(error));
  }
}
