import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { QuestionsExplorer } from "@/components/questions/QuestionsExplorer";

export const metadata: Metadata = {
  title: "বাউবি বিগত বছরের প্রশ্ন ও মডেল সমাধান | BOU Acadex",
  description:
    "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের (BOU) DCSA টার্ম ফাইনাল পরীক্ষার বিগত বছরের প্রশ্নব্যাংক এবং স্টেপ-বাই-স্টেপ মডেল সমাধান।",
};

interface QuestionsPageProps {
  searchParams: { year?: string; search?: string };
}

export default function QuestionsPage({ searchParams }: QuestionsPageProps) {
  return (
    <PageShell>
      <QuestionsExplorer
        initialYear={searchParams.year}
        initialSearch={searchParams.search}
      />
    </PageShell>
  );
}
