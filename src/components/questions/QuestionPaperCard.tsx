import { semesterLabel } from "@/lib/format";
import type { QuestionItem, QuestionPaper } from "@/types";

interface QuestionPaperCardProps {
  paper: QuestionPaper;
  open: boolean;
  onToggle: () => void;
  onDownload: () => void;
}

function SolutionStep({ question }: { question: QuestionItem }) {
  return (
    <div className="solution-step">
      <div className="solution-step-title">
        প্রশ্ন {question.qNumber}: {question.questionText} <em>({question.marks} marks)</em>
      </div>
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}
      >
        <strong>আদর্শ উত্তর:</strong>{" "}
        <span style={{ whiteSpace: "pre-line" }}>{question.modelAnswer}</span>
      </p>
      {question.keyPoints && question.keyPoints.length > 0 ? (
        <div
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            marginTop: 8,
          }}
        >
          <strong>Key Points:</strong>
          <ul style={{ margin: "6px 0 0 20px" }}>
            {question.keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function QuestionPaperCard({ paper, open, onToggle, onDownload }: QuestionPaperCardProps) {
  return (
    <article className="question-paper-card" data-year={paper.year} data-program={paper.program}>
      <div className="question-summary-row">
        <div className="question-meta-col">
          <div className="year-stamp">{paper.year}</div>
          <div className="question-title-wrap">
            <h4>
              {paper.subjectName} ({paper.subjectCode})
            </h4>
            <div className="question-tags">
              <span className="tag-badge">
                {paper.program} • {semesterLabel(paper.semester)} {paper.term}
              </span>
              <span className={`tag-badge${paper.isSolved ? " solved" : ""}`}>
                {paper.isSolved ? "✓ Verified Model Answers" : "Model Answers Pending"}
              </span>
              <span className="tag-badge">
                Full Marks: {paper.fullMarks} • {paper.duration}
              </span>
            </div>
          </div>
        </div>
        <div className="question-actions-col">
          <button className="btn btn-secondary btn-sm" onClick={onToggle}>
            {open ? "▲ Hide Model Answers" : "👁 Toggle Model Answers"}
          </button>
          <button className="btn btn-primary btn-sm" onClick={onDownload}>
            ⬇ PDF
          </button>
        </div>
      </div>
      <div className={`question-solution-panel${open ? " open" : ""}`}>
        {paper.questions.map((question) => (
          <SolutionStep key={question.qNumber} question={question} />
        ))}
      </div>
    </article>
  );
}
