import { SEMESTER_LABELS } from "./book.constants";

interface BooksFiltersProps {
  query: string;
  yearFilter: string;
  semesterFilter: string;
  showYear: boolean;
  showSemester: boolean;
  onQueryChange: (query: string) => void;
  onYearChange: (value: string) => void;
  onSemesterChange: (value: string) => void;
}

export function BooksFilters({
  query,
  yearFilter,
  semesterFilter,
  showYear,
  showSemester,
  onQueryChange,
  onYearChange,
  onSemesterChange,
}: BooksFiltersProps) {
  return (
    <div className="content-filter-bar">
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
