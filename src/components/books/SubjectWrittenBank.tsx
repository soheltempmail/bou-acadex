import Link from "next/link";
import type { Book, WrittenBank, WrittenQuestion } from "@/types";
import { toBanglaDigits } from "@/lib/format";
import { subjectMcqPath, subjectOverviewPath, subjectReadPath } from "@/lib/study-meta";
import { BOOK_GRADIENTS, SCHOOL_META } from "./book.constants";

interface SubjectWrittenBankProps {
  book: Book;
  bank: WrittenBank;
  mcqQuestionCount: number | null;
}

interface LessonGroup {
  lesson: string;
  short: WrittenQuestion[];
  long: WrittenQuestion[];
}

interface UnitGroup {
  unit: string;
  total: number;
  lessons: LessonGroup[];
}

function groupQuestions(questions: WrittenQuestion[]): UnitGroup[] {
  const units: UnitGroup[] = [];
  const unitMap = new Map<string, UnitGroup>();
  const lessonMaps = new Map<string, Map<string, LessonGroup>>();

  for (const question of questions) {
    const unitName = question.unit ?? "সাধারণ";
    const lessonName = question.lesson ?? "সাধারণ";

    let unit = unitMap.get(unitName);
    if (!unit) {
      unit = { unit: unitName, total: 0, lessons: [] };
      unitMap.set(unitName, unit);
      lessonMaps.set(unitName, new Map());
      units.push(unit);
    }

    let lessonMap = lessonMaps.get(unitName);
    if (!lessonMap) {
      lessonMap = new Map();
      lessonMaps.set(unitName, lessonMap);
    }

    let lesson = lessonMap.get(lessonName);
    if (!lesson) {
      lesson = { lesson: lessonName, short: [], long: [] };
      lessonMap.set(lessonName, lesson);
      unit.lessons.push(lesson);
    }

    if (question.type === "short") lesson.short.push(question);
    else lesson.long.push(question);
    unit.total += 1;
  }

  return units;
}

export function SubjectWrittenBank({ book, bank, mcqQuestionCount }: SubjectWrittenBankProps) {
  const meta = SCHOOL_META[book.school] ?? { label: book.school, gradient: "#173b55" };
  const gradient = BOOK_GRADIENTS[book.subjectCode] ?? meta.gradient;
  const units = groupQuestions(bank.questions);
  const total = bank.questions.length;
  const shortCount = bank.questions.filter((question) => question.type === "short").length;
  const longCount = total - shortCount;

  const overviewHref = subjectOverviewPath(book.subjectCode);
  const readHref = subjectReadPath(book.subjectCode);
  const mcqHref = subjectMcqPath(book.subjectCode);
  const booksHref = `/beta/books?program=${encodeURIComponent(book.program)}`;

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
          <span className="subject-overview-breadcrumb-current">লিখিত প্রশ্ন</span>
        </nav>

        <article className="subject-overview">
          <header className="subject-overview-hero" style={{ background: gradient }}>
            <div className="subject-overview-hero-top">
              <span className="product-badge product-badge-program">{book.program}</span>
              <span className="subject-overview-hero-code">{book.subjectCode}</span>
            </div>
            <h1 className="subject-overview-title">{book.title}</h1>
            <p className="subject-overview-subtitle">✍️ পাঠ্যপুস্তকের অনুশীলনী প্রশ্ন — উত্তর ছাড়া</p>
            <p className="subject-overview-edition">
              {book.edition} • মোট {toBanglaDigits(total)}টি প্রশ্ন
            </p>
          </header>

          <div className="subject-overview-layout">
            <div className="subject-overview-main">
              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">📊 প্রশ্নের সারসংক্ষেপ</h2>

                <div className="subject-marks-summary">
                  <div className="subject-marks-tile">
                    <span className="subject-marks-tile-label">মোট প্রশ্ন</span>
                    <span className="subject-marks-tile-value">{toBanglaDigits(total)}</span>
                    <span className="subject-marks-tile-note">
                      {toBanglaDigits(units.length)}টি ইউনিট
                    </span>
                  </div>
                  <div className="subject-marks-tile">
                    <span className="subject-marks-tile-label">সংক্ষিপ্ত প্রশ্ন</span>
                    <span className="subject-marks-tile-value">{toBanglaDigits(shortCount)}</span>
                    <span className="subject-marks-tile-note">Short Questions</span>
                  </div>
                  <div className="subject-marks-tile">
                    <span className="subject-marks-tile-label">বিস্তারিত প্রশ্ন</span>
                    <span className="subject-marks-tile-value">{toBanglaDigits(longCount)}</span>
                    <span className="subject-marks-tile-note">Long / Analytical</span>
                  </div>
                </div>

                <div className="subject-overview-empty">
                  📢 এই প্রশ্নগুলো পাঠ্যপুস্তকের প্রতিটি ইউনিট ও লেসনের অনুশীলনী থেকে সংকলিত।
                  এখানে কোনো উত্তর দেওয়া হয়নি — উত্তরের জন্য বইয়ের সংশ্লিষ্ট অংশ পড়ুন।
                  {bank.notice ? (
                    <>
                      <br />
                      {bank.notice}
                    </>
                  ) : null}
                </div>

                <div className="subject-overview-actions" style={{ marginTop: 12 }}>
                  <Link className="btn btn-secondary" href={readHref}>
                    📖 ই-বুক রিডারে পড়ুন
                  </Link>
                  {mcqQuestionCount !== null ? (
                    <Link className="btn btn-secondary" href={mcqHref}>
                      ✅ MCQ প্র্যাকটিস ({toBanglaDigits(mcqQuestionCount)})
                    </Link>
                  ) : null}
                </div>
              </section>

              {units.map((unit) => (
                <section key={unit.unit} className="subject-overview-card">
                  <div className="written-bank-unit-head">
                    <h2 className="subject-overview-card-title">📖 {unit.unit}</h2>
                    <span className="tag-badge">{toBanglaDigits(unit.total)}টি প্রশ্ন</span>
                  </div>

                  {unit.lessons.map((lesson) => (
                    <div key={`${unit.unit}-${lesson.lesson}`} className="written-bank-lesson">
                      <h3 className="written-bank-lesson-title">{lesson.lesson}</h3>

                      {lesson.short.length > 0 ? (
                        <div>
                          <h4 className="written-bank-type-title">সংক্ষিপ্ত প্রশ্ন</h4>
                          <ol className="written-bank-list">
                            {lesson.short.map((question, index) => (
                              <li key={question.id} className="written-bank-item">
                                <span className="written-bank-number">
                                  {toBanglaDigits(index + 1)}.
                                </span>
                                <span className="written-bank-question">{question.question}</span>
                                {question.pages ? (
                                  <span className="written-bank-page">পৃষ্ঠা {question.pages}</span>
                                ) : null}
                              </li>
                            ))}
                          </ol>
                        </div>
                      ) : null}

                      {lesson.long.length > 0 ? (
                        <div>
                          <h4 className="written-bank-type-title">
                            বিস্তারিত / বিশ্লেষণমূলক প্রশ্ন
                          </h4>
                          <ol className="written-bank-list">
                            {lesson.long.map((question, index) => (
                              <li key={question.id} className="written-bank-item">
                                <span className="written-bank-number">
                                  {toBanglaDigits(index + 1)}.
                                </span>
                                <span className="written-bank-question">{question.question}</span>
                                {question.pages ? (
                                  <span className="written-bank-page">পৃষ্ঠা {question.pages}</span>
                                ) : null}
                              </li>
                            ))}
                          </ol>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </section>
              ))}
            </div>

            <aside className="subject-overview-side">
              <section className="subject-overview-card">
                <h2 className="subject-overview-card-title">📋 প্রশ্নব্যাংকের তথ্য</h2>
                <dl className="subject-overview-facts">
                  <div>
                    <dt>বিষয়</dt>
                    <dd>{bank.title}</dd>
                  </div>
                  <div>
                    <dt>বিষয় কোড</dt>
                    <dd>{bank.code}</dd>
                  </div>
                  <div>
                    <dt>প্রোগ্রাম</dt>
                    <dd>{book.program}</dd>
                  </div>
                  <div>
                    <dt>ইউনিট</dt>
                    <dd>{toBanglaDigits(units.length)}</dd>
                  </div>
                  <div>
                    <dt>মোট প্রশ্ন</dt>
                    <dd>{toBanglaDigits(total)}</dd>
                  </div>
                  <div>
                    <dt>উত্তর</dt>
                    <dd>দেওয়া হয়নি</dd>
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
                      ✅ MCQ প্র্যাকটিস ({toBanglaDigits(mcqQuestionCount)})
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
