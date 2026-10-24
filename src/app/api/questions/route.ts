import { NextResponse } from "next/server";
import questionsData from "@/data/questions.json";
import type { QuestionPaper } from "@/types";
import { apiResponse, apiError, errorMessage, preflight } from "@/lib/http";

export async function OPTIONS(): Promise<NextResponse> {
  return preflight();
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const school = searchParams.get("school");
    const semester = searchParams.get("semester");
    const query = searchParams.get("q")?.toLowerCase().trim();

    const papers = questionsData as QuestionPaper[];
    let results = [...papers];

    if (year && year !== "all") {
      results = results.filter((paper) => paper.year === year);
    }
    if (school && school !== "all") {
      results = results.filter((paper) => paper.school.toLowerCase() === school.toLowerCase());
    }
    if (semester && semester !== "all") {
      results = results.filter((paper) => paper.semester === semester);
    }
    if (query) {
      results = results.filter(
        (paper) =>
          paper.subjectName.toLowerCase().includes(query) ||
          paper.subjectCode.toLowerCase().includes(query) ||
          paper.questions.some(
            (item) =>
              item.questionText.toLowerCase().includes(query) ||
              item.modelAnswer.toLowerCase().includes(query)
          )
      );
    }

    return apiResponse({ success: true, count: results.length, data: results });
  } catch (error) {
    return apiError("Failed to fetch questions: " + errorMessage(error));
  }
}
