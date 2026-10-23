interface QuestionsFiltersProps {
  year: string;
  program: string;
  query: string;
  onYearChange: (year: string) => void;
  onProgramChange: (program: string) => void;
  onQueryChange: (query: string) => void;
}

export function QuestionsFilters({
  year,
  program,
  query,
  onYearChange,
  onProgramChange,
  onQueryChange,
}: QuestionsFiltersProps) {
  return (
    <div className="content-filter-bar">
      <div className="filter-group">
        <label htmlFor="qYearFilter">পরীক্ষার সাল:</label>
        <select
          id="qYearFilter"
          className="filter-select"
          value={year}
          onChange={(event) => onYearChange(event.target.value)}
        >
          <option value="all">সকল সাল (All Years)</option>
          <option value="2023">২০২৩ ফাইনাল</option>
          <option value="2022">২০২২ ফাইনাল</option>
          <option value="2021">২০২১ ফাইনাল</option>
          <option value="2020">২০২০ ফাইনাল</option>
          <option value="2019">২০১৯ ফাইনাল</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="qProgramFilter">প্রোগ্রাম:</label>
        <select
          id="qProgramFilter"
          className="filter-select"
          value={program}
          onChange={(event) => onProgramChange(event.target.value)}
        >
          <option value="all">সকল প্রোগ্রাম (All Programs)</option>
          <option value="BBA">BBA (ব্যবসায় শিক্ষা স্কুল)</option>
          <option value="BSS">BA / BSS (সামাজিক বিজ্ঞান ও ভাষা)</option>
          <option value="HSC">HSC (ওপেন স্কুল)</option>
          <option value="CSE">B.Sc in CSE (বিজ্ঞান ও প্রযুক্তি)</option>
          <option value="LLB">LL.B Honors (আইন অনুষদ)</option>
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
          id="qSearchInput"
          placeholder="বিষয়ের নাম, প্রশ্নপত্রের শিরোনাম বা কোর্স কোড লিখে খুঁজুন..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>
    </div>
  );
}
