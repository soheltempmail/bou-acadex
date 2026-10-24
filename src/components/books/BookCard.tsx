import { useRouter } from "next/navigation";
import type { Book } from "@/types";
import { useToast } from "@/components/ui/ToastProvider";
import {
  findMcqBankForBook,
  getPaperForBook,
  subjectMcqPath,
  subjectOverviewPath,
  subjectReadPath,
  subjectWrittenPath,
} from "@/lib/study-meta";
import { BOOK_GRADIENTS, SCHOOL_META } from "./book.constants";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const meta = SCHOOL_META[book.school] ?? { label: book.school, gradient: "#173b55" };
  const gradient = BOOK_GRADIENTS[book.subjectCode] ?? meta.gradient;
  const mcqBank = findMcqBankForBook(book);
  const paper = getPaperForBook(book.subjectCode);

  const handleOverview = () => {
    router.push(subjectOverviewPath(book.subjectCode));
  };

  const handleRead = () => {
    router.push(subjectReadPath(book.subjectCode));
  };

  const handleMcq = () => {
    if (!mcqBank) {
      showToast(`${book.subjectCode} এর MCQ প্রশ্নব্যাংক শীঘ্রই আসছে!`);
      return;
    }
    router.push(subjectMcqPath(book.subjectCode));
  };

  const handleWritten = () => {
    if (!paper) {
      showToast(`${book.subjectCode} এর লিখিত প্রশ্নপত্র শীঘ্রই আসছে!`);
      return;
    }
    router.push(subjectWrittenPath(book.subjectCode));
  };

  return (
    <article className="book-card product-card" data-school={book.school}>
      <div className="book-cover-mock" style={{ background: gradient }}>
        <span className="book-cover-watermark" aria-hidden="true">
          📚
        </span>
        <div className="book-cover-top">
          <span className="product-badge product-badge-program">DCSA</span>
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
          DCSA Program • {book.edition}
        </div>
        <div className="book-spec-chips">
          <span className="book-spec-chip">📄 {book.pages} Pages</span>
          {book.unitsCount > 0 && <span className="book-spec-chip">📖 {book.unitsCount} Units</span>}
        </div>
        <div className="book-actions book-actions-grid">
          <button
            className="btn btn-primary btn-sm book-action-overview"
            onClick={handleOverview}
            title="Open full subject overview page"
          >
            📋 Overview
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleRead}
            title="Open the full-page e-book reader"
          >
            📖 Read
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
    </article>
  );
}
