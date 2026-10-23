import booksData from "@/data/books.json";
import mcqData from "@/data/mcq.json";
import questionsData from "@/data/questions.json";
import writtenData from "@/data/written-questions.json";
import type { Book, McqBankMap, QuestionPaper, WrittenBank, WrittenBankMap } from "@/types";

const books = booksData as Book[];
const mcqBanks = mcqData as McqBankMap;
const papers = questionsData as QuestionPaper[];
const writtenBanks = writtenData as WrittenBankMap;

export function getMcqBankForBook(subjectCode: string) {
  const entry = Object.entries(mcqBanks).find(([, bank]) => bank.code === subjectCode);
  if (!entry) return null;
  return { key: entry[0], questionCount: entry[1].questions.length };
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9ঀ-৿]+/g, " ")
    .trim();
}

export function findMcqBankForBook(book: Book) {
  const entries = Object.entries(mcqBanks);

  const codeMatch = entries.find(([, bank]) => bank.code === book.subjectCode);
  if (codeMatch) {
    return {
      key: codeMatch[0],
      title: codeMatch[1].title,
      questionCount: codeMatch[1].questions.length,
    };
  }

  const bookTitle = normalizeText(book.title);
  if (!bookTitle) return null;

  const titleMatch = entries.find(([, bank]) => {
    const bankTitle = normalizeText(bank.title);
    return (
      bankTitle === bookTitle || bankTitle.includes(bookTitle) || bookTitle.includes(bankTitle)
    );
  });
  if (titleMatch) {
    return {
      key: titleMatch[0],
      title: titleMatch[1].title,
      questionCount: titleMatch[1].questions.length,
    };
  }

  const bookTokens = bookTitle.split(" ").filter(Boolean);
  const tokenMatch = entries.find(([, bank]) => {
    const bankTokens = new Set(normalizeText(bank.title).split(" ").filter(Boolean));
    const hits = bookTokens.filter((token) => bankTokens.has(token)).length;
    return bookTokens.length > 0 && hits / bookTokens.length >= 0.6;
  });
  if (tokenMatch) {
    return {
      key: tokenMatch[0],
      title: tokenMatch[1].title,
      questionCount: tokenMatch[1].questions.length,
    };
  }

  return null;
}

export function getPaperForBook(subjectCode: string): QuestionPaper | null {
  return papers.find((paper) => paper.subjectCode === subjectCode) ?? null;
}

export function getWrittenBankForBook(subjectCode: string): WrittenBank | null {
  return Object.values(writtenBanks).find((bank) => bank.code === subjectCode) ?? null;
}

export function subjectSlug(subjectCode: string): string {
  return subjectCode
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getBookForSubjectSlug(slug: string): Book | null {
  const needle = slug.toLowerCase();
  return books.find((book) => subjectSlug(book.subjectCode) === needle) ?? null;
}

export function subjectOverviewPath(subjectCode: string): string {
  return `/program/${subjectSlug(subjectCode)}/overview`;
}

export function subjectReadPath(subjectCode: string): string {
  return `/program/${subjectSlug(subjectCode)}/read`;
}

export function subjectMcqPath(subjectCode: string): string {
  return `/program/${subjectSlug(subjectCode)}/mcq`;
}

export function subjectWrittenPath(subjectCode: string): string {
  return `/program/${subjectSlug(subjectCode)}/written`;
}
