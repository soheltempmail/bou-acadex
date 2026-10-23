import Link from "next/link";
import type { Book, QuestionPaper } from "@/types";
import { subjectMcqPath, subjectOverviewPath, subjectReadPath } from "@/lib/study-meta";
import { SCHOOL_META } from "./book.constants";

interface SubjectWrittenProps {
  book: Book;
  paper: QuestionPaper;
  mcqQuestionCount: number | null;
}

export function SubjectWritten({ book, paper, mcqQuestionCount }: SubjectWrittenProps) {
  const meta = SCHOOL_META[book.school] ?? { label: book.school, gradient: "#173b55" };

  const distribution = Object.values(
    paper.questions.reduce<Record<number, { marks: number; count: number }>>((acc, question) => {
      const current = acc[question.marks] ?? { marks: question.marks, count: 0 };
      acc[question.marks] = { ...current, count: current.count + 1 };
      return acc;
    }, {})
  ).sort((a, b) => b.marks - a.marks);
  const plannedMarks = distribution.reduce((sum, group) => sum + group.marks * group.count, 0);

  const overviewHref = subjectOverviewPath(book.subjectCode);
  const readHref = subjectReadPath(book.subjectCode);
  const mcqHref = subjectMcqPath(book.subjectCode);
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
          <span className="subject-overview-breadcrumb-current">লিখিত প্রশ্ন</span>
        </nav>

        <article className="subject-overview">
          <header className="subject-overview-hero" style={{ background: meta.gradient }}>
            <div className="subject-overview-hero-top">
              <span className="product-badge product-badge-program">{book.program}</span>
              <span className="subject-overview-hero-code">{book.subjectCode}</span>
            </div>
            <h1 className="subject-overview-title">{paper.subjectName}</h1>
            <p className="subject-overview-subtitle">
              ✍️ লিখিত প্রশ্ন ও মডেল সমাধান
            </p>
            <p className="subject-overview-edition">
              {paper.term} • {paper.year} • Full Marks: {paper.fullMarks} • {paper.duration}
            </p>
          </header>

          <div className="subject-overview-layout">
            <div className="subject-overview-main">
              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">📊 প্রশ্নপত্রের নম্বর বিভাজন</h2>
                <div className="subject-overview-tags">
                  <span className="tag-badge">
                    {paper.program} • {paper.school}
                  </span>
                  <span className={`tag-badge${paper.isSolved ? " solved" : ""}`}>
                    {paper.isSolved ? "✓ Model Answers Verified" : "Model Answers Pending"}
                  </span>
                </div>

                <div className="subject-overview-distribution">
                  {distribution.map((group) => {
                    const segment = group.marks * group.count;
                    const percent =
                      paper.fullMarks > 0 ? Math.round((segment / paper.fullMarks) * 100) : 0;
                    return (
                      <div key={group.marks} className="subject-overview-distribution-row">
                        <div className="subject-overview-distribution-label">
                          <span>{group.marks} marks each</span>
                          <span>
                            {group.count} questions = {segment} marks ({percent}%)
                          </span>
                        </div>
                        <div className="subject-overview-distribution-track">
                          <div
                            className="subject-overview-distribution-fill"
                            style={{ width: `${Math.min(100, percent)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="subject-overview-note">
                  মোট নির্ধারিত নম্বর: {plannedMarks} — {paper.questions.length}টি লিখিত প্রশ্ন।
                </p>
              </section>

              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">📝 প্রশ্ন ও মডেল সমাধান</h2>
                <div className="subject-written-questions">
                  {paper.questions.map((question) => (
                    <div key={question.qNumber} className="solution-step">
                      <div className="solution-step-title">
                        প্রশ্ন {question.qNumber}: {question.questionText}{" "}
                        <em>({question.marks} marks)</em>
                      </div>
                      <p className="subject-written-answer">
                        <strong>আদর্শ উত্তর:</strong>{" "}
                        <span style={{ whiteSpace: "pre-line" }}>{question.modelAnswer}</span>
                      </p>
                      {question.keyPoints && question.keyPoints.length > 0 ? (
                        <div className="subject-written-keypoints">
                          <strong>Key Points:</strong>
                          <ul>
                            {question.keyPoints.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="subject-overview-side">
              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">📋 প্রশ্নপত্রের তথ্য</h2>
                <dl className="subject-overview-facts">
                  <div>
                    <dt>বিষয়</dt>
                    <dd>{paper.subjectName}</dd>
                  </div>
                  <div>
                    <dt>বিষয় কোড</dt>
                    <dd>{paper.subjectCode}</dd>
                  </div>
                  <div>
                    <dt>প্রোগ্রাম</dt>
                    <dd>{paper.program}</dd>
                  </div>
                  <div>
                    <dt>পরীক্ষা</dt>
                    <dd>
                      {paper.term} • {paper.year}
                    </dd>
                  </div>
                  <div>
                    <dt>মোট নম্বর</dt>
                    <dd>{paper.fullMarks}</dd>
                  </div>
                  <div>
                    <dt>সময়</dt>
                    <dd>{paper.duration}</dd>
                  </div>
                </dl>
              </section>

              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">⚡ দ্রুত অ্যাকশন</h2>
                <div className="subject-overview-actions">
                  <Link className="btn btn-primary" href={overviewHref}>
                    📋 বিষয় ওভারভিউ
                  </Link>
                  <Link className="btn btn-secondary" href={readHref}>
                    📖 ই-বুক রিডার
                  </Link>
                  {mcqQuestionCount !== null ? (
                    <Link className="btn btn-secondary" href={mcqHref}>
                      ✅ MCQ প্র্যাকটিস ({mcqQuestionCount})
                    </Link>
                  ) : (
                    <span className="btn btn-secondary btn-disabled">✅ MCQ প্র্যাকটিস শীঘ্রই আসছে</span>
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
