import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "@/types";
import { useToast } from "@/components/ui/ToastProvider";
import { getMcqBankForBook, getPaperForBook } from "@/lib/study-meta";
import { BOOK_GRADIENTS, SCHOOL_META } from "./book.constants";
import { BookOverviewModal } from "./BookOverviewModal";

interface BookCardProps {
  book: Book;
  onRead: (book: Book) => void;
  onDownload: (book: Book) => void;
}

export function BookCard({ book, onRead, onDownload }: BookCardProps) {
  const [overviewOpen, setOverviewOpen] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const meta = SCHOOL_META[book.school] ?? { label: book.school, gradient: "#173b55" };
  const gradient = BOOK_GRADIENTS[book.subjectCode] ?? meta.gradient;
  const mcqBank = getMcqBankForBook(book.subjectCode);
  const paper = getPaperForBook(book.subjectCode);

  const handleMcq = () => {
    if (!mcqBank) {
      showToast(`${book.subjectCode} এর MCQ প্রশ্নব্যাংক শীঘ্রই আসছে!`);
      return;
    }
    router.push("/mcq-test?subject=" + encodeURIComponent(mcqBank.key));
  };

  const handleWritten = () => {
    if (!paper) {
      showToast(`${book.subjectCode} এর লিখিত প্রশ্নপত্র শীঘ্রই আসছে!`);
      return;
    }
    router.push("/questions?search=" + encodeURIComponent(book.subjectCode));
  };

  return (
    <article className="book-card product-card" data-school={book.school} data-level={book.level}>
      <div className="book-cover-mock" style={{ background: gradient }}>
        <span className="book-cover-watermark" aria-hidden="true">
          📚
        </span>
        <div className="book-cover-top">
          <span className="product-badge product-badge-program">{book.program}</span>
        </div>
        <div className="book-cover-info">
          <span className="book-cover-tag">
            {meta.label}
            {book.year ? ` • ${book.year}` : ""}
          </span>
          <h3 className="book-cover-title" title={book.title}>
            {book.title}
          </h3>
          <span className="book-cover-code">
            {book.subjectCode}
            {book.unitsCount > 0 ? ` • Units 1–${book.unitsCount}` : ""}
          </span>
        </div>
      </div>
      <div className="book-info-body">
        <div className="book-school">
          {book.program} Program • {book.edition}
        </div>
        <div className="book-spec-chips">
          <span className="book-spec-chip">📄 {book.pages} Pages</span>
          <span className="book-spec-chip">📦 PDF ({book.fileSize})</span>
          {book.unitsCount > 0 && <span className="book-spec-chip">📖 {book.unitsCount} Units</span>}
        </div>
        <div className="book-actions book-actions-grid">
          <button
            className="btn btn-primary btn-sm book-action-overview"
            onClick={() => setOverviewOpen(true)}
            title="Book overview, question plan & mark distribution"
          >
            📋 Overview
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => onRead(book)}>
            📖 Read
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onDownload(book)}
            title={book.pdfUrl ? "Open Official E-Book / PDF" : "Download PDF"}
          >
            ⬇ PDF
          </button>
          <button
            className={`btn btn-sm ${mcqBank ? "btn-secondary" : "btn-secondary btn-disabled"}`}
            onClick={handleMcq}
            title={mcqBank ? `${mcqBank.questionCount} MCQ questions ready` : "MCQ bank coming soon"}
          >
            ✅ MCQ
          </button>
          <button
            className={`btn btn-sm ${paper ? "btn-secondary" : "btn-secondary btn-disabled"}`}
            onClick={handleWritten}
            title={paper ? "Written questions & mark distribution ready" : "Written questions coming soon"}
          >
            ✍️ Written
          </button>
        </div>
      </div>
      <BookOverviewModal
        book={overviewOpen ? book : null}
        paper={paper}
        mcqQuestionCount={mcqBank?.questionCount ?? null}
        onClose={() => setOverviewOpen(false)}
      />
    </article>
  );
}
