"use client";

import { useState } from "react";
import Link from "next/link";
import type { Book, QuestionPaper } from "@/types";
import { subjectMcqPath, subjectOverviewPath, subjectWrittenPath } from "@/lib/study-meta";
import { PdfReader } from "./PdfReader";
import { BOOK_GRADIENTS, SCHOOL_META, SEMESTER_LABELS } from "./book.constants";

interface SubjectReaderProps {
  book: Book;
  paper: QuestionPaper | null;
  writtenQuestionCount: number | null;
  mcqQuestionCount: number | null;
}

export function SubjectReader({
  book,
  paper,
  writtenQuestionCount,
  mcqQuestionCount,
}: SubjectReaderProps) {
  const [openUnit, setOpenUnit] = useState<number | null>(null);

  const meta = SCHOOL_META[book.school] ?? { label: book.school, gradient: "#173b55" };
  const gradient = BOOK_GRADIENTS[book.subjectCode] ?? meta.gradient;

  const units = book.units ?? [];
  const overviewHref = subjectOverviewPath(book.subjectCode);
  const booksHref = `/beta/books?program=${encodeURIComponent(book.program)}`;
  const mcqHref = subjectMcqPath(book.subjectCode);
  const writtenHref = subjectWrittenPath(book.subjectCode);

  return (
    <main className="section">
      <div className="container">
        <nav className="subject-overview-breadcrumb" aria-label="Breadcrumb">
          <Link href="/beta">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/beta/books">E-Books</Link>
          <span aria-hidden="true">/</span>
          <Link href={booksHref}>{book.program} Program</Link>
          <span aria-hidden="true">/</span>
          <Link href={overviewHref}>{book.subjectCode}</Link>
          <span aria-hidden="true">/</span>
          <span className="subject-overview-breadcrumb-current">রিডার</span>
        </nav>

        <article className="subject-overview subject-overview-reader">
          <header className="subject-overview-hero" style={{ background: gradient }}>
            <div className="subject-overview-hero-top">
              <span className="product-badge product-badge-program">{book.program}</span>
              <span className="subject-overview-hero-code">{book.subjectCode}</span>
            </div>
            <h1 className="subject-overview-title">{book.title}</h1>
            <p className="subject-overview-subtitle">
              📖 ই-বুক রিডার
              {book.semester
                ? ` • ${SEMESTER_LABELS[book.semester] ?? `Semester ${book.semester}`}`
                : ""}
              {book.year ? ` • ${book.year}` : ""}
            </p>
            <p className="subject-overview-edition">{book.edition}</p>
          </header>

          <div className="subject-overview-layout">
            <div className="subject-overview-main">
              {book.notice ? (
                <div className="subject-overview-empty">📢 {book.notice}</div>
              ) : null}

              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">📘 বই সম্পর্কে পরিচিতি</h2>
                <p className="subject-overview-summary">{book.summary}</p>
              </section>

              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">📖 ইউনিট ও পাঠ্যসূচি</h2>
                <p className="subject-overview-note subject-overview-note-top">
                  যে ইউনিটটি পড়তে চান সেটি খুলে নিন — ডাউনলোডের প্রয়োজন নেই, সরাসরি এখানেই পড়ুন।
                </p>

                {units.length > 0 ? (
                  <div className="subject-overview-units subject-reader-units">
                    {units.map((unit, index) => {
                      const isOpen = openUnit === index;
                      return (
                        <div
                          key={`${unit.unitNum}-${unit.title}-${index}`}
                          className="subject-overview-unit subject-reader-unit"
                        >
                          <button
                            className="subject-overview-unit-toggle"
                            onClick={() => setOpenUnit(isOpen ? null : index)}
                            aria-expanded={isOpen}
                          >
                            <span className="subject-overview-unit-num">
                              {unit.unitNum > 0 ? unit.unitNum : "•"}
                            </span>
                            <span className="subject-overview-unit-title">{unit.title}</span>
                            {unit.pages ? (
                              <span className="tag-badge">পৃষ্ঠা {unit.pages}</span>
                            ) : null}
                            <span className="subject-overview-unit-caret">{isOpen ? "▲" : "▼"}</span>
                          </button>

                          {isOpen ? (
                            <div className="subject-overview-unit-body">
                              <p>
                                <strong>{unit.title}</strong>
                                {unit.pages ? ` — পৃষ্ঠা ${unit.pages}` : ""}
                              </p>
                              {unit.pdfUrl?.startsWith("/") ? (
                                <PdfReader
                                  src={unit.pdfUrl}
                                  title={`${book.title} — ${unit.title}`}
                                />
                              ) : (
                                <p className="subject-overview-unit-note">
                                  এই ইউনিটের বিস্তারিত অধ্যায়-লেখা ই-বুক রিডারে শীঘ্রই যুক্ত করা হবে।
                                  অধ্যায়টি প্রকাশিত হলে এখানেই পড়তে পারবেন — কোনো ডাউনলোড লাগবে না।
                                </p>
                              )}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="subject-overview-empty">
                    এই বিষয়ের ইউনিট-ভিত্তিক সিলেবাস শীঘ্রই যুক্ত করা হবে।
                  </div>
                )}
              </section>
            </div>

            <aside className="subject-overview-side">
              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">📋 সংক্ষিপ্ত তথ্য</h2>
                <dl className="subject-overview-facts">
                  <div>
                    <dt>প্রোগ্রাম</dt>
                    <dd>{book.program}</dd>
                  </div>
                  <div>
                    <dt>অনুষদ</dt>
                    <dd>{meta.label}</dd>
                  </div>
                  <div>
                    <dt>বিষয় কোড</dt>
                    <dd>{book.subjectCode}</dd>
                  </div>
                  <div>
                    <dt>ইউনিট সংখ্যা</dt>
                    <dd>{book.unitsCount}</dd>
                  </div>
                  <div>
                    <dt>পৃষ্ঠা</dt>
                    <dd>{book.pages}</dd>
                  </div>
                </dl>
              </section>

              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">⚡ দ্রুত অ্যাকশন</h2>
                <div className="subject-overview-actions">
                  <Link className="btn btn-primary" href={overviewHref}>
                    📋 বিষয় ওভারভিউ
                  </Link>

                  {mcqQuestionCount !== null ? (
                    <Link className="btn btn-secondary" href={mcqHref}>
                      ✅ MCQ প্র্যাকটিস ({mcqQuestionCount})
                    </Link>
                  ) : (
                    <span className="btn btn-secondary btn-disabled">✅ MCQ প্র্যাকটিস শীঘ্রই আসছে</span>
                  )}

                  {paper || writtenQuestionCount !== null ? (
                    <Link className="btn btn-secondary" href={writtenHref}>
                      ✍️ লিখিত প্রশ্ন দেখুন
                    </Link>
                  ) : (
                    <span className="btn btn-secondary btn-disabled">✍️ লিখিত প্রশ্ন শীঘ্রই আসছে</span>
                  )}

                  <Link className="btn btn-outline-green" href={booksHref}>
                    ↩ সব ই-বুকে ফিরে যান
                  </Link>
                </div>
              </section>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
