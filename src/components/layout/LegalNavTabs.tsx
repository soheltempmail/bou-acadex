import Link from "next/link";

interface LegalNavTabsProps {
  current: "about" | "terms" | "disclaimer" | "privacy" | "api";
}

const TABS = [
  { key: "about", href: "/beta/about", label: "আমাদের সম্পর্কে (About)" },
  { key: "terms", href: "/beta/terms", label: "ব্যবহারের শর্তাবলী (Terms)" },
  { key: "disclaimer", href: "/beta/disclaimer", label: "আইনি অস্বীকৃতি (Disclaimer)" },
  { key: "privacy", href: "/beta/privacy", label: "গোপনীয়তা নীতি (Privacy)" },
  { key: "api", href: "/beta/api-docs", label: "ডেভেলপার API" },
];

export function LegalNavTabs({ current }: LegalNavTabsProps) {
  return (
    <div className="doc-nav-tabs" role="navigation" aria-label="নীতিমালা ও তথ্য মেনু">
      {TABS.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          className={`doc-nav-tab ${current === tab.key ? "active" : ""}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
