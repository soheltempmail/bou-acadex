import { NextResponse } from "next/server";
import mcqData from "@/data/mcq.json";
import type { McqAnswerMap, McqBankMap, McqBankSummary, McqReviewItem } from "@/types";
import { apiResponse, apiError, errorMessage, preflight } from "@/lib/http";

interface McqPostBody {
  subject?: string;
  answers?: McqAnswerMap;
}

export async function OPTIONS(): Promise<NextResponse> {
  return preflight();
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject");
    const banks = mcqData as McqBankMap;

    if (subject) {
      const bank = banks[subject];
      if (!bank) {
        return apiError("Subject question bank not found", 404);
      }
      return apiResponse({
        success: true,
        subject,
        title: bank.title,
        code: bank.code,
        school: bank.school,
        duration: bank.duration,
        totalQuestions: bank.questions.length,
        questions: bank.questions,
      });
    }

    const subjects: McqBankSummary[] = Object.keys(banks).map((key) => ({
      key,
      title: banks[key].title,
      code: banks[key].code,
      school: banks[key].school,
      questionCount: banks[key].questions.length,
      duration: banks[key].duration,
    }));

    return apiResponse({ success: true, count: subjects.length, data: subjects });
  } catch (error) {
    return apiError("Failed to retrieve MCQ data: " + errorMessage(error));
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as McqPostBody;
    const subject = body.subject;
    const answers = body.answers ?? {};

    if (!subject) {
      return apiError("Invalid subject specified for evaluation", 400);
    }

    const banks = mcqData as McqBankMap;
    const bank = banks[subject];
    if (!bank) {
      return apiError("Invalid subject specified for evaluation", 400);
    }

    const total = bank.questions.length;
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    const review: McqReviewItem[] = bank.questions.map((question, index) => {
      const rawAnswer = answers[index];
      const isAnswered = rawAnswer !== undefined && rawAnswer !== null;
      const isCorrect = isAnswered && Number(rawAnswer) === question.correct;

      if (!isAnswered) {
        skipped++;
      } else if (isCorrect) {
        correct++;
      } else {
        incorrect++;
      }

      return {
        questionId: question.id,
        unit: question.unit,
        lesson: question.lesson,
        questionText: question.question,
        options: question.options,
        userAnswerIndex: isAnswered ? Number(rawAnswer) : null,
        correctAnswerIndex: question.correct,
        isCorrect,
        isSkipped: !isAnswered,
        explanation: question.explanation,
      };
    });

    const percentage = Math.round((correct / total) * 100);
    let grade = "F";
    if (percentage >= 80) grade = "A+ (Outstanding)";
    else if (percentage >= 70) grade = "A (Excellent)";
    else if (percentage >= 60) grade = "A- (Very Good)";
    else if (percentage >= 50) grade = "B (Good)";
    else if (percentage >= 40) grade = "C (Pass)";

    return apiResponse({
      success: true,
      result: {
        subject: bank.title,
        code: bank.code,
        totalQuestions: total,
        answeredCount: correct + incorrect,
        correctCount: correct,
        incorrectCount: incorrect,
        skippedCount: skipped,
        percentage,
        grade,
        passed: percentage >= 40,
        evaluatedAt: new Date().toISOString(),
        review,
      },
    });
  } catch (error) {
    return apiError("Evaluation failed: " + errorMessage(error));
  }
}
