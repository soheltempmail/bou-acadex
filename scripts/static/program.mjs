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
  SEMESTER_LABELS,
  SCHOOL_META,
  WRITTEN_EXAM_DURATION,
  bookGradient,
  breadcrumb,
  esc,
  layout,
  mcqBankForBook,
  slug,
  toBn,
  writtenBankForBook,
} from "./lib.mjs";
import { mcqEngine } from "./pages.mjs";

const overviewPath = (book) => `/program/${slug(book.subjectCode)}/overview/`;
const readPath = (book) => `/program/${slug(book.subjectCode)}/read/`;
const mcqPath = (book) => `/program/${slug(book.subjectCode)}/mcq/`;
const writtenPath = (book) => `/program/${slug(book.subjectCode)}/written/`;
const booksHref = (book) => `/books/?program=${encodeURIComponent(book.program)}`;

function hero(book, title, subtitle, edition) {
  const meta = SCHOOL_META[book.school] ?? { label: book.school, gradient: "#173b55" };
  return `<header class="subject-overview-hero" style="background:${bookGradient(book)}">
  <div class="subject-overview-hero-top"><span class="product-badge product-badge-program">${book.program}</span><span class="subject-overview-hero-code">${book.subjectCode}</span></div>
  <h1 class="subject-overview-title">${title}</h1>
  <p class="subject-overview-subtitle">${subtitle}</p>
  <p class="subject-overview-edition">${edition}</p>
</header>`;
}

function semesterText(book) {
  return book.semester ? ` • ${SEMESTER_LABELS[book.semester] ?? `Semester ${book.semester}`}` : "";
}

function marksCard(book) {
  const isProjectCourse =
    book.subjectCode.replace(/\s+/g, "").toUpperCase() ===
    PROJECT_SUBJECT_CODE.replace(/\s+/g, "").toUpperCase();
  return `<section class="subject-overview-card">
  <h2 class="subject-overview-card-title">📊 মার্কস ডিস্ট্রিবিউশন</h2>
  <div class="subject-marks-summary">
    ${COURSE_ASSESSMENT.map(
      (part) => `<div class="subject-marks-tile">
      <span class="subject-marks-tile-label">${part.label}</span>
      <span class="subject-marks-tile-value">${part.key === "practical" ? `${toBn(20)}–${toBn(30)}` : toBn(part.marks)}</span>
      <span class="subject-marks-tile-note">${part.note}</span>
    </div>`
    ).join("")}
    <div class="subject-marks-tile"><span class="subject-marks-tile-label">মোট</span><span class="subject-marks-tile-value">${toBn(COURSE_TOTAL_MARKS)}</span><span class="subject-marks-tile-note">পাস ${toBn(COURSE_PASS_PERCENT)}%</span></div>
  </div>
  <h3 class="subject-marks-subtitle">📝 লিখিত পরীক্ষা — ${toBn(EXAM_TOTAL_MARKS)} নম্বর</h3>
  <div class="subject-marks-table-wrap">
    <table class="subject-marks-table">
      <thead><tr><th>অংশ</th><th>প্রশ্ন</th><th>উত্তর</th><th>প্রতি প্রশ্নে</th><th>নম্বর</th></tr></thead>
      <tbody>
        ${EXAM_PATTERN.map(
          (part) => `<tr><td>${part.label}<span class="subject-marks-table-sub"> ${part.labelEn}</span></td><td>${toBn(part.questions)}</td><td>${toBn(part.answer)}</td><td>${toBn(part.marksEach)}</td><td>${toBn(part.total)}</td></tr>`
        ).join("")}
        <tr class="subject-marks-total"><td colspan="4">মোট (MCQ ২০ মিনিট + লিখিত)</td><td>${toBn(EXAM_TOTAL_MARKS)}</td></tr>
      </tbody>
    </table>
  </div>
  <p class="subject-overview-note" style="margin-top:8px">${WRITTEN_EXAM_DURATION}। <a class="subject-overview-pattern-link" href="${mcqPath(book)}">✅ MCQ প্র্যাকটিস</a></p>
  <div class="subject-marks-split">
    <div class="subject-marks-mini">
      <div class="subject-marks-mini-title">🧪 ব্যবহারিক (${toBn(20)}–${toBn(30)})</div>
      ${PRACTICAL_BREAKDOWN.map(
        (item) => `<div class="subject-marks-mini-row"><span>${item.label}</span><strong>${toBn(item.marks)}</strong></div>`
      ).join("")}
      <div class="subject-marks-mini-note">মোট ${toBn(20)}–${toBn(30)} নম্বর</div>
    </div>
    ${
      isProjectCourse
        ? `<div class="subject-marks-mini">
      <div class="subject-marks-mini-title">📁 প্রজেক্ট (${PROJECT_SUBJECT_CODE})</div>
      ${PROJECT_BREAKDOWN.map(
        (item) => `<div class="subject-marks-mini-row"><span>${item.label}</span><strong>${toBn(item.marks)}</strong></div>`
      ).join("")}
      <div class="subject-marks-mini-note">মোট ${toBn(PROJECT_TOTAL_MARKS)} • পাস ${toBn(PROJECT_PASS_PERCENT)}%</div>
    </div>`
        : ""
    }
  </div>
</section>`;
}

function writtenOverviewCard(book, bank, mcq) {
  if (!bank) {
    return `<section class="subject-overview-card">
    <h2 class="subject-overview-card-title">📝 প্রশ্নপত্র পরিকল্পনা ও নম্বর বিভাজন</h2>
    <div class="subject-overview-empty">📢 এই বিষয়ের লিখিত প্রশ্নপত্র ও নম্বর বিভাজন শীঘ্রই যুক্ত করা হবে।</div>
  </section>`;
  }
  const total = bank.questions.length;
  const shortCount = bank.questions.filter((question) => question.type === "short").length;
  const longCount = total - shortCount;
  const unitCount = new Set(bank.questions.map((question) => question.unit).filter(Boolean)).size;
  return `<section class="subject-overview-card">
  <h2 class="subject-overview-card-title">📝 লিখিত প্রশ্নব্যাংক</h2>
  <div class="subject-overview-tags">
    <span class="tag-badge">পাঠ্যপুস্তকের অনুশীলনী</span>
    <span class="tag-badge">${toBn(total)}টি প্রশ্ন</span>
    <span class="tag-badge">উত্তর ছাড়া</span>
  </div>
  <p class="subject-overview-note">সংক্ষিপ্ত ${toBn(shortCount)} • বিস্তারিত ${toBn(longCount)} • ${toBn(unitCount)}টি ইউনিট। প্রশ্নগুলো পাঠ্যপুস্তকের অনুশীলনী থেকে সংকলিত; এখানে উত্তর দেওয়া হয়নি।</p>
  <div class="subject-overview-actions" style="margin-top:12px">
    <a class="btn btn-secondary" href="${writtenPath(book)}">✍️ লিখিত প্রশ্ন দেখুন</a>
    <a class="btn btn-outline-green" href="${readPath(book)}">📖 ই-বুক রিডার</a>
  </div>
</section>`;
}

function unitsCard(book) {
  const units = book.units ?? [];
  return `<section class="subject-overview-card">
  <h2 class="subject-overview-card-title">📖 ইউনিট ও পাঠ্যসূচি</h2>
  ${
    units.length
      ? `<div class="subject-overview-units">${units
          .map(
            (unit) => `<div class="subject-overview-unit">
        <span class="subject-overview-unit-num">${unit.unitNum > 0 ? unit.unitNum : "•"}</span>
        <span class="subject-overview-unit-title">${unit.title}</span>
        ${unit.pages ? `<span class="tag-badge">পৃষ্ঠা ${unit.pages}</span>` : ""}
      </div>`
          )
          .join("")}</div>`
      : `<div class="subject-overview-empty">এই বিষয়ের ইউনিট-ভিত্তিক সিলেবাস শীঘ্রই যুক্ত করা হবে।</div>`
  }
</section>`;
}

function sidebar(book, mcq, bank, active) {
  const meta = SCHOOL_META[book.school] ?? { label: book.school };
  const actions = [
    active !== "overview" ? `<a class="btn btn-primary" href="${overviewPath(book)}">📋 বিষয় ওভারভিউ</a>` : "",
    mcq
      ? `<a class="btn btn-secondary" href="${mcqPath(book)}">✅ MCQ প্র্যাকটিস (${toBn(mcq[1].questions.length)})</a>`
      : `<span class="btn btn-secondary btn-disabled">✅ MCQ প্র্যাকটিস শীঘ্রই আসছে</span>`,
    bank
      ? `<a class="btn btn-secondary" href="${writtenPath(book)}">✍️ লিখিত প্রশ্ন দেখুন (${toBn(bank[1].questions.length)})</a>`
      : `<span class="btn btn-secondary btn-disabled">✍️ লিখিত প্রশ্ন শীঘ্রই আসছে</span>`,
    active !== "read" ? `<a class="btn btn-secondary" href="${readPath(book)}">📖 ই-বুক রিডারে পড়ুন</a>` : "",
    `<a class="btn btn-outline-green" href="${booksHref(book)}">↩ সব ই-বুকে ফিরে যান</a>`,
  ]
    .filter(Boolean)
    .join("");

  return `<aside class="subject-overview-side">
  <section class="subject-overview-card">
    <h2 class="subject-overview-card-title">📋 সংক্ষিপ্ত তথ্য</h2>
    <dl class="subject-overview-facts">
      <div><dt>প্রোগ্রাম</dt><dd>${book.program}</dd></div>
      <div><dt>অনুষদ</dt><dd>${meta.label}</dd></div>
      <div><dt>স্তর</dt><dd>${book.level}</dd></div>
      <div><dt>বিষয় কোড</dt><dd>${book.subjectCode}</dd></div>
      <div><dt>ইউনিট সংখ্যা</dt><dd>${book.unitsCount}</dd></div>
      <div><dt>পৃষ্ঠা</dt><dd>${book.pages}</dd></div>
      <div><dt>ফাইল সাইজ</dt><dd>${book.fileSize}</dd></div>
    </dl>
  </section>
  <section class="subject-overview-card">
    <h2 class="subject-overview-card-title">⚡ দ্রুত অ্যাকশন</h2>
    <div class="subject-overview-actions">${actions}</div>
  </section>
</aside>`;
}

export function overviewPage(book) {
  const mcq = mcqBankForBook(book);
  const bank = writtenBankForBook(book);
  const body = `<main class="section">
  <div class="container">
    ${breadcrumb(book, book.subjectCode, { linkCode: false })}
    <article class="subject-overview">
      ${hero(
        book,
        book.title,
        `${SCHOOL_META[book.school]?.label ?? book.school}${semesterText(book)}${book.year ? ` • ${book.year}` : ""}`,
        book.edition
      )}
      <div class="subject-overview-layout">
        <div class="subject-overview-main">
          ${marksCard(book)}
          <section class="subject-overview-card"><h2 class="subject-overview-card-title">📄 বিষয় সম্পর্কিত পরিচিতি</h2><p class="subject-overview-summary">${book.summary}</p></section>
          ${writtenOverviewCard(book, bank ? bank[1] : null, mcq)}
          ${unitsCard(book)}
        </div>
        ${sidebar(book, mcq, bank, "overview")}
      </div>
    </article>
  </div>
</main>`;

  return layout({
    title: `${book.title} (${book.subjectCode}) — Subject Overview | BOU Acadex`,
    description: (book.summary ?? "").slice(0, 160) || `${book.program} program এর ${book.subjectCode} বিষয়ের স্টাডি ওভারভিউ।`,
    body,
  });
}

function pdfReaderPlaceholder(src, title) {
  return `<div class="pdf-reader" data-pdf-src="${esc(src)}" data-pdf-title="${esc(title)}">
  <div class="pdf-reader-toolbar">
    <span class="pdf-reader-title" title="${esc(title)}">${title}</span>
    <div class="pdf-reader-controls" hidden>
      <button type="button" class="btn btn-secondary btn-sm" data-pdf-prev aria-label="আগের পৃষ্ঠা" disabled>◀</button>
      <span class="pdf-reader-page-info" data-pdf-page>1 / 1</span>
      <button type="button" class="btn btn-secondary btn-sm" data-pdf-next aria-label="পরের পৃষ্ঠা" disabled>▶</button>
      <span class="pdf-reader-divider" aria-hidden="true"></span>
      <button type="button" class="btn btn-secondary btn-sm" data-pdf-zoom-out aria-label="জুম কমান">−</button>
      <span class="pdf-reader-zoom" data-pdf-zoom>100%</span>
      <button type="button" class="btn btn-secondary btn-sm" data-pdf-zoom-in aria-label="জুম বাড়ান">+</button>
      <span class="pdf-reader-divider" aria-hidden="true"></span>
      <button type="button" class="btn btn-primary btn-sm" data-pdf-fullscreen>⛶ সম্পূর্ণ স্ক্রিন</button>
    </div>
  </div>
  <div class="pdf-reader-state">PDF লোড হচ্ছে…</div>
  <div class="pdf-reader-scroll" hidden><div class="pdf-reader-page"><canvas class="pdf-reader-canvas" aria-label="${esc(title)}"></canvas></div></div>
</div>`;
}

export function readPage(book) {
  const units = book.units ?? [];
  const body = `<main class="section">
  <div class="container">
    ${breadcrumb(book, "রিডার")}
    <article class="subject-overview subject-overview-reader">
      ${hero(book, book.title, `📖 ই-বুক রিডার${semesterText(book)}${book.year ? ` • ${book.year}` : ""}`, book.edition)}
      <div class="subject-overview-layout">
        <div class="subject-overview-main">
          ${book.notice ? `<div class="subject-overview-empty">📢 ${book.notice}</div>` : ""}
          <section class="subject-overview-card">
            <h2 class="subject-overview-card-title">📘 বই সম্পর্কে পরিচিতি</h2>
            <p class="subject-overview-summary">${book.summary}</p>
          </section>
          <section class="subject-overview-card">
            <h2 class="subject-overview-card-title">📖 ইউনিট ও পাঠ্যসূচি</h2>
            <p class="subject-overview-note subject-overview-note-top">যে ইউনিটটি পড়তে চান সেটি খুলে নিন — ডাউনলোডের প্রয়োজন নেই, সরাসরি এখানেই পড়ুন।</p>
            ${
              units.length
                ? `<div class="subject-overview-units subject-reader-units">${units
                    .map(
                      (unit, index) => `<div class="subject-overview-unit subject-reader-unit">
              <button class="subject-overview-unit-toggle" aria-expanded="false" data-unit-index="${index}">
                <span class="subject-overview-unit-num">${unit.unitNum > 0 ? unit.unitNum : "•"}</span>
                <span class="subject-overview-unit-title">${unit.title}</span>
                ${unit.pages ? `<span class="tag-badge">পৃষ্ঠা ${unit.pages}</span>` : ""}
                <span class="subject-overview-unit-caret">▼</span>
              </button>
              <div class="subject-overview-unit-body" hidden>
                <p><strong>${unit.title}</strong>${unit.pages ? ` — পৃষ্ঠা ${unit.pages}` : ""}</p>
                ${
                  unit.pdfUrl?.startsWith("/")
                    ? pdfReaderPlaceholder(unit.pdfUrl, `${book.title} — ${unit.title}`)
                    : `<p class="subject-overview-unit-note">এই ইউনিটের বিস্তারিত অধ্যায়-লেখা ই-বুক রিডারে শীঘ্রই যুক্ত করা হবে। অধ্যায়টি প্রকাশিত হলে এখানেই পড়তে পারবেন — কোনো ডাউনলোড লাগবে না।</p>`
                }
              </div>
            </div>`
                    )
                    .join("")}</div>`
                : `<div class="subject-overview-empty">এই বিষয়ের ইউনিট-ভিত্তিক সিলেবাস শীঘ্রই যুক্ত করা হবে।</div>`
            }
          </section>
        </div>
        ${sidebar(book, mcqBankForBook(book), writtenBankForBook(book), "read")}
      </div>
    </article>
  </div>
</main>`;

  return layout({
    title: `${book.title} — E-Reader | BOU Acadex`,
    description: `${book.program} program এর ${book.subjectCode} বিষয়ের অনলাইন ই-বুক রিডার।`,
    body,
  });
}

function groupWrittenQuestions(questions) {
  const units = [];
  const unitMap = new Map();
  const lessonMaps = new Map();
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

export function writtenBankPage(book, bank) {
  const units = groupWrittenQuestions(bank.questions);
  const total = bank.questions.length;
  const shortCount = bank.questions.filter((question) => question.type === "short").length;
  const longCount = total - shortCount;
  const mcq = mcqBankForBook(book);

  const body = `<main class="section">
  <div class="container">
    ${breadcrumb(book, "লিখিত প্রশ্ন")}
    <article class="subject-overview">
      ${hero(
        book,
        book.title,
        "✍️ পাঠ্যপুস্তকের অনুশীলনী প্রশ্ন — উত্তর ছাড়া",
        `${book.edition} • মোট ${toBn(total)}টি প্রশ্ন`
      )}
      <div class="subject-overview-layout">
        <div class="subject-overview-main">
          <section class="subject-overview-card">
            <h2 class="subject-overview-card-title">📊 প্রশ্নের সারসংক্ষেপ</h2>
            <div class="subject-marks-summary">
              <div class="subject-marks-tile"><span class="subject-marks-tile-label">মোট প্রশ্ন</span><span class="subject-marks-tile-value">${toBn(total)}</span><span class="subject-marks-tile-note">${toBn(units.length)}টি ইউনিট</span></div>
              <div class="subject-marks-tile"><span class="subject-marks-tile-label">সংক্ষিপ্ত প্রশ্ন</span><span class="subject-marks-tile-value">${toBn(shortCount)}</span><span class="subject-marks-tile-note">Short Questions</span></div>
              <div class="subject-marks-tile"><span class="subject-marks-tile-label">বিস্তারিত প্রশ্ন</span><span class="subject-marks-tile-value">${toBn(longCount)}</span><span class="subject-marks-tile-note">Long / Analytical</span></div>
            </div>
            <div class="subject-overview-empty">📢 এই প্রশ্নগুলো পাঠ্যপুস্তকের প্রতিটি ইউনিট ও লেসনের অনুশীলনী থেকে সংকলিত। এখানে কোনো উত্তর দেওয়া হয়নি — উত্তরের জন্য বইয়ের সংশ্লিষ্ট অংশ পড়ুন।${
              bank.notice ? `<br>${bank.notice}` : ""
            }</div>
            <div class="subject-overview-actions" style="margin-top:12px">
              <a class="btn btn-secondary" href="${readPath(book)}">📖 ই-বুক রিডারে পড়ুন</a>
              ${mcq ? `<a class="btn btn-secondary" href="${mcqPath(book)}">✅ MCQ প্র্যাকটিস (${toBn(mcq[1].questions.length)})</a>` : ""}
            </div>
          </section>
          ${units
            .map(
              (unit) => `<section class="subject-overview-card">
            <div class="written-bank-unit-head">
              <h2 class="subject-overview-card-title">📖 ${unit.unit}</h2>
              <span class="tag-badge">${toBn(unit.total)}টি প্রশ্ন</span>
            </div>
            ${unit.lessons
              .map(
                (lesson) => `<div class="written-bank-lesson">
              <h3 class="written-bank-lesson-title">${lesson.lesson}</h3>
              ${
                lesson.short.length
                  ? `<div><h4 class="written-bank-type-title">সংক্ষিপ্ত প্রশ্ন</h4>
                <ol class="written-bank-list">${lesson.short
                  .map(
                    (question, index) => `<li class="written-bank-item"><span class="written-bank-number">${toBn(index + 1)}.</span><span class="written-bank-question">${question.question}</span>${question.pages ? `<span class="written-bank-page">পৃষ্ঠা ${question.pages}</span>` : ""}</li>`
                  )
                  .join("")}</ol></div>`
                  : ""
              }
              ${
                lesson.long.length
                  ? `<div><h4 class="written-bank-type-title">বিস্তারিত / বিশ্লেষণমূলক প্রশ্ন</h4>
                <ol class="written-bank-list">${lesson.long
                  .map(
                    (question, index) => `<li class="written-bank-item"><span class="written-bank-number">${toBn(index + 1)}.</span><span class="written-bank-question">${question.question}</span>${question.pages ? `<span class="written-bank-page">পৃষ্ঠা ${question.pages}</span>` : ""}</li>`
                  )
                  .join("")}</ol></div>`
                  : ""
              }
            </div>`
              )
              .join("")}
          </section>`
            )
            .join("")}
        </div>
        <aside class="subject-overview-side">
          <section class="subject-overview-card">
            <h2 class="subject-overview-card-title">📋 প্রশ্নব্যাংকের তথ্য</h2>
            <dl class="subject-overview-facts">
              <div><dt>বিষয়</dt><dd>${bank.title}</dd></div>
              <div><dt>বিষয় কোড</dt><dd>${bank.code}</dd></div>
              <div><dt>প্রোগ্রাম</dt><dd>${book.program}</dd></div>
              <div><dt>ইউনিট</dt><dd>${toBn(units.length)}</dd></div>
              <div><dt>মোট প্রশ্ন</dt><dd>${toBn(total)}</dd></div>
              <div><dt>উত্তর</dt><dd>দেওয়া হয়নি</dd></div>
            </dl>
          </section>
          <section class="subject-overview-card">
            <h2 class="subject-overview-card-title">⚡ দ্রুত অ্যাকশন</h2>
            <div class="subject-overview-actions">
              <a class="btn btn-primary" href="${overviewPath(book)}">📋 বিষয় ওভারভিউ</a>
              <a class="btn btn-secondary" href="${readPath(book)}">📖 ই-বুক রিডার</a>
              ${mcq ? `<a class="btn btn-secondary" href="${mcqPath(book)}">✅ MCQ প্র্যাকটিস (${toBn(mcq[1].questions.length)})</a>` : ""}
              <a class="btn btn-outline-green" href="${booksHref(book)}">↩ সব ই-বুকে ফিরে যান</a>
            </div>
          </section>
        </aside>
      </div>
    </article>
  </div>
</main>`;

  return layout({
    title: `${book.title} (${book.subjectCode}) — লিখিত প্রশ্ন | BOU Acadex`,
    description: `${book.program} program এর ${book.subjectCode} বিষয়ের ইউনিট ও লেসনভিত্তিক সংক্ষিপ্ত ও বিস্তারিত প্রশ্ন।`,
    body,
  });
}

export function pendingPage(book, kind) {
  const title = kind === "mcq" ? "MCQ" : "লিখিত প্রশ্ন";
  const body = `<main class="section">
  <div class="container">
    ${breadcrumb(book, title)}
    <article class="subject-overview">
      ${hero(book, book.title, kind === "mcq" ? "✅ MCQ প্র্যাকটিস" : "✍️ লিখিত প্রশ্ন", "")}
      <div class="subject-overview-layout">
        <div class="subject-overview-main">
          <div class="subject-overview-empty" style="padding:36px 24px;text-align:center">
            ${
              kind === "mcq"
                ? "✅ এই বিষয়ের MCQ প্রশ্নব্যাংক শীঘ্রই যুক্ত করা হবে।"
                : "✍️ এই বিষয়ের লিখিত প্রশ্ন শীঘ্রই যুক্ত করা হবে।"
            }
          </div>
          <section class="subject-overview-card">
            <h2 class="subject-overview-card-title">⚡ দ্রুত অ্যাকশন</h2>
            <div class="subject-overview-actions">
              <a class="btn btn-primary" href="${overviewPath(book)}">📋 বিষয় ওভারভিউ</a>
              <a class="btn btn-secondary" href="${readPath(book)}">📖 ই-বুক রিডার</a>
              <a class="btn btn-outline-green" href="${booksHref(book)}">↩ সব ই-বুকে ফিরে যান</a>
            </div>
          </section>
        </div>
        ${sidebar(book, null, null, kind)}
      </div>
    </article>
  </div>
</main>`;

  return layout({
    title: `${book.title} (${book.subjectCode}) — ${kind === "mcq" ? "MCQ" : "Written"} | BOU Acadex`,
    description: `${book.program} program এর ${book.subjectCode} বিষয়ের ${kind === "mcq" ? "MCQ" : "লিখিত"} প্রশ্ন।`,
    body,
  });
}

export function programMcqPage(book, bank) {
  const header = `${breadcrumb(book, "MCQ")}
  <h1 class="subject-mcq-title">${book.title} <span class="subject-mcq-code">${book.subjectCode}</span></h1>
  <p class="subject-mcq-subtitle">✅ MCQ প্র্যাকটিস — ${bank.title} (${toBn(bank.questions.length)}টি প্রশ্ন, মডেল ব্যাখ্যাসহ)</p>`;

  return layout({
    title: `${book.title} (${book.subjectCode}) — MCQ প্র্যাকটিস | BOU Acadex`,
    description: `${book.program} program এর ${book.subjectCode} বিষয়ের MCQ প্র্যাকটিস ও মডেল ব্যাখ্যা।`,
    body: mcqEngine({ bank, header }),
    active: "mcq",
  });
}
