import type { Metadata } from "next";
import { BooksExplorer } from "@/components/books/BooksExplorer";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "বাউবি ই-বুক ও স্টাডি মডিউল লাইব্রেরি | BOU Acadex",
  description:
    "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের (BOU) সকল অনুষদের অফিসিয়াল পাঠ্যবই এবং সিলেবাস মডিউল অনলাইনে পড়ুন ও ডাউনলোড করুন।",
};

const PROGRAM_TO_LEVEL: Record<string, string> = {
  DCSA: "Diploma",
  SSC: "Secondary",
  HSC: "HigherSecondary",
  CSE: "Undergraduate",
  BBA: "Undergraduate",
  BSS: "Undergraduate",
  LLB: "Undergraduate",
  BED: "Undergraduate",
  MBA: "Postgraduate",
  MED: "Postgraduate",
};

interface BooksPageProps {
  searchParams: {
    program?: string;
    level?: string;
    year?: string;
    semester?: string;
    group?: string;
    q?: string;
  };
}

export default function BooksPage({ searchParams }: BooksPageProps) {
  const programLevel = searchParams.program
    ? PROGRAM_TO_LEVEL[searchParams.program.toUpperCase()]
    : undefined;

  return (
    <PageShell>
      <BooksExplorer
        initialLevel={searchParams.level ?? programLevel}
        initialYear={searchParams.year}
        initialSemester={searchParams.semester}
        initialGroup={searchParams.group}
        initialQuery={searchParams.q ?? (programLevel ? undefined : searchParams.program)}
      />
    </PageShell>
  );
}
