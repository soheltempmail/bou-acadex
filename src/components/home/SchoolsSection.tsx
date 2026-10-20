"use client";

import Link from "next/link";
import { useState } from "react";

const SCHOOL_TABS = [
  { value: "all", label: "সকল অনুষদ (All)" },
  { value: "SOB", label: "ব্যবসায় শিক্ষা (SOB)" },
  { value: "SSHL", label: "সামাজিক বিজ্ঞান ও ভাষা (SSHL)" },
  { value: "OS", label: "ওপেন স্কুল (OS - SSC/HSC)" },
  { value: "SST", label: "বিজ্ঞান ও প্রযুক্তি (SST)" },
  { value: "SOE", label: "শিক্ষা অনুষদ (SOE)" },
];

interface ProgramCard {
  school: string;
  codeBadge: string;
  duration: string;
  name: string;
  schoolName: string;
  stats: { value: string; label: string }[];
  actions: { href: string; label: string; variant: "primary" | "secondary" }[];
}

const PROGRAM_CARDS: ProgramCard[] = [
  {
    school: "SOB",
    codeBadge: "SOB - BBA",
    duration: "৪ বছর / ৮ সেমিস্টার",
    name: "Bachelor of Business Administration (BBA)",
    schoolName: "বাউবি ব্যবসায় শিক্ষা স্কুল",
    stats: [
      { value: "৪৮টি", label: "কোর্স বুকস" },
      { value: "১২০+", label: "MCQ প্রশ্ন" },
    ],
    actions: [
      { href: "/books?program=BBA", label: "ই-বুকস", variant: "primary" },
      { href: "/questions?program=BBA", label: "বিগত প্রশ্ন", variant: "secondary" },
    ],
  },
  {
    school: "SSHL",
    codeBadge: "SSHL - BA / BSS",
    duration: "৩ বছর / ৬ সেমিস্টার",
    name: "Bachelor of Arts / Social Sciences (BA/BSS)",
    schoolName: "সামাজিক বিজ্ঞান, মানবিক ও ভাষা স্কুল",
    stats: [
      { value: "৩৬টি", label: "কোর্স বুকস" },
      { value: "৮০+", label: "প্রশ্ন সমাধান" },
    ],
    actions: [
      { href: "/books?program=BSS", label: "ই-বুকস", variant: "primary" },
      { href: "/questions?program=BSS", label: "সমাধান দেখুন", variant: "secondary" },
    ],
  },
  {
    school: "OS",
    codeBadge: "OS - HSC",
    duration: "২ বছর / ২ সেমিস্টার",
    name: "উচ্চ মাধ্যমিক সার্টিফিকেট (HSC)",
    schoolName: "বাউবি ওপেন স্কুল",
    stats: [
      { value: "১৪টি", label: "বিষয় নোটস" },
      { value: "২৫০+", label: "MCQ টেস্ট" },
    ],
    actions: [
      { href: "/books?level=HigherSecondary", label: "পাঠ্যবই", variant: "primary" },
      { href: "/mcq-test", label: "MCQ পরীক্ষা", variant: "secondary" },
    ],
  },
  {
    school: "SST",
    codeBadge: "SST - CSE",
    duration: "৪ বছর / ৮ সেমিস্টার",
    name: "B.Sc. in Computer Science & Engineering",
    schoolName: "বিজ্ঞান ও প্রযুক্তি স্কুল (SST)",
    stats: [
      { value: "৫২টি", label: "কোর্স ও ল্যাব" },
      { value: "৯৫+", label: "সলভড পেপার্স" },
    ],
    actions: [
      { href: "/books?level=Undergraduate", label: "বইসমূহ", variant: "secondary" },
      { href: "/questions?school=SST", label: "বিগত প্রশ্ন", variant: "primary" },
    ],
  },
  {
    school: "SOE",
    codeBadge: "SOE - B.ED",
    duration: "২ সেমিস্টার",
    name: "Bachelor of Education (B.Ed)",
    schoolName: "বাউবি শিক্ষা স্কুল (School of Education)",
    stats: [
      { value: "১৮টি", label: "মডিউল" },
      { value: "৩০+", label: "লেসন গাইড" },
    ],
    actions: [
      { href: "/books?program=BED", label: "টেক্সটবুক", variant: "primary" },
      { href: "/questions", label: "প্রশ্ন ব্যাংক", variant: "secondary" },
    ],
  },
  {
    school: "SSHL",
    codeBadge: "SSHL - LAW",
    duration: "৪ বছর / ৮ সেমিস্টার",
    name: "Bachelor of Laws (LL.B Honors)",
    schoolName: "সামাজিক বিজ্ঞান, মানবিক ও ভাষা স্কুল",
    stats: [
      { value: "৩২টি", label: "আইন হ্যান্ডবুক" },
      { value: "৫০+", label: "কেস স্টাডি" },
    ],
    actions: [
      { href: "/books?level=Undergraduate", label: "আইন বই", variant: "secondary" },
      { href: "/questions?program=LLB", label: "বিগত সমাধান", variant: "primary" },
    ],
  },
];

export function SchoolsSection() {
  const [activeSchool, setActiveSchool] = useState("all");

  const visibleCards =
    activeSchool === "all"
      ? PROGRAM_CARDS
      : PROGRAM_CARDS.filter((card) => card.school === activeSchool);

  return (
    <section className="section schools-section" id="schoolsSection">
      <div className="container">
        <header className="section-header">
          <span className="section-kicker">বাউবি অনুষদসমূহ</span>
          <h2 className="section-title">অনুষদ অনুযায়ী স্টাডি ম্যাটেরিয়াল খুঁজুন</h2>
          <p className="section-desc">
            আপনার স্কুল বা প্রোগ্রাম নির্বাচন করে সংশ্লিষ্ট বই ও বিগত পরীক্ষার সমাধান দেখুন।
          </p>
        </header>

        <div className="school-tabs" role="tablist">
          {SCHOOL_TABS.map((tab) => (
            <button
              key={tab.value}
              className={`school-tab-btn${activeSchool === tab.value ? " active" : ""}`}
              data-school={tab.value}
              onClick={() => setActiveSchool(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="program-cards-grid">
          {visibleCards.map((card) => (
            <article
              key={card.codeBadge}
              className="program-card"
              data-school={card.school}
              style={{ display: "flex", animation: "fadeIn 0.25s ease forwards" }}
            >
              <div className="program-header">
                <span className="program-code-badge">{card.codeBadge}</span>
                <span className="program-duration">{card.duration}</span>
              </div>
              <h3 className="program-name">{card.name}</h3>
              <p className="program-school-name">{card.schoolName}</p>
              <div className="program-stats">
                {card.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="prog-stat-num">{stat.value}</div>
                    <div className="prog-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="program-actions">
                {card.actions.map((action) => (
                  <Link
                    key={action.label + action.href}
                    href={action.href}
                    className={`btn btn-${action.variant} btn-sm`}
                    style={{ flex: 1 }}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
