import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubjectPending } from "@/components/books/SubjectPending";
import { PageShell } from "@/components/layout/PageShell";
import { McqEngine } from "@/components/mcq/McqEngine";
import {
  findMcqBankForBook,
  getBookForSubjectSlug,
  subjectOverviewPath,
  subjectSlug,
} from "@/lib/study-meta";
import booksData from "@/data/books.json";
import type { Book } from "@/types";

interface SubjectMcqPageProps {
  params: {
    subject: string;
  };
}

const books = booksData as Book[];

export function generateStaticParams() {
  return books.map((book) => ({ subject: subjectSlug(book.subjectCode) }));
}

export function generateMetadata({ params }: SubjectMcqPageProps): Metadata {
  const book = getBookForSubjectSlug(params.subject);

  if (!book) {
    return {
      title: "MCQ Bank Not Found | BOU Acadex",
      description: "এই বিষয়ের MCQ প্রশ্নব্যাংক পাওয়া যায়নি।",
    };
  }

  return {
    title: `${book.title} (${book.subjectCode}) — MCQ প্র্যাকটিস | BOU Acadex`,
    description: `${book.program} program এর ${book.subjectCode} বিষয়ের MCQ প্র্যাকটিস ও মডেল ব্যাখ্যা।`,
  };
}

export default function SubjectMcqPage({ params }: SubjectMcqPageProps) {
  const book = getBookForSubjectSlug(params.subject);

  if (!book) notFound();

  const bank = findMcqBankForBook(book);

  if (!bank) {
    return (
      <PageShell>
        <SubjectPending book={book} kind="mcq" />
      </PageShell>
    );
  }

  const overviewHref = subjectOverviewPath(book.subjectCode);
  const booksHref = `/books?program=${encodeURIComponent(book.program)}`;

  return (
    <PageShell>
      <McqEngine
        initialSubject={bank.key}
        header={
          <>
            <nav className="subject-overview-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/books">E-Books</Link>
              <span aria-hidden="true">/</span>
              <Link href={booksHref}>{book.program} Program</Link>
              <span aria-hidden="true">/</span>
              <Link href={overviewHref}>{book.subjectCode}</Link>
              <span aria-hidden="true">/</span>
              <span className="subject-overview-breadcrumb-current">MCQ</span>
            </nav>
            <h1 className="subject-mcq-title">
              {book.title} <span className="subject-mcq-code">{book.subjectCode}</span>
            </h1>
            <p className="subject-mcq-subtitle">
              ✅ MCQ প্র্যাকটিস — {bank.title} ({bank.questionCount}টি প্রশ্ন, মডেল ব্যাখ্যাসহ)
            </p>
          </>
        }
      />
    </PageShell>
  );
}
