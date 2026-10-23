import {
  BOOK_GRADIENTS,
  HERO_CARDS,
  FEATURES,
  MINI_QUESTIONS,
  PROGRAM_CARDS,
  SCHOOL_META,
  SEMESTER_LABELS,
  STATS,
  books,
  esc,
  layout,
  mcqBankForBook,
  mcqBanks,
  notices,
  papers,
  slug,
  sscSubjects,
  toBn,
  writtenBankForBook,
} from "./lib.mjs";

const LETTERS = ["ক", "খ", "গ", "ঘ"];

function bookCard(book) {
  const meta = SCHOOL_META[book.school] ?? { label: book.school, gradient: "#173b55" };
  const gradient = BOOK_GRADIENTS[book.subjectCode] ?? meta.gradient;
  const mcq = mcqBankForBook(book);
  const written = writtenBankForBook(book);
  const overview = `/program/${slug(book.subjectCode)}/overview/`;
  const read = `/program/${slug(book.subjectCode)}/read/`;
  const mcqHref = `/program/${slug(book.subjectCode)}/mcq/`;
  const writtenHref = `/program/${slug(book.subjectCode)}/written/`;
  const haystack = [
    meta.label,
    book.title,
    book.subjectCode,
    book.program,
    book.level,
    book.edition,
    book.summary,
    book.year,
    ...(book.units ?? []).map((unit) => unit.title),
  ]
    .filter(Boolean)
    .join(" ");

  const action = (href, label, disabled, title) =>
    disabled
      ? `<button class="btn btn-secondary btn-sm btn-disabled" data-soon="${esc(title)}">${label}</button>`
      : `<a class="btn btn-secondary btn-sm" href="${href}">${label}</a>`;

  return `<article class="book-card product-card" data-school="${book.school}" data-level="${book.level}" data-semester="${book.semester ?? ""}" data-year="${esc(book.year ?? "")}" data-search="${esc(haystack)}">
  <div class="book-cover-mock" style="background:${gradient}">
    <span class="book-cover-watermark" aria-hidden="true">📚</span>
    <div class="book-cover-top"><span class="product-badge product-badge-program">${book.program}</span></div>
    <div class="book-cover-info">
      <span class="book-cover-tag">${meta.label}${book.year ? ` • ${book.year}` : ""}</span>
      <h3 class="book-cover-title" title="${esc(book.title)}">${book.title}</h3>
      <span class="book-cover-code">${book.subjectCode}${book.unitsCount > 0 ? ` • Units 1–${book.unitsCount}` : ""}</span>
    </div>
  </div>
  <div class="book-info-body">
    <div class="book-school">${book.program} Program • ${book.edition}</div>
    <div class="book-spec-chips">
      <span class="book-spec-chip">📄 ${book.pages} Pages</span>
      ${book.unitsCount > 0 ? `<span class="book-spec-chip">📖 ${book.unitsCount} Units</span>` : ""}
    </div>
    <div class="book-actions book-actions-grid">
      <a class="btn btn-primary btn-sm book-action-overview" href="${overview}" title="Open full subject overview page">📋 Overview</a>
      <a class="btn btn-primary btn-sm" href="${read}" title="Open the full-page e-book reader">📖 Read</a>
      ${action(mcqHref, "✅ MCQ", !mcq, `${book.subjectCode} এর MCQ প্রশ্নব্যাংক শীঘ্রই আসছে!`)}
      ${action(writtenHref, "✍️ Written", !written, `${book.subjectCode} এর লিখিত প্রশ্নপত্র শীঘ্রই আসছে!`)}
    </div>
  </div>
</article>`;
}

function booksFilterBar() {
  return `<div class="content-filter-bar">
  <div class="filter-group">
    <label for="bookLevelFilter">লেভেল / প্রোগ্রাম:</label>
    <select id="bookLevelFilter" class="filter-select">
      <option value="all">সকল লেভেল (All Levels)</option>
      <option value="Undergraduate">স্নাতক (BBA / BA / BSS / CSE)</option>
      <option value="HigherSecondary">উচ্চ মাধ্যমিক (HSC)</option>
      <option value="Secondary">মাধ্যমিক (SSC)</option>
      <option value="Diploma">ডিপ্লোমা (DCSA)</option>
      <option value="Postgraduate">স্নাতকোত্তর (MBA / M.Ed)</option>
    </select>
  </div>
  <div class="filter-group">
    <label for="bookYearFilter">বছর:</label>
    <select id="bookYearFilter" class="filter-select">
      <option value="all">সকল বছর (All Years)</option>
      <option value="1st">১ম বর্ষ (1st Year)</option>
      <option value="2nd">২য় বর্ষ (2nd Year)</option>
    </select>
  </div>
  <div class="filter-group">
    <label for="bookSemesterFilter">সেমিস্টার:</label>
    <select id="bookSemesterFilter" class="filter-select">
      <option value="all">সকল সেমিস্টার (All Semesters)</option>
      <option value="1">${SEMESTER_LABELS[1]}</option>
      <option value="2">${SEMESTER_LABELS[2]}</option>
      <option value="3">${SEMESTER_LABELS[3]}</option>
    </select>
  </div>
  <div class="filter-group is-disabled">
    <label for="bookGroupFilter">বিভাগ:</label>
    <select id="bookGroupFilter" class="filter-select" disabled>
      <option value="all">সকল বিভাগ (All Groups)</option>
      ${sscSubjects.groups
        .map((group) => `<option value="${group.id}">${group.name} (${group.enName})</option>`)
        .join("")}
    </select>
  </div>
  <div class="filter-search-input">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    <input type="text" id="bookSearchInput" placeholder="বইয়ের নাম, লেখক বা কোর্স কোড লিখে খুঁজুন...">
  </div>
</div>`;
}

export function homePage() {
  const cards = HERO_CARDS.map(
    (card) => `<a href="${card.href}" class="hero-glass-card hero-glass-card--${card.theme}">
  <div class="hero-glass-card-glow"></div>
  <div class="hero-glass-card-icon-wrap"><span class="hero-glass-card-icon">${card.icon}</span></div>
  <div class="hero-glass-card-body">
    <div class="hero-glass-card-code">${card.code}</div>
    <div class="hero-glass-card-title">${card.title}</div>
  </div>
  <div class="hero-glass-card-footer">
    <span class="hero-glass-card-pill"><span class="hero-glass-card-pill-text">${card.pillText}</span>
      <svg class="hero-glass-card-pill-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </span>
  </div>
</a>`
  ).join("");

  const stats = STATS.map(
    (stat) => `<div class="stat-item">
  <div class="stat-icon-wrap" style="background:${stat.iconBg};color:${stat.iconColor}"><span style="font-size:1.5rem;line-height:1">${stat.icon}</span></div>
  <div><div class="stat-val">${stat.value}</div><div class="stat-text">${stat.label}</div></div>
</div>`
  ).join("");

  const features = FEATURES.map(
    (feature) => `<article class="feature-card">
  <div class="feature-icon-badge" style="background:${feature.iconBg};color:${feature.iconColor}">${feature.icon}</div>
  <h3 class="feature-title">${feature.title}</h3>
  <p class="feature-desc">${feature.description}</p>
  <ul class="feature-list">
    ${feature.points
      .map(
        (point) =>
          `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>${point}</li>`
      )
      .join("")}
  </ul>
  <a href="${feature.href}" class="feature-link">${feature.linkText} <span>→</span></a>
</article>`
  ).join("");

  const schools = PROGRAM_CARDS.map(
    (card) => `<article class="program-card" data-school="${card.school}" style="display:flex">
  <div class="program-header"><span class="program-code-badge">${card.codeBadge}</span><span class="program-duration">${card.duration}</span></div>
  <h3 class="program-name">${card.name}</h3>
  <p class="program-school-name">${card.schoolName}</p>
  <div class="program-stats">${card.stats
    .map((stat) => `<div><div class="prog-stat-num">${stat.value}</div><div class="prog-stat-label">${stat.label}</div></div>`)
    .join("")}</div>
  <div class="program-actions">${card.actions
    .map(
      (action) =>
        `<a href="${action.href}" class="btn btn-${action.variant} btn-sm" style="flex:1">${action.label}</a>`
    )
    .join("")}</div>
</article>`
  ).join("");

  const miniQuestions = MINI_QUESTIONS.map(
    (question, index) => `<div class="home-quiz-item" data-index="${index}" data-correct="${question.correctIndex}" ${index === 0 ? "" : "hidden"}>
  <div class="mcq-question-text">${index + 1}. ${question.question}</div>
  <div class="mcq-options-grid">
    ${question.options
      .map(
        (option, optionIndex) =>
          `<div class="mcq-option" data-option="${optionIndex}"><span class="mcq-option-letter">${LETTERS[optionIndex]}</span><span class="mcq-option-label">${option}</span></div>`
      )
      .join("")}
  </div>
  <div class="mcq-explanation-box" hidden><strong>সঠিক উত্তরের ব্যাখ্যা:</strong> ${question.explanation}</div>
</div>`
  ).join("");

  const noticeCards = notices
    .map(
      (notice) => `<article class="notice-card">
  <div class="notice-date-badge"><span class="notice-day">${notice.day}</span><span class="notice-month">${notice.month}</span></div>
  <div class="notice-content">
    <span class="notice-tag">${notice.category}</span>
    <h3 class="notice-title">${notice.title}</h3>
    <a href="${notice.link}" ${/^https?:\/\//i.test(notice.link) ? 'target="_blank" rel="noopener"' : ""} class="notice-link">${notice.linkText}</a>
  </div>
</article>`
    )
    .join("");

  const body = `<main>
  <section class="hero-10ms-section" id="heroSection">
    <div class="hero-academic-backdrop">
      <svg class="bou-network-grid" width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="networkLineGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/><stop offset="50%" stop-color="#f97316" stop-opacity="0.4"/><stop offset="100%" stop-color="#38bdf8" stop-opacity="0.3"/></linearGradient>
          <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
        </defs>
        <path d="M 80 150 L 220 85 L 380 55 L 560 38 L 720 28 L 880 38 L 1060 55 L 1220 85 L 1360 150" stroke="url(#networkLineGrad)" stroke-width="1.5" stroke-dasharray="5 5"/>
        <path d="M 80 150 L 140 280 L 280 390" stroke="rgba(16,185,129,0.2)" stroke-width="1.2" stroke-dasharray="4 4"/>
        <path d="M 1360 150 L 1300 280 L 1160 390" stroke="rgba(56,189,248,0.2)" stroke-width="1.2" stroke-dasharray="4 4"/>
        <g filter="url(#glowGreen)"><circle cx="720" cy="28" r="6" fill="#10b981"/><circle cx="720" cy="28" r="14" stroke="#10b981" stroke-width="1" opacity="0.45" class="node-pulse"/></g>
        <circle cx="560" cy="38" r="4.5" fill="#34d399"/><circle cx="380" cy="55" r="4.5" fill="#38bdf8"/><circle cx="220" cy="85" r="4" fill="#fb923c"/><circle cx="80" cy="150" r="3.5" fill="#facc15"/><circle cx="140" cy="280" r="4" fill="#38bdf8"/><circle cx="280" cy="390" r="3.5" fill="#34d399"/><circle cx="880" cy="38" r="4.5" fill="#fb923c"/><circle cx="1060" cy="55" r="4.5" fill="#c084fc"/><circle cx="1220" cy="85" r="4" fill="#fb7185"/><circle cx="1360" cy="150" r="3.5" fill="#f43f5e"/><circle cx="1300" cy="280" r="4" fill="#fb923c"/><circle cx="1160" cy="390" r="3.5" fill="#38bdf8"/>
      </svg>
    </div>
    <div class="container hero-10ms-container">
      <div class="hero-mission-pill"><span class="pulsing-beacon-dot"></span><span class="mission-pill-text">সবার জন্য উন্মুক্ত দূরশিক্ষণ • বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় ডিজিটাল একাডেমি</span></div>
      <h1 class="hero-glow-title">শেখা হোক সহজে ও নির্ভুল!</h1>
      <div class="hero-cards-grid">${cards}</div>
      <div class="hero-10ms-cta-wrap"><a href="/books/" class="hero-10ms-cta-btn">ফ্রি ই-বুক ও সমাধান দেখুন →</a></div>
      <div class="hero-search-container">
        <div class="hero-10ms-search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="heroSearchInput" placeholder="বিষয় বা কোর্স কোড লিখে খুঁজুন (যেমন: ICT 1301, BBA, BSS, বাংলা, গণিত)...">
          <button id="heroSearchBtn">খুঁজুন</button>
        </div>
      </div>
    </div>
  </section>

  <section class="stats-bar-section"><div class="container"><div class="stats-card-container">${stats}</div></div></section>

  <section class="section" id="featuresSection">
    <div class="container">
      <header class="section-header">
        <span class="section-kicker">একাডেমিক সেবা</span>
        <h2 class="section-title">বাউবি শিক্ষার্থীদের পূর্ণাঙ্গ সহায়তা প্ল্যাটফর্ম</h2>
        <p class="section-desc">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের দূরশিক্ষণ পাঠ্যক্রমের আলোকে বিশেষায়িতভাবে তৈরি ডিজিটাল রিসোর্স।</p>
      </header>
      <div class="features-grid">${features}</div>
    </div>
  </section>

  <section class="section schools-section" id="schoolsSection">
    <div class="container">
      <header class="section-header">
        <span class="section-kicker">বাউবি অনুষদসমূহ</span>
        <h2 class="section-title">অনুষদ অনুযায়ী স্টাডি ম্যাটেরিয়াল খুঁজুন</h2>
        <p class="section-desc">আপনার স্কুল বা প্রোগ্রাম নির্বাচন করে সংশ্লিষ্ট বই ও বিগত পরীক্ষার সমাধান দেখুন।</p>
      </header>
      <div class="school-tabs" role="tablist">
        <button class="school-tab-btn active" data-school="all">সকল অনুষদ (All)</button>
        <button class="school-tab-btn" data-school="SOB">ব্যবসায় শিক্ষা (SOB)</button>
        <button class="school-tab-btn" data-school="SSHL">সামাজিক বিজ্ঞান ও ভাষা (SSHL)</button>
        <button class="school-tab-btn" data-school="OS">ওপেন স্কুল (OS - SSC/HSC)</button>
        <button class="school-tab-btn" data-school="SST">বিজ্ঞান ও প্রযুক্তি (SST)</button>
        <button class="school-tab-btn" data-school="SOE">শিক্ষা অনুষদ (SOE)</button>
      </div>
      <div class="program-cards-grid">${schools}</div>
    </div>
  </section>

  <section class="section mcq-preview-section">
    <div class="container">
      <header class="section-header">
        <span class="section-kicker">লাইভ ডেমো</span>
        <h2 class="section-title">সরাসরি অনলাইন MCQ মক টেস্ট দিয়ে দেখুন</h2>
        <p class="section-desc">তাৎক্ষণিক সঠিক উত্তর, ব্যাখ্যা ও টাইমার ম্যানেজমেন্ট যাচাই করুন।</p>
      </header>
      <div class="mcq-interactive-box" id="homeMiniQuiz">
        <div class="mcq-box-header">
          <div class="mcq-subject-tag"><span>🎯</span><span>সাধারণ জ্ঞান ও বাউবি একাডেমিক পরিচিতি</span></div>
          <div style="display:flex;align-items:center;gap:12px"><span class="mcq-timer" id="homeQuizCounter">প্রশ্ন ১ / ৩</span></div>
        </div>
        <div id="homeQuizStage">${miniQuestions}</div>
        <div id="homeQuizResult" hidden style="text-align:center;padding:28px 12px">
          <div style="font-size:3rem;margin-bottom:12px">🎉</div>
          <h3 style="font-size:1.5rem;font-weight:800;margin-bottom:8px">মক কুইজ সম্পন্ন হয়েছে!</h3>
          <p style="color:var(--text-secondary);margin-bottom:24px;font-size:1.0625rem">আপনি মোট <strong>${MINI_QUESTIONS.length}</strong> টি প্রশ্নের মধ্যে <strong id="homeQuizScore">0</strong> টি সঠিক উত্তর দিয়েছেন!</p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            <a href="/mcq-test/" class="btn btn-primary">পূর্ণাঙ্গ MCQ পরীক্ষা দিন</a>
            <button id="homeQuizRestart" class="btn btn-secondary">আবার চেষ্টা করুন</button>
          </div>
        </div>
        <div class="mcq-box-footer" style="margin-top:24px" id="homeQuizFooter">
          <a href="/mcq-test/" class="btn btn-secondary btn-sm">পূর্ণাঙ্গ পরীক্ষা এরিনা</a>
          <button class="btn btn-primary" id="homeQuizNext" disabled>পরবর্তী প্রশ্ন →</button>
        </div>
      </div>
    </div>
  </section>

  <section class="section notices-section" id="noticeSection">
    <div class="container">
      <header class="section-header">
        <span class="section-kicker">নোটিশ বোর্ড</span>
        <h2 class="section-title">সর্বশেষ বাউবি পরীক্ষার নোটিশ ও রুটিন</h2>
        <p class="section-desc">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের অফিসিয়াল নোটিশ ও পরীক্ষার সময়সূচির নিয়মিত আপডেট।</p>
      </header>
      <div class="notice-cards-grid">${noticeCards}</div>
    </div>
  </section>
</main>`;

  return layout({
    title: "BOU Acadex - বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় স্টুডেন্ট একাডেমিক হাব",
    description:
      "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের (BOU) শিক্ষার্থীদের জন্য সকল পাঠ্যবই (ই-বুক), বিগত বছরের প্রশ্ন ও মডেল সমাধান এবং লাইভ টাইমার সহ আনলিমিটেড MCQ টেস্ট।",
    active: "home",
    body,
    home: true,
    showSchools: true,
  });
}

export function booksPage() {
  const bySemester = new Map();
  for (const book of books) {
    if (!bySemester.has(book.semester)) bySemester.set(book.semester, []);
    bySemester.get(book.semester).push(book);
  }
  const groups = [...bySemester.entries()].sort(([a], [b]) => a - b);
  const cards = groups
    .map(
      ([semester, groupBooks]) => `<h3 class="books-semester-row" data-semester-group="${semester}">
  <span aria-hidden="true">📚</span><span>${SEMESTER_LABELS[semester] ?? `Semester ${semester}`}</span>
  <span class="books-semester-count">${groupBooks.length} টি কোর্স</span>
</h3>
${groupBooks.map(bookCard).join("")}`
    )
    .join("");

  const body = `<main class="section">
  <div class="container">
    <header class="section-header">
      <span class="section-kicker">ডিজিটাল টেক্সটবুক আর্কাইভ</span>
      <h1 class="section-title">বাউবি অফিসিয়াল ই-বুক ও স্টাডি মডিউল</h1>
      <p class="section-desc">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের অফিসিয়াল পাঠ্যবই ও সিলেবাসের আলোকে তৈরি স্ব-শিক্ষা মডিউল অনলাইনে সহজে পড়ুন।</p>
    </header>
    ${booksFilterBar()}
    <div class="books-grid" id="booksContainer">${cards}</div>
    <div class="books-empty-state" id="booksEmptyState" hidden>
      <p class="books-empty-title">এই ফিল্টারে কোনো ই-বুক পাওয়া যায়নি</p>
      <p class="books-empty-hint">উপরের বিষয় থেকে অন্য বিষয় বেছে নিন অথবা সার্চে অন্য কিছু লিখে খুঁজুন।</p>
    </div>
  </div>
</main>`;

  return layout({
    title: "বাউবি অফিসিয়াল ই-বুক ও মডিউল লাইব্রেরি | BOU Acadex",
    description:
      "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের অফিসিয়াল পাঠ্যবই, ইউনিটভিত্তিক ই-বুক রিডার ও DCSA স্টাডি মডিউল।",
    active: "books",
    body,
  });
}

export function questionsPage() {
  const body = `<main class="section">
  <div class="container">
    <header class="section-header">
      <span class="section-kicker">পরীক্ষা প্রশ্নব্যাংক আর্কাইভ</span>
      <h1 class="section-title">বাউবি বিগত বছরের প্রশ্ন ও মডেল সমাধান</h1>
      <p class="section-desc">প্রামাণ্য অতীত পরীক্ষার প্রশ্নপত্র এবং বাউবি মার্কিং নিয়মানুযায়ী সর্বোচ্চ নম্বর পাওয়ার উপযোগী সাজানো সমাধান।</p>
    </header>
    <div class="content-filter-bar">
      <div class="filter-group">
        <label for="qYearFilter">পরীক্ষার সাল:</label>
        <select id="qYearFilter" class="filter-select">
          <option value="all">সকল সাল (All Years)</option>
          <option value="2023">২০২৩ ফাইনাল</option><option value="2022">২০২২ ফাইনাল</option>
          <option value="2021">২০২১ ফাইনাল</option><option value="2020">২০২০ ফাইনাল</option>
          <option value="2019">২০১৯ ফাইনাল</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="qProgramFilter">প্রোগ্রাম:</label>
        <select id="qProgramFilter" class="filter-select">
          <option value="all">সকল প্রোগ্রাম (All Programs)</option>
          <option value="BBA">BBA (ব্যবসায় শিক্ষা স্কুল)</option>
          <option value="BSS">BA / BSS (সামাজিক বিজ্ঞান ও ভাষা)</option>
          <option value="HSC">HSC (ওপেন স্কুল)</option>
          <option value="CSE">B.Sc in CSE (বিজ্ঞান ও প্রযুক্তি)</option>
          <option value="LLB">LL.B Honors (আইন অনুষদ)</option>
        </select>
      </div>
      <div class="filter-search-input">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="qSearchInput" placeholder="বিষয়ের নাম, প্রশ্নপত্রের শিরোনাম বা কোর্স কোড লিখে খুঁজুন...">
      </div>
    </div>
    <div class="questions-list" id="questionsContainer">${
      papers.length === 0
        ? `<div class="books-empty-state"><p class="books-empty-title">এই মুহূর্তে কোনো প্রশ্নপত্র পাওয়া যায়নি</p><p class="books-empty-hint">নতুন প্রশ্ন ও মডেল সমাধান শীঘ্রই যুক্ত করা হবে।</p></div>`
        : ""
    }</div>
  </div>
</main>`;

  return layout({
    title: "বাউবি বিগত বছরের প্রশ্ন ও মডেল সমাধান | BOU Acadex",
    description:
      "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের (BOU) টার্ম ফাইনাল পরীক্ষার বিগত বছরের প্রশ্নব্যাংক এবং স্টেপ-বাই-স্টেপ মডেল সমাধান।",
    active: "questions",
    body,
  });
}

export function mcqSourceData(bank) {
  return `<div id="mcqQuestionData" data-duration="${bank.duration || 600}" hidden>
  ${bank.questions
    .map(
      (question, index) => `<article class="mcq-source-question" data-index="${index}" data-correct="${question.correct}" data-unit="${esc(question.unit ?? "")}" data-lesson="${esc(question.lesson ?? "")}">
    <div class="mcq-source-text">${question.question}</div>
    <ol class="mcq-source-options">${question.options.map((option) => `<li>${option}</li>`).join("")}</ol>
    <div class="mcq-source-explanation">${question.explanation}</div>
  </article>`
    )
    .join("")}
</div>`;
}

export function mcqEngine({ bank, header = "", selectLabel = true }) {
  const first = bank.questions[0];
  const duration = bank.duration || 600;
  const initialTime = `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, "0")}`;
  const palette = bank.questions
    .map(
      (_, index) =>
        `<button class="palette-number-btn${index === 0 ? " active" : ""}" data-palette="${index}">${index + 1}</button>`
    )
    .join("");
  const options = first.options
    .map(
      (option, index) =>
        `<div class="mcq-option" data-option="${index}"><span class="mcq-option-letter">${LETTERS[index]}</span><span class="mcq-option-label">${option}</span></div>`
    )
    .join("");

  return `<main class="section">
  <div class="container">
    ${header}
    <div class="content-filter-bar" style="margin-bottom:28px">
      <div class="filter-group">
        <label for="mcqSubjectSelect">কোর্স / বিষয় নির্বাচন করুন:</label>
        <select id="mcqSubjectSelect" class="filter-select">
          <option value="computer_basics">${bank.title} (${bank.code})</option>
        </select>
      </div>
      <div class="filter-group" style="align-items:center;gap:16px">
        <span style="font-size:0.8125rem;font-weight:700;color:var(--text-muted)">মোড:</span>
        <label style="display:flex;align-items:center;gap:6px;font-size:0.875rem;cursor:pointer;font-weight:600"><input type="radio" name="mcqMode" value="exam" checked><span>টাইমড এক্সাম মোড (Exam Mode)</span></label>
        <label style="display:flex;align-items:center;gap:6px;font-size:0.875rem;cursor:pointer;font-weight:600"><input type="radio" name="mcqMode" value="practice"><span>তাৎক্ষণিক প্র্যাকটিস মোড (Practice)</span></label>
      </div>
    </div>

    <div class="mcq-engine-wrapper" id="mcqMainArena">
      <section class="mcq-main-arena" aria-label="Exam Question Area">
        <div class="mcq-box-header">
          <div>
            <span class="program-code-badge" id="arenaSubjectCode">${bank.code}</span>
            <h3 id="arenaSubjectTitle" style="font-size:1.15rem;font-weight:800;margin-top:4px">${bank.title}</h3>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <div class="mcq-timer" id="examTimerBadge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span id="examTimerDisplay">${initialTime}</span>
            </div>
          </div>
        </div>

        <div style="font-size:0.8125rem;font-weight:800;color:var(--tms-green);text-transform:uppercase;margin-bottom:10px;letter-spacing:0.5px">
          প্রশ্ন <span id="currentQNum">1</span> / <span id="totalQCount">${bank.questions.length}</span>
        </div>

        <div class="mcq-question-source" id="arenaQuestionSource" style="display:${first.unit || first.lesson ? "flex" : "none"}">
          ${first.unit ? `<span class="mcq-question-unit">${first.unit}</span>` : ""}
          ${first.lesson ? `<span class="mcq-question-lesson">${first.lesson}</span>` : ""}
        </div>

        <div class="mcq-question-text" id="arenaQuestionText">${first.question}</div>
        <div class="mcq-options-grid" id="arenaOptionsWrap">${options}</div>

        <div class="mcq-reveal-row" id="mcqRevealRow" style="display:none">
          <button type="button" class="btn btn-secondary btn-sm" id="mcqRevealAnswerBtn">👁 সঠিক উত্তর দেখুন</button>
          <span class="mcq-reveal-hint">উত্তর দেখে প্র্যাকটিস করুন — পরীক্ষা মোডে এই সুবিধা থাকবে না।</span>
        </div>

        <div class="mcq-explanation-box" id="arenaPracticeExplanation" style="display:none"></div>

        <div class="mcq-box-footer" style="padding-top:20px;border-top:1px solid var(--border-subtle);margin-top:24px">
          <div style="display:flex;gap:10px">
            <button class="btn btn-secondary btn-sm" id="mcqPrevBtn" disabled>← পূর্ববর্তী</button>
            <button class="btn btn-secondary btn-sm" id="mcqMarkReviewBtn">☆ Mark for Review</button>
          </div>
          <div style="display:flex;gap:10px">
            <button class="btn btn-primary btn-sm" id="mcqNextBtn">পরবর্তী প্রশ্ন →</button>
            <button class="btn btn-red btn-sm" id="mcqSubmitExamBtn">পরীক্ষা সাবমিট করুন</button>
          </div>
        </div>
      </section>

      <aside class="mcq-sidebar" aria-label="Question Palette">
        <h4 style="font-size:1rem;font-weight:800;margin-bottom:16px;color:var(--text-main)">প্রশ্ন প্যালেট (Question Palette)</h4>
        <div class="mcq-palette-grid" id="mcqPaletteGrid">${palette}</div>
        <div class="palette-legend">
          <div class="legend-item"><span class="legend-dot answered"></span><span>উত্তর দেওয়া হয়েছে (Answered)</span></div>
          <div class="legend-item"><span class="legend-dot marked"></span><span>রিভিউর জন্য রাখা (Marked)</span></div>
          <div class="legend-item"><span class="legend-dot" style="background:var(--tms-green-light);border:1.5px solid var(--tms-green)"></span><span>বর্তমান প্রশ্ন (Current)</span></div>
          <div class="legend-item"><span class="legend-dot unanswered"></span><span>দেখা হয়নি (Not Visited)</span></div>
        </div>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--border-subtle)">
          <div style="font-size:0.8125rem;color:var(--text-muted);line-height:1.5">💡 <strong>টিপস:</strong> উপরের যেকোনো প্রশ্ন নম্বরে ক্লিক করে সরাসরি সেই প্রশ্নে যেতে পারবেন।</div>
        </div>
      </aside>
    </div>

    <div id="mcqResultSection" hidden></div>
    ${mcqSourceData(bank)}
  </div>
</main>`;
}

export function mcqTestPage() {
  const bank = mcqBanks.computer_basics;
  const body = mcqEngine({ bank });
  return layout({
    title: "বাউবি অনলাইন MCQ মক টেস্ট ও প্র্যাকটিস সিমুলেটর | BOU Acadex",
    description:
      "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের বিভিন্ন কোর্সের রিয়েল-টাইম টাইমার সহ অনলাইন MCQ মক টেস্ট। তাৎক্ষণিক স্কোরকার্ড, নির্ভুলতা বিশ্লেষণ ও মডেল ব্যাখ্যা।",
    active: "mcq",
    body,
  });
}
