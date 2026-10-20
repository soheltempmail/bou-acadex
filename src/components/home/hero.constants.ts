export type HeroCardTheme = "card-1" | "card-2" | "card-3" | "card-4" | "card-5" | "card-6";

export interface HeroCard {
  href: string;
  code: string;
  title: string;
  level: string;
  description: string;
  icon: string;
  pillText: string;
  theme: HeroCardTheme;
}

export const HERO_CARDS: HeroCard[] = [
  {
    href: "/books?level=Secondary",
    code: "SSC",
    title: "৯ম ও ১০ম শ্রেণি",
    level: "মাধ্যমিক",
    description: "অফিসিয়াল পাঠ্যবই, বিগত বছরের প্রশ্ন ও সমাধান একসাথে।",
    icon: "📚",
    pillText: "ই-বুক ও সমাধান",
    theme: "card-1",
  },
  {
    href: "/books?level=HigherSecondary",
    code: "HSC",
    title: "উচ্চ মাধ্যমিক (HSC)",
    level: "HSC",
    description: "প্রোগ্রামিং, ফিজিক্স ও অন্যান্য বইয়ের পূর্ণাঙ্গ সংগ্রহ।",
    icon: "🎯",
    pillText: "বিগত প্রশ্ন সমাধান",
    theme: "card-2",
  },
  {
    href: "/books?program=DCSA",
    code: "DCSA",
    title: "ডিপ্লোমা ইন সিএস",
    level: "ডিপ্লোমা (DCSA)",
    description: "০১ম থেকে ০৩য় সেমিস্টারের সেমিস্টারভিত্তিক বই ও ল্যাব গাইড।",
    icon: "💻",
    pillText: "ল্যাব ও স্টাডি গাইড",
    theme: "card-3",
  },
  {
    href: "/questions?school=SST",
    code: "B.SC CSE",
    title: "কম্পিউটার সায়েন্স",
    level: "স্নাতক (SST)",
    description: "প্রোগ্রামিং, অ্যালগরিদম ও ডেটা স্ট্রাকচার টার্ম ফাইনাল সমাধান।",
    icon: "⚡",
    pillText: "টার্ম ফাইনাল সমাধান",
    theme: "card-4",
  },
  {
    href: "/books?program=BBA",
    code: "BBA",
    title: "ব্যবসায় প্রশাসন",
    level: "স্নাতক (অনার্স)",
    description: "ম্যানেজমেন্ট, অ্যাকাউন্টিং ও বিজনেস কমিউনিকেশন বই।",
    icon: "💼",
    pillText: "বই ও বিগত প্রশ্ন",
    theme: "card-5",
  },
  {
    href: "/books?program=BSS",
    code: "BA / BSS",
    title: "ডিগ্রি ও অনার্স",
    level: "স্নাতক (পাস/অনার্স)",
    description: "বাংলাদেশ স্টাডিজ, আইন ও সমাজবিজ্ঞান পাঠ্যক্রম।",
    icon: "📖",
    pillText: "নোটস ও প্রশ্নব্যাংক",
    theme: "card-6",
  },
];
