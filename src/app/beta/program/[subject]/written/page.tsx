import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectPending } from "@/components/books/SubjectPending";
import { SubjectWritten } from "@/components/books/SubjectWritten";
import { SubjectWrittenBank } from "@/components/books/SubjectWrittenBank";
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

interface SubjectWrittenPageProps {
  params: {
    subject: string;
  };
}

const books = booksData as Book[];

export function generateStaticParams() {
  return books.map((book) => ({ subject: subjectSlug(book.subjectCode) }));
}

export function generateMetadata({ params }: SubjectWrittenPageProps): Metadata {
  const book = getBookForSubjectSlug(params.subject);

  if (!book) {
    return {
      title: "Written Questions Not Found | BOU Acadex",
      description: "এই বিষয়ের লিখিত প্রশ্ন পাওয়া যায়নি।",
    };
  }

  const paper = getPaperForBook(book.subjectCode);

  return {
    title: `${book.title} (${book.subjectCode}) — ${
      paper ? "লিখিত প্রশ্ন ও মডেল সমাধান" : "লিখিত প্রশ্ন"
    } | BOU Acadex`,
    description: paper
      ? `${book.program} program এর ${book.subjectCode} বিষয়ের লিখিত প্রশ্ন, নম্বর বিভাজন ও মডেল সমাধান।`
      : `${book.program} program এর ${book.subjectCode} বিষয়ের ইউনিট ও লেসনভিত্তিক সংক্ষিপ্ত ও বিস্তারিত প্রশ্ন।`,
  };
}

export default function SubjectWrittenPage({ params }: SubjectWrittenPageProps) {
  const book = getBookForSubjectSlug(params.subject);

  if (!book) notFound();

  const paper = getPaperForBook(book.subjectCode);
  const writtenBank = getWrittenBankForBook(book.subjectCode);

  if (!paper && !writtenBank) {
    return (
      <PageShell>
        <SubjectPending book={book} kind="written" />
      </PageShell>
    );
  }

  const mcqBank = findMcqBankForBook(book);

  return (
    <PageShell>
      {paper ? (
        <SubjectWritten
          book={book}
          paper={paper}
          mcqQuestionCount={mcqBank?.questionCount ?? null}
        />
      ) : writtenBank ? (
        <SubjectWrittenBank
          book={book}
          bank={writtenBank}
          mcqQuestionCount={mcqBank?.questionCount ?? null}
        />
      ) : null}
    </PageShell>
  );
}
