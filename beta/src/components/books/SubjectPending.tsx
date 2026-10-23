import Link from "next/link";
import type { Book } from "@/types";
import { subjectOverviewPath, subjectReadPath } from "@/lib/study-meta";
import { SCHOOL_META } from "./book.constants";

interface SubjectPendingProps {
  book: Book;
  kind: "mcq" | "written";
}

export function SubjectPending({ book, kind }: SubjectPendingProps) {
  const meta = SCHOOL_META[book.school] ?? { label: book.school, gradient: "#173b55" };
  const overviewHref = subjectOverviewPath(book.subjectCode);
  const readHref = subjectReadPath(book.subjectCode);
  const booksHref = `/books?program=${encodeURIComponent(book.program)}`;

  return (
    <main className="section">
      <div className="container">
        <nav className="subject-overview-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/books">E-Books</Link>
          <span aria-hidden="true">/</span>
          <Link href={booksHref}>{book.program} Program</Link>
          <span aria-hidden="true">/</span>
          <Link href={overviewHref}>{book.subjectCode}</Link>
          <span aria-hidden="true">/</span>
          <span className="subject-overview-breadcrumb-current">
            {kind === "mcq" ? "MCQ" : "লিখিত প্রশ্ন"}
          </span>
        </nav>

        <article className="subject-overview">
          <header className="subject-overview-hero" style={{ background: meta.gradient }}>
            <div className="subject-overview-hero-top">
              <span className="product-badge product-badge-program">{book.program}</span>
              <span className="subject-overview-hero-code">{book.subjectCode}</span>
            </div>
            <h1 className="subject-overview-title">{book.title}</h1>
            <p className="subject-overview-subtitle">
              {kind === "mcq" ? "✅ MCQ প্র্যাকটিস" : "✍️ লিখিত প্রশ্ন"}
            </p>
          </header>

          <div className="subject-overview-layout">
            <div className="subject-overview-main">
              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">
                  {kind === "mcq" ? "📝 MCQ প্রশ্নব্যাংক" : "📝 লিখিত প্রশ্নপত্র"}
                </h2>
                <div className="subject-overview-empty">
                  {kind === "mcq"
                    ? "📢 এই বিষয়ের MCQ প্রশ্নব্যাংক শীঘ্রই যুক্ত করা হবে। ততক্ষণে ওভারভিউ ও ই-বুক রিডার থেকে বিষয়টি পড়তে পারেন।"
                    : "📢 এই বিষয়ের লিখিত প্রশ্নপত্র ও মডেল সমাধান শীঘ্রই যুক্ত করা হবে। ততক্ষণে ওভারভিউ ও ই-বুক রিডার থেকে বিষয়টি পড়তে পারেন।"}
                </div>
              </section>
            </div>

            <aside className="subject-overview-side">
              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">⚡ দ্রুত অ্যাকশন</h2>
                <div className="subject-overview-actions">
                  <Link className="btn btn-primary" href={overviewHref}>
                    📋 বিষয় ওভারভিউ
                  </Link>
                  <Link className="btn btn-secondary" href={readHref}>
                    📖 ই-বুক রিডার
                  </Link>
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
