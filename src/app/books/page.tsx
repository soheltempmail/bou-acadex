import type { Metadata } from "next";
import { BooksExplorer } from "@/components/books/BooksExplorer";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "বাউবি ই-বুক ও স্টাডি মডিউল লাইব্রেরি | BOU Acadex",
  description:
    "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের (BOU) DCSA অনুষদের অফিসিয়াল পাঠ্যবই এবং সিলেবাস মডিউল অনলাইনে পড়ুন ও ডাউনলোড করুন।",
};

interface BooksPageProps {
  searchParams: {
    year?: string;
    semester?: string;
    q?: string;
  };
}

export default function BooksPage({ searchParams }: BooksPageProps) {
  return (
    <PageShell>
      <BooksExplorer
        initialYear={searchParams.year}
        initialSemester={searchParams.semester}
        initialQuery={searchParams.q}
      />
    </PageShell>
  );
}
