"use client";

import Link from "next/link";
import { useState } from "react";

interface MiniQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const MINI_QUESTIONS: MiniQuestion[] = [
  {
    question: "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU) কত সালে প্রতিষ্ঠিত হয়?",
    options: ["১৯৮৮ সালে", "১৯৯২ সালে", "১৯৯৫ সালে", "১৯৯৯ সালে"],
    correctIndex: 1,
    explanation:
      "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় আইন ১৯৯২ (১৯৯২ সনের ৩৮ নং আইন) অনুযায়ী ২০ অক্টোবর ১৯৯২ সালে প্রতিষ্ঠিত হয়।",
  },
  {
    question: "BBA প্রোগ্রামের মৌলিক নীতি অনুযায়ী 'Double Entry System' এর জনক কে?",
    options: ["এডাম স্মিথ", "লুকা প্যাসিওলি", "এফ ডব্লিউ টেলর", "হেনরি ফেয়ল"],
    correctIndex: 1,
    explanation:
      "১৪৯৪ সালে ইতালীয় গণিতবিদ লুকা প্যাসিওলি (Luca Pacioli) দুতরফা দাখিলা পদ্ধতির মূলনীতি ব্যাখ্যা করেন।",
  },
  {
    question: "কম্পিউটার ও তথ্যপ্রযুক্তিতে (ICT) IPv4 অ্যাড্রেস কত বিটের হয়ে থাকে?",
    options: ["১৬ বিট", "৩২ বিট", "৬৪ বিট", "১২৮ বিট"],
    correctIndex: 1,
    explanation:
      "IPv4 অ্যাড্রেস হলো ৩২ বিটের সংখ্যা যা ৪টি অক্টেটে বিভক্ত থাকে (যেমন 192.168.1.1)।",
  },
];

const LETTERS = ["ক", "খ", "গ", "ঘ"];

export function MiniQuiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = MINI_QUESTIONS[index];

  const restart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) {
      setScore((current) => current + 1);
    }
  };

  const handleNext = () => {
    if (index < MINI_QUESTIONS.length - 1) {
      setIndex((current) => current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <section className="section mcq-preview-section">
        <div className="container">
          <div className="mcq-interactive-box" id="homeMiniQuiz">
            <div style={{ textAlign: "center", padding: "28px 12px" }}>
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>🎉</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>
                মক কুইজ সম্পন্ন হয়েছে!
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: 24,
                  fontSize: "1.0625rem",
                }}
              >
                আপনি মোট <strong>{MINI_QUESTIONS.length}</strong> টি প্রশ্নের মধ্যে{" "}
                <strong>{score}</strong> টি সঠিক উত্তর দিয়েছেন!
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/mcq-test" className="btn btn-primary">
                  পূর্ণাঙ্গ MCQ পরীক্ষা দিন
                </Link>
                <button onClick={restart} className="btn btn-secondary">
                  আবার চেষ্টা করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section mcq-preview-section">
      <div className="container">
        <header className="section-header">
          <span className="section-kicker">লাইভ ডেমো</span>
          <h2 className="section-title">সরাসরি অনলাইন MCQ মক টেস্ট দিয়ে দেখুন</h2>
          <p className="section-desc">
            তাৎক্ষণিক সঠিক উত্তর, ব্যাখ্যা ও টাইমার ম্যানেজমেন্ট যাচাই করুন।
          </p>
        </header>

        <div className="mcq-interactive-box" id="homeMiniQuiz">
          <div className="mcq-box-header">
            <div className="mcq-subject-tag">
              <span>🎯</span>
              <span>সাধারণ জ্ঞান ও বাউবি একাডেমিক পরিচিতি</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="mcq-timer" id="homeQuizCounter">
                প্রশ্ন {index + 1} / {MINI_QUESTIONS.length}
              </span>
            </div>
          </div>

          <div className="mcq-question-text" id="homeQuizQuestion">
            {index + 1}. {question.question}
          </div>

          <div className="mcq-options-grid" id="homeQuizOptions">
            {question.options.map((option, optionIndex) => {
              let className = "mcq-option";
              if (selected !== null) {
                if (optionIndex === question.correctIndex) {
                  className += " correct";
                } else if (optionIndex === selected) {
                  className += " incorrect";
                }
              }

              return (
                <div
                  key={option}
                  className={className}
                  style={selected !== null ? { pointerEvents: "none" } : undefined}
                  onClick={() => handleSelect(optionIndex)}
                >
                  <span className="mcq-option-letter">{LETTERS[optionIndex]}</span>
                  <span className="mcq-option-label">{option}</span>
                </div>
              );
            })}
          </div>

          <div
            className="mcq-explanation-box"
            id="homeQuizExplanation"
            style={{ display: selected !== null ? "block" : "none" }}
          >
            {selected !== null ? (
              <>
                <strong>সঠিক উত্তরের ব্যাখ্যা:</strong> {question.explanation}
              </>
            ) : null}
          </div>

          <div className="mcq-box-footer" style={{ marginTop: 24 }}>
            <Link href="/mcq-test" className="btn btn-secondary btn-sm">
              পূর্ণাঙ্গ পরীক্ষা এরিনা
            </Link>
            <button
              className="btn btn-primary"
              id="homeQuizNextBtn"
              disabled={selected === null}
              onClick={handleNext}
            >
              {index === MINI_QUESTIONS.length - 1 ? "ফলাফল দেখুন →" : "পরবর্তী প্রশ্ন →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
