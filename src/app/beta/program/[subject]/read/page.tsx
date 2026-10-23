import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectReader } from "@/components/books/SubjectReader";
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

interface SubjectReadPageProps {
  params: {
    subject: string;
  };
}

const books = booksData as Book[];

export function generateStaticParams() {
  return books.map((book) => ({ subject: subjectSlug(book.subjectCode) }));
}

export function generateMetadata({ params }: SubjectReadPageProps): Metadata {
  const book = getBookForSubjectSlug(params.subject);

  if (!book) {
    return {
      title: "E-Reader Not Found | BOU Acadex",
      description: "এই বিষয়ের ই-বুক রিডার পাওয়া যায়নি।",
    };
  }

  return {
    title: `${book.title} — E-Reader | BOU Acadex`,
    description:
      `${book.program} program এর ${book.subjectCode} বিষয়ের অনলাইন ই-বুক রিডার — ইউনিট ও পাঠ্যসূচি অনুযায়ী পড়ুন।`,
  };
}

export default function SubjectReadPage({ params }: SubjectReadPageProps) {
  const book = getBookForSubjectSlug(params.subject);

  if (!book) notFound();

  const paper = getPaperForBook(book.subjectCode);
  const writtenBank = getWrittenBankForBook(book.subjectCode);
  const mcqBank = findMcqBankForBook(book);

  return (
    <PageShell>
      <SubjectReader
        book={book}
        paper={paper}
        writtenQuestionCount={writtenBank?.questions.length ?? null}
        mcqQuestionCount={mcqBank?.questionCount ?? null}
      />
    </PageShell>
  );
}
