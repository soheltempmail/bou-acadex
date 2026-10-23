import fs from "node:fs";
import path from "node:path";
import {
  ROOT,
  books,
  mcqBankForBook,
  slug,
  writtenBankForBook,
} from "./static/lib.mjs";
import { booksPage, homePage, mcqTestPage, questionsPage } from "./static/pages.mjs";
import {
  overviewPage,
  pendingPage,
  programMcqPage,
  readPage,
  writtenBankPage,
} from "./static/program.mjs";
import {
  aboutPage,
  apiDocsPage,
  disclaimerPage,
  privacyPage,
  termsPage,
} from "./static/legal.mjs";

const OUT = path.join(ROOT, "static");
const PUBLIC_ASSETS = path.join(ROOT, "public", "assets");
const GENERATED_DIRS = [
  "home",
  "books",
  "questions",
  "mcq-test",
  "program",
  "about",
  "terms",
  "privacy",
  "disclaimer",
  "api-docs",
  "assets",
];

function write(relativePath, content) {
  const file = path.join(OUT, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function copy(source, destination) {
  const from = path.join(ROOT, source);
  const to = path.join(OUT, destination);
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true });
}

for (const dir of GENERATED_DIRS) {
  fs.rmSync(path.join(OUT, dir), { recursive: true, force: true });
}
fs.rmSync(path.join(OUT, "index.html"), { force: true });
fs.mkdirSync(OUT, { recursive: true });

// Shared CSS and JS into static/assets
fs.mkdirSync(path.join(OUT, "assets/css"), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_ASSETS, "css"), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_ASSETS, "js"), { recursive: true });

for (const file of fs.readdirSync(path.join(ROOT, "src/styles"))) {
  if (file.endsWith(".css")) {
    fs.copyFileSync(path.join(ROOT, "src/styles", file), path.join(OUT, "assets/css", file));
    fs.copyFileSync(path.join(ROOT, "src/styles", file), path.join(PUBLIC_ASSETS, "css", file));
  }
}
copy("scripts/static-assets/site.js", "assets/js/site.js");
copy("scripts/static-assets/static.css", "assets/css/static.css");
fs.copyFileSync(path.join(ROOT, "scripts/static-assets/site.js"), path.join(PUBLIC_ASSETS, "js/site.js"));
fs.copyFileSync(path.join(ROOT, "scripts/static-assets/static.css"), path.join(PUBLIC_ASSETS, "css/static.css"));

if (fs.existsSync(path.join(ROOT, "node_modules/pdfjs-dist/build/pdf.min.mjs"))) {
  copy("node_modules/pdfjs-dist/build/pdf.min.mjs", "assets/js/pdf.min.mjs");
  fs.copyFileSync(path.join(ROOT, "node_modules/pdfjs-dist/build/pdf.min.mjs"), path.join(PUBLIC_ASSETS, "js/pdf.min.mjs"));
}
copy("public/pdf.worker.min.mjs", "assets/pdf.worker.min.mjs");
copy("public/pdfjs", "assets/pdfjs");
copy("public/assets", "assets");
copy("public/books", "books");

// Pages
write("index.html", homePage());
write("home/index.html", homePage());
write("books/index.html", booksPage());
write("questions/index.html", questionsPage());
write("mcq-test/index.html", mcqTestPage());
write("about/index.html", aboutPage());
write("terms/index.html", termsPage());
write("privacy/index.html", privacyPage());
write("disclaimer/index.html", disclaimerPage());
write("api-docs/index.html", apiDocsPage());

for (const book of books) {
  const base = `program/${slug(book.subjectCode)}`;
  const mcq = mcqBankForBook(book);
  const written = writtenBankForBook(book);

  write(`${base}/overview/index.html`, overviewPage(book));
  write(`${base}/read/index.html`, readPage(book));

  if (mcq) {
    write(`${base}/mcq/index.html`, programMcqPage(book, mcq[1]));
  } else {
    write(`${base}/mcq/index.html`, pendingPage(book, "mcq"));
  }

  if (written) {
    write(`${base}/written/index.html`, writtenBankPage(book, written[1]));
  } else {
    write(`${base}/written/index.html`, pendingPage(book, "written"));
  }
}

const count = (dir) => {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    total += entry.isDirectory() ? count(path.join(dir, entry.name)) : 1;
  }
  return total;
};

console.log(`Static site written to ${OUT}`);
console.log(`Books: ${books.length}, files: ${count(path.join(OUT, "home")) + count(path.join(OUT, "program")) + count(path.join(OUT, "books"))} generated page/PDF files`);
