import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import type { Book, QuestionPaper } from "@/types";
import { SCHOOL_META } from "./book.constants";

interface BookOverviewModalProps {
  book: Book | null;
  paper: QuestionPaper | null;
  mcqQuestionCount: number | null;
  onClose: () => void;
}

const OVERVIEW_BOX =
  { background: "var(--bou-navy)", color: "#fff", padding: 16, borderRadius: 8, marginBottom: 16 };

export function BookOverviewModal({ book, paper, mcqQuestionCount, onClose }: BookOverviewModalProps) {
  const router = useRouter();

  if (!book) return null;

  const meta = SCHOOL_META[book.school] ?? { label: book.school, gradient: "#173b55" };

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

  const goToMcq = () => {
    onClose();
    router.push("/mcq-test?subject=" + encodeURIComponent(book.subjectCode));
  };

  const goToWritten = () => {
    onClose();
    router.push("/questions?search=" + encodeURIComponent(book.subjectCode));
  };

  return (
    <Modal
      open
      title={"Study Overview: " + book.title}
      onClose={onClose}
      footer={
        <>
          {mcqQuestionCount !== null && (
            <button className="btn btn-primary" onClick={goToMcq}>
              ✅ Start MCQ Practice ({mcqQuestionCount})
            </button>
          )}
          {paper && (
            <button className="btn btn-secondary" onClick={goToWritten}>
              ✍️ Open Written Questions
            </button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </>
      }
    >
      <div style={OVERVIEW_BOX}>
        <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--bou-gold)", fontWeight: 700 }}>
          {meta.label} • {book.program} Program
        </div>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff", marginTop: 4 }}>
          {book.title} ({book.subjectCode})
        </h2>
        <div style={{ fontSize: "0.85rem", opacity: 0.85 }}>
          {book.edition}
          {book.year ? ` • ${book.year}` : ""}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        {[
          `📄 ${book.pages} Pages`,
          `📦 PDF (${book.fileSize})`,
          `📖 ${book.unitsCount} Units`,
          book.pdfUrl ? "🌐 Official PDF Available" : "🌐 Official PDF Upcoming",
        ].map((chip) => (
          <span
            key={chip}
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              background: "var(--bg-surface-muted)",
              border: "1px solid var(--border-subtle)",
              padding: "4px 9px",
              borderRadius: 999,
            }}
          >
            {chip}
          </span>
        ))}
      </div>

      <div style={{ background: "var(--bg-surface-muted)", padding: 14, borderRadius: 8, marginBottom: 18 }}>
        <strong style={{ color: "var(--text-main)" }}>Book Overview:</strong>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: 4, whiteSpace: "pre-line" }}>
          {book.summary}
        </p>
      </div>

      <h4 style={{ fontSize: "1rem", marginBottom: 10, borderBottom: "1px solid var(--border-subtle)", paddingBottom: 6 }}>
        📝 Question Plan & Mark Distribution
      </h4>

      {paper ? (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <span className="tag-badge">
              {paper.term} • {paper.year}
            </span>
            <span className="tag-badge">Full Marks: {paper.fullMarks} • {paper.duration}</span>
            <span className={`tag-badge${paper.isSolved ? " solved" : ""}`}>
              {paper.isSolved ? "✓ Model Answers Verified" : "Model Answers Pending"}
            </span>
          </div>

          {distribution.map((group) => {
            const segment = group.marks * group.count;
            return (
              <div key={group.marks} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--text-secondary)",
                    marginBottom: 3,
                  }}
                >
                  <span>{group.marks} marks each</span>
                  <span>
                    {group.count} questions = {segment} marks ({paper.fullMarks > 0 ? Math.round((segment / paper.fullMarks) * 100) : 0}%)
                  </span>
                </div>
                <div style={{ background: "var(--bg-surface-muted)", borderRadius: 999, height: 8, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${paper.fullMarks > 0 ? Math.min(100, Math.round((segment / paper.fullMarks) * 100)) : 0}%`,
                      height: "100%",
                      background: "var(--tms-green)",
                    }}
                  />
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14, maxHeight: 220, overflowY: "auto", paddingRight: 6 }}>
            {paper.questions.map((question) => (
              <div
                key={question.qNumber}
                style={{
                  padding: "10px 14px",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 6,
                  fontSize: "0.88rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ color: "var(--text-secondary)" }}>
                  <strong>প্রশ্ন {question.qNumber}:</strong> {question.questionText}
                </div>
                <span className="tag-badge" style={{ whiteSpace: "nowrap" }}>
                  {question.marks} marks
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 10 }}>
            Total planned: {plannedMarks} marks across {paper.questions.length} written questions.
          </p>
        </>
      ) : (
        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fde68a",
            color: "#92400e",
            padding: "12px 14px",
            borderRadius: 8,
            fontSize: "0.88rem",
            lineHeight: 1.5,
            fontWeight: 600,
          }}
        >
          📢 এই বিষয়ের লিখিত প্রশ্নপত্র ও নম্বর বিভাজন শীঘ্রই যুক্ত করা হবে।
        </div>
      )}
    </Modal>
  );
}
