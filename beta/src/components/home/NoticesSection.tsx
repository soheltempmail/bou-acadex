"use client";

import { useEffect, useState } from "react";
import { getNotices } from "@/lib/api-client";
import { isExternalLink } from "@/lib/format";
import { withBasePath } from "@/lib/base-path";
import type { Notice } from "@/types";

export function NoticesSection() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getNotices()
      .then((response) => {
        if (!cancelled) setNotices(response.data ?? []);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section notices-section" id="noticeSection">
      <div className="container">
        <header className="section-header">
          <span className="section-kicker">নোটিশ বোর্ড</span>
          <h2 className="section-title">সর্বশেষ বাউবি পরীক্ষার নোটিশ ও রুটিন</h2>
          <p className="section-desc">
            বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের অফিসিয়াল নোটিশ ও পরীক্ষার সময়সূচির নিয়মিত আপডেট।
          </p>
        </header>

        <div className="notice-cards-grid" id="noticeCardsGrid">
          {error ? (
            <p
              style={{
                color: "var(--text-muted)",
                padding: 24,
                textAlign: "center",
              }}
            >
              Could not load notices: {error}
            </p>
          ) : (
            notices.map((notice) => (
              <article key={notice.id} className="notice-card">
                <div className="notice-date-badge">
                  <span className="notice-day">{notice.day}</span>
                  <span className="notice-month">{notice.month}</span>
                </div>
                <div className="notice-content">
                  <span className="notice-tag">{notice.category}</span>
                  <h3 className="notice-title">{notice.title}</h3>
                  <a
                    href={isExternalLink(notice.link) ? notice.link : withBasePath(notice.link)}
                    target={isExternalLink(notice.link) ? "_blank" : undefined}
                    rel={isExternalLink(notice.link) ? "noopener" : undefined}
                    className="notice-link"
                  >
                    {notice.linkText}
                  </a>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
