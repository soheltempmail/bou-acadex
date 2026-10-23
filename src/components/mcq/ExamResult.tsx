import Link from "next/link";
import type { McqBank, McqQuestion } from "@/types";
import type { ExamResultData } from "./types";
import { LETTERS } from "./utils";

interface ExamResultProps {
  bank: McqBank;
  answers: Record<number, number>;
  result: ExamResultData;
  onRetake: () => void;
}

export function ExamResult({ bank, answers, result, onRetake }: ExamResultProps) {
  return (
    <div
      id="mcqResultSection"
      style={{
        background: "var(--bg-surface-elevated)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-xl)",
        padding: 40,
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>
          {result.percentage >= 50 ? "🎓" : "📚"}
        </div>
        <h2 style={{ fontSize: "2rem", marginBottom: 6 }}>Examination Result</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}>
          {bank.title} ({bank.code})
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 36,
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "var(--bg-surface-muted)",
            padding: 18,
            borderRadius: "var(--radius-lg)",
          }}
        >
          <div style={{ fontSize: "1.875rem", fontWeight: 800, color: "var(--bou-navy)" }}>
            {result.total}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            Total Questions
          </div>
        </div>
        <div
          style={{
            background: "var(--bou-emerald-light)",
            padding: 18,
            borderRadius: "var(--radius-lg)",
          }}
        >
          <div style={{ fontSize: "1.875rem", fontWeight: 800, color: "var(--bou-emerald)" }}>
            {result.correct}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#065f46",
              textTransform: "uppercase",
            }}
          >
            Correct Answers
          </div>
        </div>
        <div
          style={{
            background: "var(--bou-red-light)",
            padding: 18,
            borderRadius: "var(--radius-lg)",
          }}
        >
          <div style={{ fontSize: "1.875rem", fontWeight: 800, color: "var(--bou-red)" }}>
            {result.incorrect}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#991b1b",
              textTransform: "uppercase",
            }}
          >
            Incorrect Answers
          </div>
        </div>
        <div
          style={{
            background: "var(--bou-gold-light)",
            padding: 18,
            borderRadius: "var(--radius-lg)",
          }}
        >
          <div style={{ fontSize: "1.875rem", fontWeight: 800, color: "#b45309" }}>
            {result.percentage}%
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#78350f",
              textTransform: "uppercase",
            }}
          >
            Grade: {result.grade}
          </div>
        </div>
      </div>

      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          marginBottom: 20,
          borderBottom: "1px solid var(--border-subtle)",
          paddingBottom: 10,
        }}
      >
        Detailed Question Review & Explanations (উত্তরপত্র বিশ্লেষণ)
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginBottom: 36,
        }}
      >
        {bank.questions.map((question, index) => (
          <ReviewItem key={question.id} question={question} index={index} answers={answers} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <button className="btn btn-primary" onClick={onRetake}>
          🔄 Retake Test
        </button>
        <Link href="/beta" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

interface ReviewItemProps {
  question: McqQuestion;
  index: number;
  answers: Record<number, number>;
}

function ReviewItem({ question, index, answers }: ReviewItemProps) {
  const userAnswer = answers[index];
  const isCorrect = userAnswer === question.correct;
  const status = isCorrect ? "Correct" : userAnswer === undefined ? "Skipped" : "Incorrect";

  return (
    <div
      style={{
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: 20,
        background: "var(--bg-surface)",
      }}
    >
      {question.unit || question.lesson ? (
        <div className="mcq-question-source" style={{ marginBottom: 8 }}>
          {question.unit ? <span className="mcq-question-unit">{question.unit}</span> : null}
          {question.lesson ? (
            <span className="mcq-question-lesson">{question.lesson}</span>
          ) : null}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <strong style={{ fontSize: "1rem" }}>
          Q{index + 1}: {question.question}
        </strong>
        <span
          className="badge-live"
          style={{
            background: isCorrect
              ? "var(--bou-emerald)"
              : userAnswer === undefined
                ? "var(--text-muted)"
                : "var(--bou-red)",
            fontSize: "0.6875rem",
          }}
        >
          {status}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          fontSize: "0.875rem",
          marginBottom: 12,
        }}
      >
        {question.options.map((option, optionIndex) => {
          const isCorrectOption = optionIndex === question.correct;
          const isUserOption = optionIndex === userAnswer;

          return (
            <div
              key={option}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                ...(isCorrectOption
                  ? {
                      background: "var(--bou-emerald-light)",
                      fontWeight: 700,
                      color: "#065f46",
                      border: "1px solid var(--bou-emerald)",
                    }
                  : isUserOption
                    ? {
                        background: "var(--bou-red-light)",
                        color: "#991b1b",
                        border: "1px solid var(--bou-red)",
                      }
                    : { background: "var(--bg-surface-muted)" }),
              }}
            >
              {LETTERS[optionIndex]}. {option}{" "}
              {isCorrectOption ? "✓ (Correct)" : isUserOption ? "✗ (Your Answer)" : ""}
            </div>
          );
        })}
      </div>
      <div
        style={{
          background: "#f0fdf4",
          borderLeft: "3px solid var(--bou-emerald)",
          padding: "10px 14px",
          borderRadius: 4,
          fontSize: "0.8125rem",
          color: "#166534",
        }}
      >
        <strong>ব্যাখ্যা:</strong> {question.explanation}
      </div>
    </div>
  );
}
