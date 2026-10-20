import type { McqBank } from "@/types";
import type { McqMode } from "./types";
import { LETTERS, formatTime } from "./utils";

interface QuestionArenaProps {
  bank: McqBank | null;
  mode: McqMode;
  questionIndex: number;
  answer: number | undefined;
  marked: boolean;
  timerSeconds: number;
  showExplanation: boolean;
  onSelectOption: (optionIndex: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleMark: () => void;
  onSubmit: () => void;
}

export function QuestionArena({
  bank,
  mode,
  questionIndex,
  answer,
  marked,
  timerSeconds,
  showExplanation,
  onSelectOption,
  onPrev,
  onNext,
  onToggleMark,
  onSubmit,
}: QuestionArenaProps) {
  const question = bank?.questions[questionIndex];

  return (
    <section className="mcq-main-arena" aria-label="Exam Question Area">
      <div className="mcq-box-header">
        <div>
          <span className="program-code-badge" id="arenaSubjectCode">
            {bank?.code ?? "—"}
          </span>
          <h3
            id="arenaSubjectTitle"
            style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: 4 }}
          >
            {bank?.title ?? "প্রশ্ন লোড হচ্ছে..."}
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            className="mcq-timer"
            id="examTimerBadge"
            style={{
              display: mode === "exam" ? "inline-flex" : "none",
              ...(mode === "exam" && timerSeconds < 120
                ? { background: "#fee2e2", color: "#dc2626" }
                : {}),
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span id="examTimerDisplay">{formatTime(timerSeconds)}</span>
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: "0.8125rem",
          fontWeight: 800,
          color: "var(--tms-green)",
          textTransform: "uppercase",
          marginBottom: 10,
          letterSpacing: "0.5px",
        }}
      >
        প্রশ্ন <span id="currentQNum">{questionIndex + 1}</span> /{" "}
        <span id="totalQCount">{bank?.questions.length ?? 0}</span>
      </div>

      <div className="mcq-question-text" id="arenaQuestionText">
        {question?.question ?? "প্রশ্ন লোড হচ্ছে..."}
      </div>

      <div className="mcq-options-grid" id="arenaOptionsWrap">
        {question?.options.map((option, optionIndex) => {
          const isSelected = answer === optionIndex;
          let className = "mcq-option";
          if (isSelected) className += " selected";
          if (showExplanation) {
            if (optionIndex === question.correct) {
              className += " correct";
            } else if (isSelected) {
              className += " incorrect";
            }
          }

          return (
            <div key={option} className={className} onClick={() => onSelectOption(optionIndex)}>
              <span className="mcq-option-letter">{LETTERS[optionIndex]}</span>
              <span className="mcq-option-label">{option}</span>
            </div>
          );
        })}
      </div>

      <div
        className="mcq-explanation-box"
        id="arenaPracticeExplanation"
        style={{ display: showExplanation ? "block" : "none" }}
      >
        {showExplanation && question ? (
          <>
            <strong>ব্যাখ্যা:</strong> {question.explanation}
          </>
        ) : null}
      </div>

      <div
        className="mcq-box-footer"
        style={{
          paddingTop: 20,
          borderTop: "1px solid var(--border-subtle)",
          marginTop: 24,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="btn btn-secondary btn-sm"
            id="mcqPrevBtn"
            disabled={questionIndex === 0}
            onClick={onPrev}
          >
            ← পূর্ববর্তী
          </button>
          <button
            className="btn btn-secondary btn-sm"
            id="mcqMarkReviewBtn"
            style={{ color: marked ? "var(--bou-gold)" : "" }}
            onClick={onToggleMark}
          >
            <span>{marked ? "★" : "☆"}</span>{" "}
            {marked ? "Marked for Review" : "Mark for Review"}
          </button>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="btn btn-primary btn-sm"
            id="mcqNextBtn"
            disabled={!bank || questionIndex >= bank.questions.length - 1}
            onClick={onNext}
          >
            পরবর্তী প্রশ্ন →
          </button>
          <button className="btn btn-red btn-sm" id="mcqSubmitExamBtn" onClick={onSubmit}>
            পরীক্ষা সাবমিট করুন
          </button>
        </div>
      </div>
    </section>
  );
}
