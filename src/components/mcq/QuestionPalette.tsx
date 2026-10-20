import type { McqQuestion } from "@/types";

interface QuestionPaletteProps {
  questions: McqQuestion[];
  currentIndex: number;
  answers: Record<number, number>;
  markedReview: Set<number>;
  onSelect: (index: number) => void;
}

export function QuestionPalette({
  questions,
  currentIndex,
  answers,
  markedReview,
  onSelect,
}: QuestionPaletteProps) {
  return (
    <aside className="mcq-sidebar" aria-label="Question Palette">
      <h4
        style={{
          fontSize: "1rem",
          fontWeight: 800,
          marginBottom: 16,
          color: "var(--text-main)",
        }}
      >
        প্রশ্ন প্যালেট (Question Palette)
      </h4>

      <div className="mcq-palette-grid" id="mcqPaletteGrid">
        {questions.map((_, index) => {
          let className = "palette-number-btn";
          if (index === currentIndex) className += " active";
          if (answers[index] !== undefined) className += " answered";
          if (markedReview.has(index)) className += " marked";

          return (
            <button key={index} className={className} onClick={() => onSelect(index)}>
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="palette-legend">
        <div className="legend-item">
          <span className="legend-dot answered"></span>
          <span>উত্তর দেওয়া হয়েছে (Answered)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot marked"></span>
          <span>রিভিউর জন্য রাখা (Marked)</span>
        </div>
        <div className="legend-item">
          <span
            className="legend-dot"
            style={{
              background: "var(--tms-green-light)",
              border: "1.5px solid var(--tms-green)",
            }}
          ></span>
          <span>বর্তমান প্রশ্ন (Current)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot unanswered"></span>
          <span>দেখা হয়নি (Not Visited)</span>
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            lineHeight: 1.5,
          }}
        >
          💡 <strong>টিপস:</strong> উপরের যেকোনো প্রশ্ন নম্বরে ক্লিক করে সরাসরি সেই প্রশ্নে যেতে
          পারবেন।
        </div>
      </div>
    </aside>
  );
}
