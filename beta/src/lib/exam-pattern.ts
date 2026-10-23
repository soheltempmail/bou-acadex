export interface ExamPatternPart {
  key: string;
  label: string;
  labelEn: string;
  questions: number;
  answer: number;
  marksEach: number;
  total: number;
}

export const EXAM_PATTERN: ExamPatternPart[] = [
  {
    key: "mcq",
    label: "MCQ প্রশ্ন",
    labelEn: "MCQ",
    questions: 40,
    answer: 40,
    marksEach: 0.5,
    total: 20,
  },
  {
    key: "short",
    label: "সংক্ষিপ্ত প্রশ্ন",
    labelEn: "Short Questions (Part-A)",
    questions: 10,
    answer: 8,
    marksEach: 2.5,
    total: 20,
  },
  {
    key: "analytical",
    label: "বিশ্লেষণী প্রশ্ন",
    labelEn: "Analytical Questions (Part-B)",
    questions: 8,
    answer: 5,
    marksEach: 6,
    total: 30,
  },
];

export const EXAM_TOTAL_MARKS = EXAM_PATTERN.reduce((sum, part) => sum + part.total, 0);

export interface CourseAssessmentPart {
  key: string;
  label: string;
  labelEn: string;
  marks: number;
  note: string;
}

export const COURSE_ASSESSMENT: CourseAssessmentPart[] = [
  {
    key: "written",
    label: "লিখিত পরীক্ষা",
    labelEn: "Written Test",
    marks: 70,
    note: "MCQ + লিখিত",
  },
  {
    key: "practical",
    label: "ব্যবহারিক",
    labelEn: "Practical Examination",
    marks: 20,
    note: "৩ অংশে বিভক্ত",
  },
  {
    key: "tma",
    label: "TMA",
    labelEn: "Tutor-Marked Assignment",
    marks: 10,
    note: "টিউটর-মার্কড",
  },
];

export const COURSE_TOTAL_MARKS = 100;
export const COURSE_PASS_PERCENT = 40;
export const WRITTEN_EXAM_DURATION = "লিখিত অংশ প্রায় ২ ঘণ্টা ৪০ মিনিট + MCQ ২০ মিনিট";

export interface MarksBreakdownItem {
  label: string;
  labelEn: string;
  marks: number;
}

export const PRACTICAL_BREAKDOWN: MarksBreakdownItem[] = [
  { label: "পরীক্ষা / বাস্তবায়ন", labelEn: "Experiment / Implementation", marks: 10 },
  { label: "রেকর্ড বুক / ল্যাব নোটবুক", labelEn: "Record Book / Lab Notebook", marks: 5 },
  { label: "ভাইভা", labelEn: "Viva Voce", marks: 5 },
];

export const PROJECT_SUBJECT_CODE = "DCSA 3304";
export const PROJECT_TOTAL_MARKS = 100;
export const PROJECT_PASS_PERCENT = 50;

export const PROJECT_BREAKDOWN: MarksBreakdownItem[] = [
  { label: "বাস্তব জীবনের প্রজেক্ট রিপোর্ট", labelEn: "Real-life Project Report", marks: 80 },
  { label: "ভাইভা", labelEn: "Viva Voce", marks: 20 },
];
