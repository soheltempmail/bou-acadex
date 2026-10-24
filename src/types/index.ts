export interface BookUnit {
  unitNum: number;
  title: string;
  pdfUrl?: string;
  pages?: string;
}

export interface Book {
  id: string;
  subjectCode: string;
  title: string;
  school: string;
  semester?: number;
  year?: string;
  notice?: string;
  unitsCount: number;
  pages: number;
  fileSize: string;
  edition: string;
  summary: string;
  pdfUrl?: string;
  units: BookUnit[];
}

export interface QuestionItem {
  qNumber: string;
  questionText: string;
  marks: number;
  modelAnswer: string;
  keyPoints: string[];
}

export interface QuestionPaper {
  id: string;
  year: string;
  school: string;
  semester: string;
  subjectCode: string;
  subjectName: string;
  term: string;
  fullMarks: number;
  duration: string;
  isSolved: boolean;
  questions: QuestionItem[];
}

export type WrittenQuestionType = "short" | "long";

export interface WrittenQuestion {
  id: number;
  unit?: string;
  lesson?: string;
  type: WrittenQuestionType;
  question: string;
  pages?: string;
}

export interface WrittenBank {
  title: string;
  code: string;
  school: string;
  notice?: string;
  questions: WrittenQuestion[];
}

export type WrittenBankMap = Record<string, WrittenBank>;

export interface Notice {
  id: string;
  day: string;
  month: string;
  category: string;
  title: string;
  link: string;
  linkText: string;
}

export interface McqQuestion {
  id: number;
  unit?: string;
  lesson?: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface McqBank {
  title: string;
  code: string;
  school: string;
  duration: number;
  questions: McqQuestion[];
}

export type McqBankMap = Record<string, McqBank>;

export interface McqBankSummary {
  key: string;
  title: string;
  code: string;
  school: string;
  questionCount: number;
  duration: number;
}

export interface McqAnswerMap {
  [questionIndex: string]: number | null | undefined;
}

export interface McqReviewItem {
  questionId: number;
  unit?: string;
  lesson?: string;
  questionText: string;
  options: string[];
  userAnswerIndex: number | null;
  correctAnswerIndex: number;
  isCorrect: boolean;
  isSkipped: boolean;
  explanation: string;
}

export interface McqResult {
  subject: string;
  code: string;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  percentage: number;
  grade: string;
  passed: boolean;
  evaluatedAt: string;
  review: McqReviewItem[];
}
