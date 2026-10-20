import sscSubjectData from "@/data/sscSubjects.json";
import type { SscSubjectCatalog } from "@/types";
import { SEMESTER_LABELS } from "./book.constants";

const SSC_SUBJECTS = sscSubjectData as SscSubjectCatalog;

interface BooksFiltersProps {
  level: string;
  query: string;
  yearFilter: string;
  semesterFilter: string;
  groupFilter: string;
  showYear: boolean;
  showSemester: boolean;
  showGroup: boolean;
  onLevelChange: (level: string) => void;
  onQueryChange: (query: string) => void;
  onYearChange: (value: string) => void;
  onSemesterChange: (value: string) => void;
  onGroupChange: (value: string) => void;
}

export function BooksFilters({
  level,
  query,
  yearFilter,
  semesterFilter,
  groupFilter,
  showYear,
  showSemester,
  showGroup,
  onLevelChange,
  onQueryChange,
  onYearChange,
  onSemesterChange,
  onGroupChange,
}: BooksFiltersProps) {
  return (
    <div className="content-filter-bar">
      <div className="filter-group">
        <label htmlFor="bookLevelFilter">লেভেল / প্রোগ্রাম:</label>
        <select
          id="bookLevelFilter"
          className="filter-select"
          value={level}
          onChange={(event) => onLevelChange(event.target.value)}
        >
          <option value="all">সকল লেভেল (All Levels)</option>
          <option value="Undergraduate">স্নাতক (BBA / BA / BSS / CSE)</option>
          <option value="HigherSecondary">উচ্চ মাধ্যমিক (HSC)</option>
          <option value="Secondary">মাধ্যমিক (SSC)</option>
          <option value="Diploma">ডিপ্লোমা (DCSA)</option>
          <option value="Postgraduate">স্নাতকোত্তর (MBA / M.Ed)</option>
        </select>
      </div>

      <div className={`filter-group${showYear ? "" : " is-disabled"}`}>
        <label htmlFor="bookYearFilter">বছর:</label>
        <select
          id="bookYearFilter"
          className="filter-select"
          value={yearFilter}
          disabled={!showYear}
          onChange={(event) => onYearChange(event.target.value)}
        >
          <option value="all">সকল বছর (All Years)</option>
          <option value="1st">১ম বর্ষ (1st Year)</option>
          <option value="2nd">২য় বর্ষ (2nd Year)</option>
        </select>
      </div>

      <div className={`filter-group${showSemester ? "" : " is-disabled"}`}>
        <label htmlFor="bookSemesterFilter">সেমিস্টার:</label>
        <select
          id="bookSemesterFilter"
          className="filter-select"
          value={semesterFilter}
          disabled={!showSemester}
          onChange={(event) => onSemesterChange(event.target.value)}
        >
          <option value="all">সকল সেমিস্টার (All Semesters)</option>
          <option value="1">{SEMESTER_LABELS[1]}</option>
          <option value="2">{SEMESTER_LABELS[2]}</option>
          <option value="3">{SEMESTER_LABELS[3]}</option>
        </select>
      </div>

      <div className={`filter-group${showGroup ? "" : " is-disabled"}`}>
        <label htmlFor="bookGroupFilter">বিভাগ:</label>
        <select
          id="bookGroupFilter"
          className="filter-select"
          value={groupFilter}
          disabled={!showGroup}
          onChange={(event) => onGroupChange(event.target.value)}
        >
          <option value="all">সকল বিভাগ (All Groups)</option>
          {SSC_SUBJECTS.groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name} ({group.enName})
            </option>
          ))}
        </select>
      </div>

      <div className="filter-search-input">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          id="bookSearchInput"
          placeholder="বইয়ের নাম, লেখক বা কোর্স কোড লিখে খুঁজুন..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>
    </div>
  );
}
