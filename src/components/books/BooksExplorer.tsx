"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";
import { getBooks } from "@/lib/api-client";
import type { Book } from "@/types";
import { BookCard } from "./BookCard";
import { SCHOOL_META, SEMESTER_LABELS } from "./book.constants";
import { BooksFilters } from "./BooksFilters";
import { ReaderModal } from "./ReaderModal";

interface BooksExplorerProps {
  initialLevel?: string;
  initialYear?: string;
  initialSemester?: string;
  initialGroup?: string;
  initialQuery?: string;
}

export function BooksExplorer({
  initialLevel,
  initialYear,
  initialSemester,
  initialGroup,
  initialQuery,
}: BooksExplorerProps) {
  const { showToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState(initialLevel ?? "all");
  const [query, setQuery] = useState(initialQuery ?? "");
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  const [yearFilter, setYearFilter] = useState<string>(initialYear ?? "all");
  const [semesterFilter, setSemesterFilter] = useState<string>(initialSemester ?? "all");
  const [groupFilter, setGroupFilter] = useState<string>(initialGroup ?? "all");

  useEffect(() => {
    let cancelled = false;

    getBooks()
      .then((response) => {
        if (!cancelled) setBooks(response.data ?? []);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (initialLevel) setLevel(initialLevel);
  }, [initialLevel]);

  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
  }, [initialQuery]);

  const prevLevelRef = useRef(level);

  useEffect(() => {
    if (prevLevelRef.current === level) return;
    prevLevelRef.current = level;
    setYearFilter("all");
    setSemesterFilter("all");
    setGroupFilter("all");
  }, [level]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams();
      if (level !== "all") params.set("level", level);
      if (yearFilter !== "all") params.set("year", yearFilter);
      if (semesterFilter !== "all") params.set("semester", semesterFilter);
      if (groupFilter !== "all") params.set("group", groupFilter);
      const trimmedQuery = query.trim();
      if (trimmedQuery) params.set("q", trimmedQuery);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [level, yearFilter, semesterFilter, groupFilter, query, router, pathname]);

  const visibleBooks = useMemo(() => {
    const needle = query.toLowerCase().trim();
    const normNeedle = needle.replace(/\s+/g, "");

    return books.filter((book) => {
      if (level !== "all" && book.level !== level) return false;

      if (yearFilter === "1st") {
        if (!book.year?.includes("১ম")) return false;
      } else if (yearFilter === "2nd") {
        if (!book.year?.includes("২য়")) return false;
      }

      if (semesterFilter !== "all" && String(book.semester ?? "") !== semesterFilter) {
        return false;
      }

      if (groupFilter !== "all" && book.group !== groupFilter) return false;

      if (!needle) return true;

      const meta = SCHOOL_META[book.school];
      const haystack = [
        meta?.label,
        book.title,
        book.subjectCode,
        book.program,
        book.level,
        book.edition,
        book.summary,
        book.year,
        ...(book.units ?? []).map((u) => u.title),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const normHaystack = haystack.replace(/\s+/g, "");

      return haystack.includes(needle) || (normNeedle.length > 2 && normHaystack.includes(normNeedle));
    });
  }, [books, level, query, yearFilter, semesterFilter, groupFilter]);

  const { standaloneBooks, semesterGroups } = useMemo(() => {
    const semesterMap = new Map<number, Book[]>();
    const standalone: Book[] = [];

    visibleBooks.forEach((book) => {
      if (book.semester) {
        const list = semesterMap.get(book.semester) ?? [];
        list.push(book);
        semesterMap.set(book.semester, list);
      } else {
        standalone.push(book);
      }
    });

    const groups = [...semesterMap.entries()]
      .sort(([a], [b]) => a - b)
      .map(([semester, groupBooks]) => ({ semester, books: groupBooks }));

    return { standaloneBooks: standalone, semesterGroups: groups };
  }, [visibleBooks]);

  const handleDownload = (book: Book) => {
    if (book.pdfUrl) {
      window.open(book.pdfUrl, "_blank", "noopener,noreferrer");
    } else {
      showToast(`Downloading ${book.title} PDF...`);
    }
  };

  const levelBooks = useMemo(
    () => (level === "all" ? books : books.filter((b) => b.level === level)),
    [books, level]
  );

  const showYear = levelBooks.some((b) => b.year);
  const showSemester = levelBooks.some((b) => b.semester != null);
  const showGroup = levelBooks.some((b) => b.group);

  return (
    <main className="section">
      <div className="container">
        <header className="section-header">
          <span className="section-kicker">ডিজিটাল টেক্সটবুক আর্কাইভ</span>
          <h1 className="section-title">বাউবি অফিসিয়াল ই-বুক ও স্টাডি মডিউল</h1>
          <p className="section-desc">
            বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের অফিসিয়াল পাঠ্যবই ও সিলেবাসের আলোকে তৈরি স্ব-শিক্ষা
            মডিউল অনলাইনে সহজে পড়ুন।
          </p>
        </header>

        <BooksFilters
          level={level}
          query={query}
          yearFilter={yearFilter}
          semesterFilter={semesterFilter}
          groupFilter={groupFilter}
          showYear={showYear}
          showSemester={showSemester}
          showGroup={showGroup}
          onLevelChange={setLevel}
          onQueryChange={setQuery}
          onYearChange={setYearFilter}
          onSemesterChange={setSemesterFilter}
          onGroupChange={setGroupFilter}
        />

        <div className="books-grid" id="booksContainer">
          {error ? (
            <p style={{ color: "var(--text-muted)", padding: 24, textAlign: "center" }}>
              Could not load e-books: {error}
            </p>
          ) : visibleBooks.length === 0 ? (
            <div className="books-empty-state">
              <p className="books-empty-title">
                {query.trim()
                  ? `"${query.trim()}" বিষয়ে কোনো ই-বুক পাওয়া যায়নি`
                  : "এই ফিল্টারে কোনো ই-বুক পাওয়া যায়নি"}
              </p>
              <p className="books-empty-hint">
                উপরের বিষয় থেকে অন্য বিষয় বেছে নিন অথবা সার্চে অন্য কিছু লিখে খুঁজুন।
              </p>
            </div>
          ) : (
            <>
              {standaloneBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onRead={setActiveBook}
                  onDownload={handleDownload}
                />
              ))}
              {semesterGroups.map((group) => (
                <Fragment key={group.semester}>
                  <h3 className="books-semester-row">
                    <span aria-hidden="true">📚</span>
                    <span>
                      {SEMESTER_LABELS[group.semester] ?? `Semester ${group.semester}`}
                    </span>
                    <span className="books-semester-count">{group.books.length} টি কোর্স</span>
                  </h3>
                  {group.books.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onRead={setActiveBook}
                      onDownload={handleDownload}
                    />
                  ))}
                </Fragment>
              ))}
            </>
          )}
        </div>
      </div>

      <ReaderModal
        book={activeBook}
        onClose={() => setActiveBook(null)}
        onDownload={handleDownload}
      />
    </main>
  );
}
