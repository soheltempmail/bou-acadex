import fs from "node:fs";
import path from "node:path";

export const ROOT = process.cwd();
export const BETA = path.join(ROOT, "beta");
export const DATA = path.join(BETA, "src", "data");

export const books = JSON.parse(fs.readFileSync(path.join(DATA, "books.json"), "utf8"));
export const mcqBanks = JSON.parse(fs.readFileSync(path.join(DATA, "mcq.json"), "utf8"));
export const writtenBanks = JSON.parse(
  fs.readFileSync(path.join(DATA, "written-questions.json"), "utf8")
);
export const papers = JSON.parse(fs.readFileSync(path.join(DATA, "questions.json"), "utf8"));
export const notices = JSON.parse(fs.readFileSync(path.join(DATA, "notices.json"), "utf8"));
export const sscSubjects = JSON.parse(fs.readFileSync(path.join(DATA, "sscSubjects.json"), "utf8"));

export const SEMESTER_LABELS = {
  1: "১ম সেমিস্টার (Semester 1)",
  2: "২য় সেমিস্টার (Semester 2)",
  3: "৩য় সেমিস্টার (Semester 3)",
};

export const SCHOOL_META = {
  SOB: { label: "School of Business", gradient: "linear-gradient(135deg, #173b55 0%, #0c2340 100%)" },
  SSHL: { label: "School of SSHL", gradient: "linear-gradient(135deg, #9a1b24 0%, #601016 100%)" },
  OS: { label: "Open School", gradient: "linear-gradient(135deg, #0b6623 0%, #073814 100%)" },
  SST: { label: "Science & Technology", gradient: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)" },
  SOE: { label: "School of Education", gradient: "linear-gradient(135deg, #155e75 0%, #0e7490 100%)" },
};

export const BOOK_GRADIENTS = {
  "DCSA-1201": "linear-gradient(135deg, #0f766e 0%, #134e4a 100%)",
  "DCSA-1302": "linear-gradient(135deg, #0891b2 0%, #164e63 100%)",
  "DCSA-1303": "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
  "DCSA-1304": "linear-gradient(135deg, #059669 0%, #064e3b 100%)",
  "DCSA-2301": "linear-gradient(135deg, #1d4ed8 0%, #1e1b4b 100%)",
  "DCSA-2302": "linear-gradient(135deg, #9a3412 0%, #7c2d12 100%)",
  "DCSA-2303": "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
  "DCSA-2304": "linear-gradient(135deg, #4338ca 0%, #312e81 100%)",
  "DCSA-3301": "linear-gradient(135deg, #c2410c 0%, #9a3412 100%)",
  "DCSA-3302": "linear-gradient(135deg, #b45309 0%, #78350f 100%)",
  "DCSA-3303": "linear-gradient(135deg, #047857 0%, #064e3b 100%)",
  "DCSA-3304": "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
};

export const HERO_CARDS = [
  {
    href: "/books/?level=Secondary",
    code: "SSC",
    title: "৯ম ও ১০ম শ্রেণি",
    icon: "📚",
    pillText: "ই-বুক ও সমাধান",
    theme: "card-1",
  },
  {
    href: "/books/?level=HigherSecondary",
    code: "HSC",
    title: "উচ্চ মাধ্যমিক (HSC)",
    icon: "🎯",
    pillText: "বিগত প্রশ্ন সমাধান",
    theme: "card-2",
  },
  {
    href: "/books/?program=DCSA",
    code: "DCSA",
    title: "ডিপ্লোমা ইন সিএস",
    icon: "💻",
    pillText: "ল্যাব ও স্টাডি গাইড",
    theme: "card-3",
  },
  {
    href: "/questions/?school=SST",
    code: "B.SC CSE",
    title: "কম্পিউটার সায়েন্স",
    icon: "⚡",
    pillText: "টার্ম ফাইনাল সমাধান",
    theme: "card-4",
  },
  {
    href: "/books/?program=BBA",
    code: "BBA",
    title: "ব্যবসায় প্রশাসন",
    icon: "💼",
    pillText: "বই ও বিগত প্রশ্ন",
    theme: "card-5",
  },
  {
    href: "/books/?program=BSS",
    code: "BA / BSS",
    title: "ডিগ্রি ও অনার্স",
    icon: "📖",
    pillText: "নোটস ও প্রশ্নব্যাংক",
    theme: "card-6",
  },
];

export const STATS = [
  { iconBg: "#ecfdf5", iconColor: "#149353", icon: "📚", value: "১,২৪০+", label: "ই-বুক ও মডিউল" },
  { iconBg: "#fef2f2", iconColor: "#fe2601", icon: "📝", value: "১০+ বছর", label: "বিগত প্রশ্ন ও সমাধান" },
  { iconBg: "#fef3c7", iconColor: "#f59e0b", icon: "✅", value: "৪২০+", label: "ইন্টারঅ্যাক্টিভ MCQ টেস্ট" },
  { iconBg: "#e0f2fe", iconColor: "#0284c7", icon: "👥", value: "১৮,৫০০+", label: "সক্রিয় বাউবি শিক্ষার্থী" },
];

export const FEATURES = [
  {
    iconBg: "#ecfdf5",
    iconColor: "#149353",
    icon: "📖",
    title: "ই-বুক ও মডিউল লাইব্রেরি",
    description:
      "বাউবির সকল স্কুলের পূর্ণাঙ্গ পাঠ্যবই। ব্রাউজারে সরাসরি অনলাইনে পড়ুন অথবা অফলাইনে পড়ার জন্য সেভ করে রাখুন।",
    points: ["পূর্ণাঙ্গ সিলেবাসের পাঠ্যবই", "ইউনিটভিত্তিক স্মার্ট রিডার ভিউ", "মোবাইল ও ডার্ক-মোড ফ্রেন্ডলি"],
    href: "/books/",
    linkText: "ই-লাইব্রেরি ব্রাউজ করুন",
  },
  {
    iconBg: "#fef3c7",
    iconColor: "#f59e0b",
    icon: "📝",
    title: "বিগত বছরের প্রশ্ন ও উত্তর",
    description:
      "বিগত ৫-১০ বছরের টার্ম ফাইনাল পরীক্ষার প্রশ্নব্যাংক, সাথে অভিজ্ঞ শিক্ষকদের তৈরি নির্ভুল মডেল সমাধান ও নোটস।",
    points: ["১ম থেকে ৮ম সেমিস্টার পরীক্ষার প্রশ্ন", "ধাপভিত্তিক নির্ভুল সমাধান ও ডায়াগ্রাম", "কোর্স কোড দিয়ে দ্রুত ফিল্টারিং"],
    href: "/questions/",
    linkText: "প্রশ্নব্যাংক খুঁজুন",
  },
  {
    iconBg: "#fef2f2",
    iconColor: "#fe2601",
    icon: "⚡",
    title: "ইন্টারঅ্যাক্টিভ MCQ টেস্ট",
    description:
      "বাস্তব পরীক্ষার আবহে রিয়েল-টাইম টাইমার সহ মক টেস্ট দিন। তাৎক্ষণিক স্কোরকার্ড, নির্ভুলতা বিশ্লেষণ ও ব্যাখ্যা।",
    points: ["কাউন্টডাউন টাইমার ও সতর্কবার্তা", "তাৎক্ষণিক স্কোর ও সঠিক উত্তরের ব্যাখ্যা", "বিষয়ভিত্তিক আনলিমিটেড প্র্যাকটিস"],
    href: "/mcq-test/",
    linkText: "মক টেস্ট শুরু করুন",
  },
];

export const PROGRAM_CARDS = [
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
      { href: "/books/?program=BBA", label: "ই-বুকস", variant: "primary" },
      { href: "/questions/?program=BBA", label: "বিগত প্রশ্ন", variant: "secondary" },
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
      { href: "/books/?program=BSS", label: "ই-বুকস", variant: "primary" },
      { href: "/questions/?program=BSS", label: "সমাধান দেখুন", variant: "secondary" },
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
      { href: "/books/?level=HigherSecondary", label: "পাঠ্যবই", variant: "primary" },
      { href: "/mcq-test/", label: "MCQ পরীক্ষা", variant: "secondary" },
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
      { href: "/books/?level=Undergraduate", label: "বইসমূহ", variant: "secondary" },
      { href: "/questions/?school=SST", label: "বিগত প্রশ্ন", variant: "primary" },
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
      { href: "/books/?program=BED", label: "টেক্সটবুক", variant: "primary" },
      { href: "/questions/", label: "প্রশ্ন ব্যাংক", variant: "secondary" },
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
      { href: "/books/?level=Undergraduate", label: "আইন বই", variant: "secondary" },
      { href: "/questions/?program=LLB", label: "বিগত সমাধান", variant: "primary" },
    ],
  },
];

export const MINI_QUESTIONS = [
  {
    question: "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU) কত সালে প্রতিষ্ঠিত হয়?",
    options: ["১৯৮৮ সালে", "১৯৯২ সালে", "১৯৯৫ সালে", "১৯৯৯ সালে"],
    correctIndex: 1,
    explanation:
      "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় আইন ১৯৯২ (১৯৯২ সনের ৩৮ নং আইন) অনুযায়ী ২০ অক্টোবর ১৯৯২ সালে প্রতিষ্ঠিত হয়।",
  },
  {
    question: "BBA প্রোগ্রামের মৌলিক নীতি অনুযায়ী 'Double Entry System' এর জনক কে?",
    options: ["এডাম স্মিথ", "লুকা প্যাসিওলি", "এফ ডব্লিউ টেলর", "হেনরি ফেয়ল"],
    correctIndex: 1,
    explanation:
      "১৪৯৪ সালে ইতালীয় গণিতবিদ লুকা প্যাসিওলি (Luca Pacioli) দুতরফা দাখিলা পদ্ধতির মূলনীতি ব্যাখ্যা করেন।",
  },
  {
    question: "কম্পিউটার ও তথ্যপ্রযুক্তিতে (ICT) IPv4 অ্যাড্রেস কত বিটের হয়ে থাকে?",
    options: ["১৬ বিট", "৩২ বিট", "৬৪ বিট", "১২৮ বিট"],
    correctIndex: 1,
    explanation:
      "IPv4 অ্যাড্রেস হলো ৩২ বিটের সংখ্যা যা ৪টি অক্টেটে বিভক্ত থাকে (যেমন 192.168.1.1)।",
  },
];

export const COURSE_ASSESSMENT = [
  { key: "written", label: "লিখিত পরীক্ষা", marks: 70, note: "MCQ + লিখিত" },
  { key: "practical", label: "ব্যবহারিক", marks: 20, note: "৩ অংশে বিভক্ত" },
  { key: "tma", label: "TMA", marks: 10, note: "টিউটর-মার্কড" },
];
export const COURSE_TOTAL_MARKS = 100;
export const COURSE_PASS_PERCENT = 40;
export const WRITTEN_EXAM_DURATION = "লিখিত অংশ প্রায় ২ ঘণ্টা ৪০ মিনিট + MCQ ২০ মিনিট";
export const EXAM_PATTERN = [
  { key: "mcq", label: "MCQ প্রশ্ন", labelEn: "MCQ", questions: 40, answer: 40, marksEach: 0.5, total: 20 },
  { key: "short", label: "সংক্ষিপ্ত প্রশ্ন", labelEn: "Short Questions (Part-A)", questions: 10, answer: 8, marksEach: 2.5, total: 20 },
  { key: "analytical", label: "বিশ্লেষণী প্রশ্ন", labelEn: "Analytical Questions (Part-B)", questions: 8, answer: 5, marksEach: 6, total: 30 },
];
export const EXAM_TOTAL_MARKS = 70;
export const PRACTICAL_BREAKDOWN = [
  { label: "পরীক্ষা / বাস্তবায়ন", marks: 10 },
  { label: "রেকর্ড বুক / ল্যাব নোটবুক", marks: 5 },
  { label: "ভাইভা", marks: 5 },
];
export const PROJECT_SUBJECT_CODE = "DCSA 3304";
export const PROJECT_TOTAL_MARKS = 100;
export const PROJECT_PASS_PERCENT = 50;
export const PROJECT_BREAKDOWN = [
  { label: "বাস্তব জীবনের প্রজেক্ট রিপোর্ট", marks: 80 },
  { label: "ভাইভা", marks: 20 },
];

export const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export const toBn = (value) =>
  String(value).replace(/[0-9]/g, (digit) => BANGLA_DIGITS[Number(digit)]);

export const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const slug = (subjectCode) =>
  subjectCode
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const bookGradient = (book) =>
  BOOK_GRADIENTS[book.subjectCode] ?? SCHOOL_META[book.school]?.gradient ?? "#173b55";

export const mcqBankForBook = (book) =>
  Object.entries(mcqBanks).find(([, bank]) => bank.code === book.subjectCode) ?? null;

export const writtenBankForBook = (book) =>
  Object.entries(writtenBanks).find(([, bank]) => bank.code === book.subjectCode) ?? null;

export const paperForBook = (book) =>
  papers.find((paper) => paper.subjectCode === book.subjectCode) ?? null;

export function logo(prefix) {
  const green = `${prefix}-tmsGreenGrad`;
  const amber = `${prefix}-tmsAmberGrad`;
  const red = `${prefix}-tmsRedGrad`;
  const shadow = `${prefix}-logoShadow`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" class="brand-logo-img" aria-label="BOU Acadex Logo" role="img">
  <defs>
    <linearGradient id="${green}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1cab55"/><stop offset="60%" stop-color="#149353"/><stop offset="100%" stop-color="#0e6e3c"/>
    </linearGradient>
    <linearGradient id="${amber}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffbd01"/><stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <linearGradient id="${red}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fe2601"/><stop offset="100%" stop-color="#ea4335"/>
    </linearGradient>
    <filter id="${shadow}" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#149353" flood-opacity="0.25"/>
    </filter>
  </defs>
  <g transform="translate(15, 10)" filter="url(#${shadow})">
    <rect x="0" y="0" width="100" height="100" rx="26" fill="url(#${green})"/>
    <ellipse cx="50" cy="50" rx="42" ry="22" fill="none" stroke="url(#${amber})" stroke-width="2.5" stroke-dasharray="4 2" opacity="0.75" transform="rotate(-25 50 50)"/>
    <path d="M 22 72 Q 50 63 50 78 Q 50 63 78 72 L 78 54 Q 50 45 50 60 Q 50 45 22 54 Z" fill="#FFFFFF" opacity="0.98"/>
    <path d="M 50 60 L 50 78" stroke="#149353" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 24 74 Q 50 66 50 78" stroke="url(#${amber})" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M 76 74 Q 50 66 50 78" stroke="url(#${amber})" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <polygon points="50,22 80,34 50,46 20,34" fill="#FFFFFF"/>
    <polygon points="50,25 74,34 50,43 26,34" fill="url(#${amber})"/>
    <path d="M 32 39 L 32 49 Q 50 58 68 49 L 68 39 Q 50 48 32 39 Z" fill="url(#${red})"/>
    <circle cx="50" cy="34" r="3" fill="#FFFFFF"/>
    <path d="M 50 34 C 65 37 72 45 74 54" fill="none" stroke="url(#${amber})" stroke-width="2" stroke-linecap="round"/>
    <circle cx="74" cy="55" r="2.5" fill="#fe2601"/>
    <circle cx="84" cy="18" r="4" fill="url(#${red})"/>
    <circle cx="84" cy="18" r="6" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.8"/>
  </g>
  <g transform="translate(132, 22)">
    <text x="0" y="44" font-family="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="44" class="brand-logo-bou" letter-spacing="0.5">BOU</text>
    <text x="110" y="44" font-family="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" font-weight="800" font-size="44" fill="#149353" letter-spacing="0.5">ACAD<tspan fill="#fe2601">EX</tspan></text>
    <path d="M 294 18 Q 298 25 305 25 Q 298 25 294 32 Q 294 25 287 25 Q 294 25 294 18 Z" fill="url(#${amber})"/>
    <rect x="0" y="56" width="366" height="24" rx="12" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1" class="brand-logo-badge-bg"/>
    <circle cx="12" cy="68" r="3.5" fill="#fe2601"/>
    <text x="24" y="72.5" font-family="'Hind Siliguri', 'Outfit', sans-serif" font-weight="700" font-size="11" fill="#0f766e" letter-spacing="0.15" textLength="316" lengthAdjust="spacing" class="brand-logo-badge-text">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় • STUDENT ACADEMIC HUB</text>
  </g>
</svg>`;
}

const NAV_LINKS = [
  { key: "home", href: "/home/", label: "Home" },
  { key: "books", href: "/books/", label: "E-Books" },
  { key: "questions", href: "/questions/", label: "Past Questions" },
  { key: "mcq", href: "/mcq-test/", label: "MCQ Test" },
];

const SUN_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const MOON_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

export function header(active, showSchools = false) {
  const links = NAV_LINKS.map(
    (link) =>
      `<a href="${link.href}" class="nav-link${active === link.key ? " active" : ""}">${link.label}</a>`
  ).join("");
  return `<header class="main-header" id="mainHeader">
  <div class="container nav-container">
    <a href="/home/" class="brand-link" aria-label="BOU Acadex Home">${logo("header-logo")}</a>
    <nav class="nav-menu" id="mainNavMenu" aria-label="Primary Navigation">
      ${links}
      ${showSchools ? '<a href="#schoolsSection" class="nav-link">Schools</a>' : ""}
    </nav>
    <div class="nav-actions">
      <button class="icon-btn" id="themeToggleBtn" aria-label="Toggle Dark or Light theme" title="Toggle Theme">
        <span class="theme-icon theme-icon-sun">${SUN_SVG}</span>
        <span class="theme-icon theme-icon-moon">${MOON_SVG}</span>
      </button>
      <a href="/mcq-test/" class="btn btn-primary btn-sm">Start MCQ Test</a>
      <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open mobile navigation menu" aria-expanded="false">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>
  </div>
</header>`;
}

export function footer(variant = "compact") {
  if (variant === "compact") {
    return `<footer class="main-footer">
  <div class="container footer-bottom">
    <div>&copy; 2024-2026 <strong>BOU Acadex</strong>. বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় ডিজিটাল একাডেমি।</div>
    <div class="footer-bottom-nav">
      <a href="/home/">হোম</a><a href="/about/">আমাদের সম্পর্কে</a><a href="/terms/">শর্তাবলী</a>
      <a href="/disclaimer/">অস্বীকৃতি</a><a href="/privacy/">গোপনীয়তা</a><a href="/api-docs/">API</a>
    </div>
  </div>
</footer>`;
  }

  return `<footer class="main-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        ${logo("footer-logo")}
        <p class="footer-desc"><strong>BOU Acadex</strong> হলো বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের শিক্ষার্থীদের একটি সমন্বিত ডিজিটাল একাডেমিক প্ল্যাটফর্ম — ই-বুক, বিগত প্রশ্ন সমাধান এবং অনলাইন MCQ মক টেস্ট এর নির্ভরযোগ্য ঠিকানা।</p>
        <div class="footer-social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook">FB</a>
          <a href="https://youtube.com" target="_blank" rel="noopener" class="social-btn" aria-label="YouTube">YT</a>
          <a href="https://t.me" target="_blank" rel="noopener" class="social-btn" aria-label="Telegram">TG</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>স্টাডি রিসোর্স</h4>
        <ul class="footer-links">
          <li><a href="/books/">ই-বুক ও মডিউল লাইব্রেরি</a></li>
          <li><a href="/questions/">বিগত বছরের প্রশ্ন ও উত্তর</a></li>
          <li><a href="/mcq-test/">অনলাইন MCQ টেস্ট এরিনা</a></li>
          <li><a href="https://ebookbou.edu.bd" target="_blank" rel="noopener">বাউবি অফিসিয়াল ই-বুক ↗</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>বাউবি অনুষদসমূহ</h4>
        <ul class="footer-links">
          <li><a href="/books/?level=Undergraduate">ব্যবসায় শিক্ষা স্কুল (SOB)</a></li>
          <li><a href="/books/?level=Undergraduate">সামাজিক বিজ্ঞান ও ভাষা (SSHL)</a></li>
          <li><a href="/books/?level=Secondary">ওপেন স্কুল (SSC ও HSC)</a></li>
          <li><a href="/books/?level=Diploma">বিজ্ঞান ও প্রযুক্তি (SST/DCSA)</a></li>
          <li><a href="/books/?level=Postgraduate">শিক্ষা স্কুল (SOE)</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>প্ল্যাটফর্ম ও নীতিমালা</h4>
        <ul class="footer-links">
          <li><a href="/about/">আমাদের সম্পর্কে (About Us)</a></li>
          <li><a href="/terms/">ব্যবহারের শর্তাবলী (Terms)</a></li>
          <li><a href="/disclaimer/">আইনি অস্বীকৃতি (Disclaimer)</a></li>
          <li><a href="/privacy/">গোপনীয়তা নীতি (Privacy)</a></li>
          <li><a href="/api-docs/">ডেভেলপার API ডক্স</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>অফিসিয়াল বাউবি লিংক</h4>
        <ul class="footer-links">
          <li><a href="https://bou.ac.bd" target="_blank" rel="noopener">বাউবি মূল ওয়েবসাইট ↗</a></li>
          <li><a href="https://osapsnew.bou.ac.bd" target="_blank" rel="noopener">OSAPS ভর্তি পোর্টাল ↗</a></li>
          <li><a href="https://result.bou.ac.bd" target="_blank" rel="noopener">অফিসিয়াল রেজাল্ট ↗</a></li>
          <li><a href="https://exam.bou.ac.bd" target="_blank" rel="noopener">পরীক্ষা সংক্রান্ত সেবা ↗</a></li>
          <li><a href="https://lms.bou.ac.bd" target="_blank" rel="noopener">বাউবি এলএমএস (LMS) ↗</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div>&copy; 2024-2026 <strong>BOU Acadex</strong>. বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের শিক্ষার্থীদের জন্য উৎসর্গীকৃত।</div>
      <div class="footer-bottom-nav">
        <a href="/about/">আমাদের সম্পর্কে</a><span>•</span><a href="/terms/">ব্যবহারের শর্তাবলী</a><span>•</span>
        <a href="/disclaimer/">আইনি অস্বীকৃতি ও গ্রন্থস্বত্ব</a><span>•</span><a href="/privacy/">গোপনীয়তা নীতি</a><span>•</span><a href="/api-docs/">API ডক্স</a>
      </div>
    </div>
  </div>
</footer>`;
}

export function layout({ title, description, active = "", body, home = false, showSchools = false }) {
  return `<!DOCTYPE html>
<html lang="bn" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="icon" href="/assets/favicon.svg">
  <link rel="stylesheet" href="/assets/css/style.css">
  <link rel="stylesheet" href="/assets/css/static.css">
  <script>
  (function(){try{var key='bou_acadex_theme';var saved=localStorage.getItem(key);var prefersDark=!saved&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var active=saved==='dark'||(!saved&&prefersDark)?'dark':'light';document.documentElement.setAttribute('data-theme',active);}catch(e){}})();
  </script>
</head>
<body>
${header(active, showSchools)}
${body}
${footer(home ? "default" : "compact")}
<div id="toastHost" style="position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none"></div>
<script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}

export function legalTabs(current) {
  const tabs = [
    { key: "about", href: "/about/", label: "আমাদের সম্পর্কে (About)" },
    { key: "terms", href: "/terms/", label: "ব্যবহারের শর্তাবলী (Terms)" },
    { key: "disclaimer", href: "/disclaimer/", label: "আইনি অস্বীকৃতি (Disclaimer)" },
    { key: "privacy", href: "/privacy/", label: "গোপনীয়তা নীতি (Privacy)" },
    { key: "api", href: "/api-docs/", label: "ডেভেলপার API" },
  ];
  return `<div class="doc-nav-tabs" role="navigation" aria-label="নীতিমালা ও তথ্য মেনু">
    ${tabs
      .map(
        (tab) =>
          `<a href="${tab.href}" class="doc-nav-tab${tab.key === current ? " active" : ""}">${tab.label}</a>`
      )
      .join("")}
  </div>`;
}

export function breadcrumb(book, current, options = {}) {
  const overview = `/program/${slug(book.subjectCode)}/overview/`;
  return `<nav class="subject-overview-breadcrumb" aria-label="Breadcrumb">
    <a href="/home/">Home</a><span aria-hidden="true">/</span>
    <a href="/books/">E-Books</a><span aria-hidden="true">/</span>
    <a href="/books/?program=${encodeURIComponent(book.program)}">${book.program} Program</a><span aria-hidden="true">/</span>
    ${options.linkCode === false ? "" : `<a href="${overview}">${book.subjectCode}</a><span aria-hidden="true">/</span>`}
    <span class="subject-overview-breadcrumb-current">${current}</span>
  </nav>`;
}
