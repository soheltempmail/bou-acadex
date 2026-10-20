"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import { getMcqBank, getMcqSubjects } from "@/lib/api-client";
import type { McqBank, McqBankSummary } from "@/types";
import { ExamResult } from "./ExamResult";
import { QuestionArena } from "./QuestionArena";
import { QuestionPalette } from "./QuestionPalette";
import { SubjectControls } from "./SubjectControls";
import type { McqMode } from "./types";
import { gradeFor, toBank } from "./utils";

export function McqEngine() {
  const { showToast } = useToast();

  const [subjects, setSubjects] = useState<McqBankSummary[]>([]);
  const [currentSubjectKey, setCurrentSubjectKey] = useState<string | null>(null);
  const [bank, setBank] = useState<McqBank | null>(null);
  const [mode, setMode] = useState<McqMode>("exam");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedReview, setMarkedReview] = useState<Set<number>>(new Set());
  const [timerSeconds, setTimerSeconds] = useState(600);
  const [submitted, setSubmitted] = useState(false);

  const banksRef = useRef<Record<string, McqBank>>({});
  const requestIdRef = useRef(0);
  const initializedRef = useRef(false);

  const applyBank = useCallback((nextBank: McqBank) => {
    setBank(nextBank);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedReview(new Set());
    setSubmitted(false);
    setTimerSeconds(nextBank.duration || 600);
  }, []);

  const loadSubject = useCallback(
    async (key: string) => {
      setCurrentSubjectKey(key);

      const cached = banksRef.current[key];
      if (cached) {
        applyBank(cached);
        return;
      }

      const requestId = ++requestIdRef.current;
      try {
        const response = await getMcqBank(key);
        const nextBank = toBank(response);
        banksRef.current[key] = nextBank;
        if (requestId === requestIdRef.current) {
          applyBank(nextBank);
        }
      } catch (error) {
        if (requestId === requestIdRef.current) {
          showToast("Could not load subject: " + (error as Error).message);
        }
      }
    },
    [applyBank, showToast]
  );

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    getMcqSubjects()
      .then((response) => {
        const list = response.data ?? [];
        setSubjects(list);
        if (list.length) {
          const requested = new URLSearchParams(window.location.search).get("subject");
          const match = requested
            ? list.find((subject) => subject.key === requested || subject.code === requested)
            : undefined;
          if (requested && !match) {
            showToast("Requested MCQ bank was not found — showing the default subject instead.");
          }
          void loadSubject(match ? match.key : list[0].key);
        }
      })
      .catch((error: Error) => {
        showToast("Could not load MCQ subjects: " + error.message);
      });
  }, [loadSubject, showToast]);

  const resetExamState = useCallback(
    (nextMode: McqMode) => {
      const nextBank = currentSubjectKey ? banksRef.current[currentSubjectKey] : null;
      setMode(nextMode);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setMarkedReview(new Set());
      setSubmitted(false);
      setTimerSeconds(nextBank?.duration || 600);
    },
    [currentSubjectKey]
  );

  const evaluate = useCallback(() => {
    if (!bank) return null;

    const total = bank.questions.length;
    let correct = 0;
    let incorrect = 0;

    bank.questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer === undefined) return;
      if (answer === question.correct) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const percentage = Math.round((correct / total) * 100);

    return {
      total,
      correct,
      incorrect,
      percentage,
      grade: gradeFor(percentage),
    };
  }, [answers, bank]);

  const submitExam = useCallback(() => {
    if (!bank) return;
    setSubmitted(true);
  }, [bank]);

  useEffect(() => {
    if (mode !== "exam" || submitted || !bank) return;

    const interval = window.setInterval(() => {
      setTimerSeconds((previous) => (previous > 0 ? previous - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [mode, submitted, bank]);

  useEffect(() => {
    if (mode !== "exam" || submitted || !bank) return;
    if (timerSeconds > 0) return;

    showToast("Time is up! Exam auto-submitting...");
    setSubmitted(true);
  }, [timerSeconds, mode, submitted, bank, showToast]);

  const handleSubjectChange = (key: string) => void loadSubject(key);

  const controls = (
    <SubjectControls
      subjects={subjects}
      currentSubjectKey={currentSubjectKey}
      mode={mode}
      onSubjectChange={handleSubjectChange}
      onModeChange={resetExamState}
    />
  );

  if (submitted && bank) {
    const result = evaluate();
    if (result) {
      return (
        <main className="section">
          <div className="container">
            {controls}
            <ExamResult
              bank={bank}
              answers={answers}
              result={result}
              onRetake={() => resetExamState(mode)}
            />
          </div>
        </main>
      );
    }
  }

  const question = bank?.questions[currentQuestionIndex];
  const answered = question ? answers[currentQuestionIndex] : undefined;
  const showPracticeExplanation = mode === "practice" && answered !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    if (submitted) return;
    setAnswers((current) => ({
      ...current,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((current) => Math.max(0, current - 1));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((current) =>
      bank ? Math.min(bank.questions.length - 1, current + 1) : current
    );
  };

  const handleToggleMark = () => {
    setMarkedReview((current) => {
      const next = new Set(current);
      if (next.has(currentQuestionIndex)) {
        next.delete(currentQuestionIndex);
        showToast("Removed mark from this question");
      } else {
        next.add(currentQuestionIndex);
        showToast("Marked question for review");
      }
      return next;
    });
  };

  return (
    <main className="section">
      <div className="container">
        {controls}

        <div className="mcq-engine-wrapper" id="mcqMainArena">
          <QuestionArena
            bank={bank}
            mode={mode}
            questionIndex={currentQuestionIndex}
            answer={answered}
            marked={markedReview.has(currentQuestionIndex)}
            timerSeconds={timerSeconds}
            showExplanation={showPracticeExplanation}
            onSelectOption={handleSelectOption}
            onPrev={handlePrev}
            onNext={handleNext}
            onToggleMark={handleToggleMark}
            onSubmit={submitExam}
          />

          <QuestionPalette
            questions={bank?.questions ?? []}
            currentIndex={currentQuestionIndex}
            answers={answers}
            markedReview={markedReview}
            onSelect={setCurrentQuestionIndex}
          />
        </div>
      </div>
    </main>
  );
}
