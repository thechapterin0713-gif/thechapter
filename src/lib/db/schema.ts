import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 사용자
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  image: text("image"),
  plan: text("plan").default("free"), // free, basic, pro
  createdAt: timestamp("created_at").defaultNow(),
});

// 기업별 시험 유형
export const examTypes = pgTable("exam_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(), // GSAT, SKCT, LG인적성 등
  company: text("company").notNull(), // 삼성, SK, LG 등
  description: text("description"),
  timeLimit: integer("time_limit"), // 분 단위
});

// 문제
export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  examTypeId: uuid("exam_type_id").references(() => examTypes.id),
  category: text("category").notNull(), // 수리, 추리, 언어 등
  difficulty: text("difficulty").notNull(), // easy, medium, hard
  content: text("content").notNull(), // 문제 내용 (Markdown/HTML)
  options: jsonb("options").notNull().$type<string[]>(), // 선택지 배열
  answer: integer("answer").notNull(), // 정답 인덱스
  explanation: text("explanation"), // 해설
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 시험 세션
export const testSessions = pgTable("test_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  examTypeId: uuid("exam_type_id").references(() => examTypes.id),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  timeSpent: integer("time_spent"), // 초 단위
  score: integer("score"),
  totalQuestions: integer("total_questions"),
  correctAnswers: integer("correct_answers"),
});

// 사용자 답안
export const userAnswers = pgTable("user_answers", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id").references(() => testSessions.id),
  questionId: uuid("question_id").references(() => questions.id),
  selectedAnswer: integer("selected_answer"),
  isCorrect: boolean("is_correct"),
  timeSpent: integer("time_spent"), // 초 단위
});

// 구독
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  plan: text("plan").notNull(),
  status: text("status").notNull(), // active, canceled, past_due
  currentPeriodEnd: timestamp("current_period_end"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  testSessions: many(testSessions),
  subscriptions: many(subscriptions),
}));

export const examTypesRelations = relations(examTypes, ({ many }) => ({
  questions: many(questions),
  testSessions: many(testSessions),
}));

export const questionsRelations = relations(questions, ({ one }) => ({
  examType: one(examTypes, {
    fields: [questions.examTypeId],
    references: [examTypes.id],
  }),
}));

export const testSessionsRelations = relations(
  testSessions,
  ({ one, many }) => ({
    user: one(users, {
      fields: [testSessions.userId],
      references: [users.id],
    }),
    examType: one(examTypes, {
      fields: [testSessions.examTypeId],
      references: [examTypes.id],
    }),
    answers: many(userAnswers),
  })
);

export const userAnswersRelations = relations(userAnswers, ({ one }) => ({
  session: one(testSessions, {
    fields: [userAnswers.sessionId],
    references: [testSessions.id],
  }),
  question: one(questions, {
    fields: [userAnswers.questionId],
    references: [questions.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));
