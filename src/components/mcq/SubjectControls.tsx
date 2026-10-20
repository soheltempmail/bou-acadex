import type { McqBankSummary } from "@/types";
import type { McqMode } from "./types";

interface SubjectControlsProps {
  subjects: McqBankSummary[];
  currentSubjectKey: string | null;
  mode: McqMode;
  onSubjectChange: (key: string) => void;
  onModeChange: (mode: McqMode) => void;
}

export function SubjectControls({
  subjects,
  currentSubjectKey,
  mode,
  onSubjectChange,
  onModeChange,
}: SubjectControlsProps) {
  return (
    <div className="content-filter-bar" style={{ marginBottom: 28 }}>
      <div className="filter-group">
        <label htmlFor="mcqSubjectSelect">কোর্স / বিষয় নির্বাচন করুন:</label>
        <select
          id="mcqSubjectSelect"
          className="filter-select"
          value={currentSubjectKey ?? ""}
          onChange={(event) => onSubjectChange(event.target.value)}
        >
          {subjects.map((subject) => (
            <option key={subject.key} value={subject.key}>
              {subject.title} ({subject.code})
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group" style={{ alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-muted)" }}>
          মোড:
        </span>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.875rem",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          <input
            type="radio"
            name="mcqMode"
            value="exam"
            checked={mode === "exam"}
            onChange={() => onModeChange("exam")}
          />
          <span>টাইমড এক্সাম মোড (Exam Mode)</span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.875rem",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          <input
            type="radio"
            name="mcqMode"
            value="practice"
            checked={mode === "practice"}
            onChange={() => onModeChange("practice")}
          />
          <span>তাৎক্ষণিক প্র্যাকটিস মোড (Practice)</span>
        </label>
      </div>
    </div>
  );
}
