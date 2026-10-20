import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/ToastProvider";
import type { Book } from "@/types";

interface ReaderModalProps {
  book: Book | null;
  onClose: () => void;
  onDownload: (book: Book) => void;
}

export function ReaderModal({ book, onClose, onDownload }: ReaderModalProps) {
  const { showToast } = useToast();

  if (!book) return null;

  return (
    <Modal
      open
      title={"BOU E-Reader: " + book.title}
      onClose={onClose}
      footer={
        <>
          <button
            className="btn btn-primary"
            onClick={() => {
              onDownload(book);
              onClose();
            }}
          >
            {book.pdfUrl ? "⬇ Open Official Textbook / PDF" : "⬇ Save Complete PDF"}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close Reader
          </button>
        </>
      }
    >
      <div style={{ lineHeight: 1.65 }}>
        <div
          style={{
            background: "var(--bou-navy)",
            color: "#fff",
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              color: "var(--bou-gold)",
              fontWeight: 700,
            }}
          >
            Bangladesh Open University Textbook Reader
          </div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff", marginTop: 4 }}>
            {book.title}
          </h2>
          <div style={{ fontSize: "0.85rem", opacity: 0.85 }}>
            Course Code: {book.subjectCode} • Total Units: {book.unitsCount}
            {book.year ? ` • ${book.year}` : ""}
          </div>
        </div>

        {book.notice && (
          <div
            style={{
              background: "#fffbeb",
              border: "1px solid #fde68a",
              color: "#92400e",
              padding: "12px 14px",
              borderRadius: 8,
              marginBottom: 16,
              fontSize: "0.88rem",
              lineHeight: 1.5,
              fontWeight: 600,
            }}
          >
            📢 {book.notice}
          </div>
        )}

        <div
          style={{
            background: "var(--bg-surface-muted)",
            padding: 14,
            borderRadius: 8,
            marginBottom: 18,
          }}
        >
          <strong style={{ color: "var(--text-main)" }}>Module Overview:</strong>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              marginTop: 4,
              whiteSpace: "pre-line",
            }}
          >
            {book.summary}
          </p>
        </div>
        <h4
          style={{
            fontSize: "1rem",
            marginBottom: 10,
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: 6,
          }}
        >
          Table of Contents (ইউনিট সূচিপত্র):
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxHeight: 260,
            overflowY: "auto",
            paddingRight: 6,
          }}
        >
          {(book.units ?? []).map((unit) => (
            <div
              key={unit.unitNum}
              style={{
                padding: "10px 14px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 6,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <strong>{unit.unitNum > 0 ? `Unit ${unit.unitNum}: ` : ""}</strong>
                {unit.title}
                {unit.pages && (
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginLeft: 6 }}>
                    (পৃষ্ঠা: {unit.pages})
                  </span>
                )}
              </div>
              {unit.pdfUrl ? (
                <a
                  href={unit.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
                >
                  📄 Open PDF
                </a>
              ) : (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => showToast(`Loading Unit ${unit.unitNum} interactive text...`)}
                >
                  Open Unit
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
