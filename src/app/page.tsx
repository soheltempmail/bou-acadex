import type { Metadata } from "next";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MiniQuiz } from "@/components/home/MiniQuiz";
import { NoticesSection } from "@/components/home/NoticesSection";
import { SchoolsSection } from "@/components/home/SchoolsSection";
import { StatsBar } from "@/components/home/StatsBar";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "BOU Acadex - বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় স্টুডেন্ট একাডেমিক হাব",
  description:
    "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের (BOU) শিক্ষার্থীদের জন্য সকল পাঠ্যবই (ই-বুক), বিগত বছরের প্রশ্ন ও মডেল সমাধান এবং লাইভ টাইমার সহ আনলিমিটেড MCQ টেস্ট।",
};

export default function HomePage() {
  return (
    <PageShell showSchoolsLink footerVariant="default">
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <SchoolsSection />
        <MiniQuiz />
        <NoticesSection />
      </main>
    </PageShell>
  );
}
