export type McqMode = "exam" | "practice";

export interface ExamResultData {
  total: number;
  correct: number;
  incorrect: number;
  percentage: number;
  grade: string;
}
