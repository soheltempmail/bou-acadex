import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { QuestionsExplorer } from "@/components/questions/QuestionsExplorer";

export const metadata: Metadata = {
  title: "বাউবি বিগত বছরের প্রশ্ন ও মডেল সমাধান | BOU Acadex",
  description:
    "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের (BOU) টার্ম ফাইনাল পরীক্ষার বিগত বছরের প্রশ্নব্যাংক এবং স্টেপ-বাই-স্টেপ মডেল সমাধান। BBA, BA/BSS, HSC, CSE এবং LLB।",
};

interface QuestionsPageProps {
  searchParams: { year?: string; program?: string; search?: string };
}

export default function QuestionsPage({ searchParams }: QuestionsPageProps) {
  return (
    <PageShell>
      <QuestionsExplorer
        initialYear={searchParams.year}
        initialProgram={searchParams.program}
        initialSearch={searchParams.search}
      />
    </PageShell>
  );
}
