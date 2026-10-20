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
  program: string;
  level: string;
  semester?: number;
  year?: string;
  group?: "science" | "arts" | "commerce";
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
  program: string;
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

export interface SscSubjectGroup {
  id: string;
  name: string;
  enName: string;
  icon: string;
  color: string;
  subjects: string[];
}

export interface SscSubjectCatalog {
  commonSubjects: string[];
  groups: SscSubjectGroup[];
}

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
