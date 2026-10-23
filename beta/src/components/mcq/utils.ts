import { getMcqBank } from "@/lib/api-client";
import type { McqBank } from "@/types";

export const LETTERS = ["A", "B", "C", "D"];

export function gradeFor(percentage: number): string {
  if (percentage >= 80) return "A+ (Outstanding)";
  if (percentage >= 70) return "A (Excellent)";
  if (percentage >= 60) return "A- (Very Good)";
  if (percentage >= 50) return "B (Good)";
  if (percentage >= 40) return "C (Pass)";
  return "F";
}

export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function toBank(response: Awaited<ReturnType<typeof getMcqBank>>): McqBank {
  return {
    title: response.title,
    code: response.code,
    school: response.school,
    duration: response.duration,
    questions: response.questions,
  };
}
