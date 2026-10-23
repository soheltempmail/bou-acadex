import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { McqEngine } from "@/components/mcq/McqEngine";

export const metadata: Metadata = {
  title: "বাউবি অনলাইন MCQ মক টেস্ট ও প্র্যাকটিস সিমুলেটর | BOU Acadex",
  description:
    "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের বিভিন্ন কোর্সের রিয়েল-টাইম টাইমার সহ অনলাইন MCQ মক টেস্ট। তাৎক্ষণিক স্কোরকার্ড, নির্ভুলতা বিশ্লেষণ ও মডেল ব্যাখ্যা।",
};

export default function McqTestPage() {
  return (
    <PageShell>
      <McqEngine />
    </PageShell>
  );
}
