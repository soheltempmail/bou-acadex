"use client";

import { useEffect, useMemo, useState } from "react";
import { getQuestions } from "@/lib/api-client";
import type { QuestionPaper } from "@/types";
import { QuestionPaperCard } from "./QuestionPaperCard";
import { QuestionsFilters } from "./QuestionsFilters";
import { paperHaystack } from "./question.utils";

interface QuestionsExplorerProps {
  initialYear?: string;
  initialSearch?: string;
}

export function QuestionsExplorer({
  initialYear,
  initialSearch,
}: QuestionsExplorerProps) {
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState(initialYear ?? "all");
  const [query, setQuery] = useState(initialSearch ?? "");
  const [openPanels, setOpenPanels] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    getQuestions()
      .then((response) => {
        if (!cancelled) setPapers(response.data ?? []);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (initialYear) setYear(initialYear);
  }, [initialYear]);

  useEffect(() => {
    if (initialSearch) setQuery(initialSearch);
  }, [initialSearch]);

  const visiblePapers = useMemo(() => {
    const needle = query.toLowerCase().trim();

    return papers.filter((paper) => {
      if (year !== "all" && paper.year !== year) return false;
      if (!needle) return true;
      return paperHaystack(paper).includes(needle);
    });
  }, [papers, year, query]);

  const togglePanel = (id: string) => {
    setOpenPanels((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <main className="section">
      <div className="container">
        <header className="section-header">
          <span className="section-kicker">পরীক্ষা প্রশ্নব্যাংক আর্কাইভ</span>
          <h1 className="section-title">বাউবি বিগত বছরের প্রশ্ন ও মডেল সমাধান</h1>
          <p className="section-desc">
            প্রামাণ্য অতীত পরীক্ষার প্রশ্নপত্র এবং বাউবি মার্কিং নিয়মানুযায়ী সর্বোচ্চ নম্বর পাওয়ার
            উপযোগী সাজানো সমাধান।
          </p>
        </header>

        <QuestionsFilters
          year={year}
          query={query}
          onYearChange={setYear}
          onQueryChange={setQuery}
        />

        <div className="questions-list" id="questionsContainer">
          {error ? (
            <p style={{ color: "var(--text-muted)", padding: 24, textAlign: "center" }}>
              Could not load question papers: {error}
            </p>
          ) : (
            visiblePapers.map((paper) => (
              <QuestionPaperCard
                key={paper.id}
                paper={paper}
                open={openPanels.has(paper.id)}
                onToggle={() => togglePanel(paper.id)}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
