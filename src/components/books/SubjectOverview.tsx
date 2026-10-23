import Link from "next/link";
import type { Book, QuestionPaper, WrittenBank } from "@/types";
import {
  COURSE_ASSESSMENT,
  COURSE_PASS_PERCENT,
  COURSE_TOTAL_MARKS,
  EXAM_PATTERN,
  EXAM_TOTAL_MARKS,
  PRACTICAL_BREAKDOWN,
  PROJECT_BREAKDOWN,
  PROJECT_PASS_PERCENT,
  PROJECT_SUBJECT_CODE,
  PROJECT_TOTAL_MARKS,
  WRITTEN_EXAM_DURATION,
} from "@/lib/exam-pattern";
import { toBanglaDigits } from "@/lib/format";
import {
  subjectMcqPath,
  subjectReadPath,
  subjectWrittenPath,
} from "@/lib/study-meta";
import { BOOK_GRADIENTS, SCHOOL_META, SEMESTER_LABELS } from "./book.constants";

interface SubjectOverviewProps {
  book: Book;
  paper: QuestionPaper | null;
  writtenBank: WrittenBank | null;
  mcqQuestionCount: number | null;
}

export function SubjectOverview({
  book,
  paper,
  writtenBank,
  mcqQuestionCount,
}: SubjectOverviewProps) {
  const meta = SCHOOL_META[book.school] ?? { label: book.school, gradient: "#173b55" };
  const gradient = BOOK_GRADIENTS[book.subjectCode] ?? meta.gradient;

  const units = book.units ?? [];

  const distribution = paper
    ? Object.values(
        paper.questions.reduce<Record<number, { marks: number; count: number }>>((acc, question) => {
          const current = acc[question.marks] ?? { marks: question.marks, count: 0 };
          acc[question.marks] = { ...current, count: current.count + 1 };
          return acc;
        }, {})
      ).sort((a, b) => b.marks - a.marks)
    : [];
  const plannedMarks = distribution.reduce((sum, group) => sum + group.marks * group.count, 0);
  const writtenQuestionCount = writtenBank?.questions.length ?? null;
  const writtenShortCount =
    writtenBank?.questions.filter((question) => question.type === "short").length ?? 0;
  const writtenLongCount =
    writtenQuestionCount !== null ? writtenQuestionCount - writtenShortCount : 0;
  const writtenUnitCount = writtenBank
    ? new Set(writtenBank.questions.map((question) => question.unit).filter(Boolean)).size
    : 0;

  const mcqHref = subjectMcqPath(book.subjectCode);
  const writtenHref = subjectWrittenPath(book.subjectCode);
  const booksHref = `/beta/books?program=${encodeURIComponent(book.program)}`;
  const readHref = subjectReadPath(book.subjectCode);
  const isProjectCourse =
    book.subjectCode.replace(/\s+/g, "").toUpperCase() ===
    PROJECT_SUBJECT_CODE.replace(/\s+/g, "").toUpperCase();

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
          <span className="subject-overview-breadcrumb-current">{book.subjectCode}</span>
        </nav>

        <article className="subject-overview">
          <header className="subject-overview-hero" style={{ background: gradient }}>
            <div className="subject-overview-hero-top">
              <span className="product-badge product-badge-program">{book.program}</span>
              <span className="subject-overview-hero-code">{book.subjectCode}</span>
            </div>
            <h1 className="subject-overview-title">{book.title}</h1>
            <p className="subject-overview-subtitle">
              {meta.label}
              {book.semester ? ` • ${SEMESTER_LABELS[book.semester] ?? `Semester ${book.semester}`}` : ""}
              {book.year ? ` • ${book.year}` : ""}
            </p>
            <p className="subject-overview-edition">{book.edition}</p>
          </header>

          <div className="subject-overview-layout">
            <div className="subject-overview-main">
              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">📊 মার্কস ডিস্ট্রিবিউশন</h2>

                <div className="subject-marks-summary">
                  {COURSE_ASSESSMENT.map((part) => (
                    <div key={part.key} className="subject-marks-tile">
                      <span className="subject-marks-tile-label">{part.label}</span>
                      <span className="subject-marks-tile-value">
                        {part.key === "practical"
                          ? `${toBanglaDigits(20)}–${toBanglaDigits(30)}`
                          : toBanglaDigits(part.marks)}
                      </span>
                      <span className="subject-marks-tile-note">{part.note}</span>
                    </div>
                  ))}
                  <div className="subject-marks-tile">
                    <span className="subject-marks-tile-label">মোট</span>
                    <span className="subject-marks-tile-value">{toBanglaDigits(COURSE_TOTAL_MARKS)}</span>
                    <span className="subject-marks-tile-note">
                      পাস {toBanglaDigits(COURSE_PASS_PERCENT)}%
                    </span>
                  </div>
                </div>

                <h3 className="subject-marks-subtitle">
                  📝 লিখিত পরীক্ষা — {toBanglaDigits(EXAM_TOTAL_MARKS)} নম্বর
                </h3>
                <div className="subject-marks-table-wrap">
                  <table className="subject-marks-table">
                    <thead>
                      <tr>
                        <th>অংশ</th>
                        <th>প্রশ্ন</th>
                        <th>উত্তর</th>
                        <th>প্রতি প্রশ্নে</th>
                        <th>নম্বর</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EXAM_PATTERN.map((part) => (
                        <tr key={part.key}>
                          <td>
                            {part.label}
                            <span className="subject-marks-table-sub"> {part.labelEn}</span>
                          </td>
                          <td>{toBanglaDigits(part.questions)}</td>
                          <td>{toBanglaDigits(part.answer)}</td>
                          <td>{toBanglaDigits(part.marksEach)}</td>
                          <td>{toBanglaDigits(part.total)}</td>
                        </tr>
                      ))}
                      <tr className="subject-marks-total">
                        <td colSpan={4}>মোট (MCQ ২০ মিনিট + লিখিত)</td>
                        <td>{toBanglaDigits(EXAM_TOTAL_MARKS)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="subject-overview-note" style={{ marginTop: 8 }}>
                  {WRITTEN_EXAM_DURATION}।{" "}
                  <Link className="subject-overview-pattern-link" href={mcqHref}>
                    ✅ MCQ প্র্যাকটিস
                  </Link>
                </p>

                <div className="subject-marks-split">
                  <div className="subject-marks-mini">
                    <div className="subject-marks-mini-title">
                      🧪 ব্যবহারিক ({toBanglaDigits(20)}–{toBanglaDigits(30)})
                    </div>
                    {PRACTICAL_BREAKDOWN.map((item) => (
                      <div key={item.labelEn} className="subject-marks-mini-row">
                        <span>{item.label}</span>
                        <strong>{toBanglaDigits(item.marks)}</strong>
                      </div>
                    ))}
                    <div className="subject-marks-mini-note">
                      মোট {toBanglaDigits(20)}–{toBanglaDigits(30)} নম্বর
                    </div>
                  </div>

                  {isProjectCourse ? (
                    <div className="subject-marks-mini">
                      <div className="subject-marks-mini-title">
                        📁 প্রজেক্ট ({PROJECT_SUBJECT_CODE})
                      </div>
                      {PROJECT_BREAKDOWN.map((item) => (
                        <div key={item.labelEn} className="subject-marks-mini-row">
                          <span>{item.label}</span>
                          <strong>{toBanglaDigits(item.marks)}</strong>
                        </div>
                      ))}
                      <div className="subject-marks-mini-note">
                        মোট {toBanglaDigits(PROJECT_TOTAL_MARKS)} • পাস{" "}
                        {toBanglaDigits(PROJECT_PASS_PERCENT)}%
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>

              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">📄 বিষয় সম্পর্কিত পরিচিতি</h2>
                <p className="subject-overview-summary">{book.summary}</p>
              </section>

              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">
                  {paper
                    ? "📝 প্রশ্নপত্র পরিকল্পনা ও নম্বর বিভাজন"
                    : writtenQuestionCount !== null
                      ? "📝 লিখিত প্রশ্নব্যাংক"
                      : "📝 প্রশ্নপত্র পরিকল্পনা ও নম্বর বিভাজন"}
                </h2>

                {paper ? (
                  <>
                    <div className="subject-overview-tags">
                      <span className="tag-badge">
                        {paper.term} • {paper.year}
                      </span>
                      <span className="tag-badge">
                        Full Marks: {paper.fullMarks} • {paper.duration}
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

                    <div className="subject-overview-question-list">
                      {paper.questions.map((question) => (
                        <div key={question.qNumber} className="subject-overview-question">
                          <div className="subject-overview-question-text">
                            <strong>প্রশ্ন {question.qNumber}:</strong> {question.questionText}
                          </div>
                          <span className="tag-badge">{question.marks} marks</span>
                        </div>
                      ))}
                    </div>

                    <p className="subject-overview-note">
                      মোট নির্ধারিত নম্বর: {plannedMarks} — {paper.questions.length}টি লিখিত প্রশ্ন।
                    </p>
                  </>
                ) : writtenQuestionCount !== null ? (
                  <>
                    <div className="subject-overview-tags">
                      <span className="tag-badge">পাঠ্যপুস্তকের অনুশীলনী</span>
                      <span className="tag-badge">
                        {toBanglaDigits(writtenQuestionCount)}টি প্রশ্ন
                      </span>
                      <span className="tag-badge">উত্তর ছাড়া</span>
                    </div>

                    <p className="subject-overview-note">
                      সংক্ষিপ্ত {toBanglaDigits(writtenShortCount)} • বিস্তারিত{" "}
                      {toBanglaDigits(writtenLongCount)} • {toBanglaDigits(writtenUnitCount)}টি ইউনিট।
                      প্রশ্নগুলো পাঠ্যপুস্তকের অনুশীলনী থেকে সংকলিত; এখানে উত্তর দেওয়া হয়নি।
                    </p>

                    <div className="subject-overview-actions" style={{ marginTop: 12 }}>
                      <Link className="btn btn-secondary" href={writtenHref}>
                        ✍️ লিখিত প্রশ্ন দেখুন
                      </Link>
                      <Link className="btn btn-outline-green" href={readHref}>
                        📖 ই-বুক রিডার
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="subject-overview-empty">
                    📢 এই বিষয়ের লিখিত প্রশ্নপত্র ও নম্বর বিভাজন শীঘ্রই যুক্ত করা হবে।
                  </div>
                )}
              </section>

              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">📖 ইউনিট ও পাঠ্যসূচি</h2>

                {units.length > 0 ? (
                  <div className="subject-overview-units">
                    {units.map((unit, index) => (
                      <div key={`${unit.unitNum}-${unit.title}-${index}`} className="subject-overview-unit">
                        <span className="subject-overview-unit-num">
                          {unit.unitNum > 0 ? unit.unitNum : "•"}
                        </span>
                        <span className="subject-overview-unit-title">{unit.title}</span>
                        {unit.pages ? <span className="tag-badge">পৃষ্ঠা {unit.pages}</span> : null}
                      </div>
                    ))}
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
                    <dt>স্তর</dt>
                    <dd>{book.level}</dd>
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
                  <div>
                    <dt>ফাইল সাইজ</dt>
                    <dd>{book.fileSize}</dd>
                  </div>
                </dl>
              </section>

              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">⚡ দ্রুত অ্যাকশন</h2>
                <div className="subject-overview-actions">
                  {mcqQuestionCount !== null ? (
                    <Link className="btn btn-primary" href={mcqHref}>
                      ✅ MCQ প্র্যাকটিস ({mcqQuestionCount})
                    </Link>
                  ) : (
                    <span className="btn btn-secondary btn-disabled">✅ MCQ প্র্যাকটিস শীঘ্রই আসছে</span>
                  )}

                  {paper || writtenQuestionCount !== null ? (
                    <Link className="btn btn-secondary" href={writtenHref}>
                      ✍️ লিখিত প্রশ্ন দেখুন
                      {writtenQuestionCount !== null
                        ? ` (${toBanglaDigits(writtenQuestionCount)})`
                        : ""}
                    </Link>
                  ) : (
                    <span className="btn btn-secondary btn-disabled">✍️ লিখিত প্রশ্ন শীঘ্রই আসছে</span>
                  )}

                  <Link className="btn btn-secondary" href={readHref}>
                    📖 ই-বুক রিডারে পড়ুন
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
