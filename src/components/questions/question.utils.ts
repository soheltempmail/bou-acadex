import { semesterLabel } from "@/lib/format";
import type { QuestionPaper } from "@/types";

export function paperHaystack(paper: QuestionPaper): string {
  return [
    paper.year,
    paper.school,
    paper.semester,
    semesterLabel(paper.semester),
    paper.subjectCode,
    paper.subjectName,
    paper.term,
    paper.duration,
    paper.isSolved ? "Verified Model Answers" : "Model Answers Pending",
    ...paper.questions.flatMap((question) => [
      question.qNumber,
      question.questionText,
      question.modelAnswer,
      ...(question.keyPoints ?? []),
    ]),
  ]
    .join(" ")
    .toLowerCase();
}
