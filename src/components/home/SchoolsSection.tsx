"use client";

import Link from "next/link";

const PROGRAM_CARDS = [
  {
    school: "SST",
    codeBadge: "SST - DCSA",
    duration: "৩ বছর / ৬ সেমিস্টার",
    name: "Diploma in Computer Science & Application (DCSA)",
    schoolName: "বিজ্ঞান ও প্রযুক্তি স্কুল (SST)",
    stats: [
      { value: "১২টি", label: "কোর্স বুকস" },
      { value: "৫০+", label: "MCQ প্রশ্ন" },
    ],
    actions: [
      { href: "/books", label: "ই-বুকস", variant: "primary" as const },
      { href: "/mcq-test", label: "MCQ পরীক্ষা", variant: "secondary" as const },
    ],
  },
];

export function SchoolsSection() {
  return (
    <section className="section schools-section" id="schoolsSection">
      <div className="container">
        <header className="section-header">
          <span className="section-kicker">বাউবি অনুষদসমূহ</span>
          <h2 className="section-title">অনুষদ অনুযায়ী স্টাডি ম্যাটেরিয়াল খুঁজুন</h2>
          <p className="section-desc">
            বিজ্ঞান ও প্রযুক্তি স্কুলের DCSA প্রোগ্রামের সংশ্লিষ্ট বই ও প্রশ্নব্যাংক দেখুন।
          </p>
        </header>

        <div className="program-cards-grid">
          {PROGRAM_CARDS.map((card) => (
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
