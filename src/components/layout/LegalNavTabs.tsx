import Link from "next/link";

interface LegalNavTabsProps {
  current: "about" | "terms" | "disclaimer" | "privacy" | "api";
}

const TABS = [
  { key: "about", href: "/about", label: "আমাদের সম্পর্কে (About)" },
  { key: "terms", href: "/terms", label: "ব্যবহারের শর্তাবলী (Terms)" },
  { key: "disclaimer", href: "/disclaimer", label: "আইনি অস্বীকৃতি (Disclaimer)" },
  { key: "privacy", href: "/privacy", label: "গোপনীয়তা নীতি (Privacy)" },
  { key: "api", href: "/api-docs", label: "ডেভেলপার API" },
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
