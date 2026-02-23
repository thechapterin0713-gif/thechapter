"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Question } from "@/types";

export function TestInterface({
  sessionId,
  questions,
  timeLimit,
  examName,
}: {
  sessionId: string;
  questions: Question[];
  timeLimit: number;
  examName: string;
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  const handleFinish = useCallback(async () => {
    if (isFinished) return;
    setIsFinished(true);
    setIsSubmitting(true);

    // 데모 모드: 결과 계산
    const score = Math.round((answeredCount / questions.length) * 100);
    router.push(
      `/dashboard/tests/${sessionId}/result?score=${score}&correct=${answeredCount}&total=${questions.length}`
    );
  }, [isFinished, answeredCount, questions.length, sessionId, router]);

  // 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleFinish]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    setQuestionStartTime(Date.now());

    // 자동으로 다음 문제로 이동 (마지막 문제 제외)
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    setQuestionStartTime(Date.now());
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 바 */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700">
              {examName}
            </span>
            <span className="text-sm text-slate-500">
              {currentIndex + 1} / {questions.length}
            </span>
            <div className="hidden sm:block w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div
            className={`text-xl font-mono font-bold ${
              timeLeft < 300
                ? "text-red-500"
                : timeLeft < 600
                ? "text-amber-500"
                : "text-slate-800"
            }`}
          >
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 flex gap-6">
        {/* 문제 영역 */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {currentQuestion.category}
              </span>
              <span
                className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  currentQuestion.difficulty === "easy"
                    ? "bg-green-100 text-green-700"
                    : currentQuestion.difficulty === "medium"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {currentQuestion.difficulty === "easy"
                  ? "쉬움"
                  : currentQuestion.difficulty === "medium"
                  ? "보통"
                  : "어려움"}
              </span>
            </div>

            <div className="prose prose-slate max-w-none mb-8">
              <p className="text-lg text-slate-800 leading-relaxed whitespace-pre-wrap">
                {currentQuestion.content}
              </p>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isSubmitting}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    answers[currentQuestion.id] === idx
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 mr-3">
                    {idx + 1}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* 하단 네비게이션 */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => goToQuestion(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
              이전
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleFinish}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "제출 중..." : "제출하기"}
              </button>
            ) : (
              <button
                onClick={() => goToQuestion(currentIndex + 1)}
                className="px-5 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                다음
              </button>
            )}
          </div>
        </div>

        {/* 답안지 (데스크탑) */}
        <div className="hidden lg:block w-48">
          <div className="sticky top-20 bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              답안지
            </h3>
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                    currentIndex === idx
                      ? "bg-blue-600 text-white"
                      : answers[q.id] !== undefined
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                풀이: {answeredCount} / {questions.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
