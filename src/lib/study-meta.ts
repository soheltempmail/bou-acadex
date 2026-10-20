import mcqData from "@/data/mcq.json";
import questionsData from "@/data/questions.json";
import type { McqBankMap, QuestionPaper } from "@/types";

const mcqBanks = mcqData as McqBankMap;
const papers = questionsData as QuestionPaper[];

export function getMcqBankForBook(subjectCode: string) {
  const entry = Object.entries(mcqBanks).find(([, bank]) => bank.code === subjectCode);
  if (!entry) return null;
  return { key: entry[0], questionCount: entry[1].questions.length };
}

export function getPaperForBook(subjectCode: string): QuestionPaper | null {
  return papers.find((paper) => paper.subjectCode === subjectCode) ?? null;
}
