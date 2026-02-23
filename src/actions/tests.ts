"use server";

import { db } from "@/lib/db";
import { questions, testSessions, userAnswers } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// 시험 시작
export async function startTest(examTypeId: string, userId: string) {
  // 문제 가져오기 (랜덤 30문제)
  const testQuestions = await db
    .select({
      id: questions.id,
      content: questions.content,
      options: questions.options,
      category: questions.category,
      difficulty: questions.difficulty,
      imageUrl: questions.imageUrl,
    })
    .from(questions)
    .where(eq(questions.examTypeId, examTypeId))
    .orderBy(sql`RANDOM()`)
    .limit(30);

  // 세션 생성
  const [testSession] = await db
    .insert(testSessions)
    .values({
      userId,
      examTypeId,
      totalQuestions: testQuestions.length,
    })
    .returning();

  return { session: testSession, questions: testQuestions };
}

// 답안 제출
export async function submitAnswer(
  sessionId: string,
  questionId: string,
  selectedAnswer: number,
  timeSpent: number
) {
  const question = await db.query.questions.findFirst({
    where: eq(questions.id, questionId),
  });

  const isCorrect = question?.answer === selectedAnswer;

  await db.insert(userAnswers).values({
    sessionId,
    questionId,
    selectedAnswer,
    isCorrect,
    timeSpent,
  });

  return { isCorrect };
}

// 시험 종료 & 결과 계산
export async function finishTest(sessionId: string) {
  const answers = await db
    .select()
    .from(userAnswers)
    .where(eq(userAnswers.sessionId, sessionId));

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const totalTime = answers.reduce((sum, a) => sum + (a.timeSpent || 0), 0);
  const score =
    answers.length > 0
      ? Math.round((correctCount / answers.length) * 100)
      : 0;

  await db
    .update(testSessions)
    .set({
      completedAt: new Date(),
      correctAnswers: correctCount,
      score,
      timeSpent: totalTime,
    })
    .where(eq(testSessions.id, sessionId));

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/analytics");

  return { score, correctCount, totalQuestions: answers.length, totalTime };
}

// 시험 결과 조회
export async function getTestResult(sessionId: string) {
  const session = await db.query.testSessions.findFirst({
    where: eq(testSessions.id, sessionId),
    with: {
      examType: true,
      answers: {
        with: {
          question: true,
        },
      },
    },
  });

  return session;
}

// 시험 유형 목록 조회
export async function getExamTypes() {
  return db.query.examTypes.findMany();
}

// 사용자의 최근 시험 기록
export async function getRecentTests(userId: string) {
  return db.query.testSessions.findMany({
    where: eq(testSessions.userId, userId),
    orderBy: (sessions, { desc }) => [desc(sessions.startedAt)],
    limit: 10,
    with: {
      examType: true,
    },
  });
}
