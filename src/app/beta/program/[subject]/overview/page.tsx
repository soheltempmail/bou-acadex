import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectOverview } from "@/components/books/SubjectOverview";
import { PageShell } from "@/components/layout/PageShell";
import {
  findMcqBankForBook,
  getBookForSubjectSlug,
  getPaperForBook,
  getWrittenBankForBook,
  subjectSlug,
} from "@/lib/study-meta";
import booksData from "@/data/books.json";
import type { Book } from "@/types";

interface SubjectOverviewPageProps {
  params: {
    subject: string;
  };
}

const books = booksData as Book[];

export function generateStaticParams() {
  return books.map((book) => ({ subject: subjectSlug(book.subjectCode) }));
}

export function generateMetadata({ params }: SubjectOverviewPageProps): Metadata {
  const book = getBookForSubjectSlug(params.subject);

  if (!book) {
    return {
      title: "Subject Overview Not Found | BOU Acadex",
      description: "এই বিষয়ের স্টাডি ওভারভিউ পাওয়া যায়নি।",
    };
  }

  return {
    title: `${book.title} (${book.subjectCode}) — Subject Overview | BOU Acadex`,
    description:
      (book.summary ?? "").slice(0, 160) ||
      `${book.program} program এর ${book.subjectCode} বিষয়ের স্টাডি ওভারভিউ, প্রশ্নপত্র পরিকল্পনা ও নম্বর বিভাজন।`,
  };
}

export default function SubjectOverviewPage({ params }: SubjectOverviewPageProps) {
  const book = getBookForSubjectSlug(params.subject);

  if (!book) notFound();

  const paper = getPaperForBook(book.subjectCode);
  const writtenBank = getWrittenBankForBook(book.subjectCode);
  const mcqBank = findMcqBankForBook(book);

  return (
    <PageShell>
      <SubjectOverview
        book={book}
        paper={paper}
        writtenBank={writtenBank}
        mcqQuestionCount={mcqBank?.questionCount ?? null}
      />
    </PageShell>
  );
}
