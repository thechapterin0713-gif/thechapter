export interface Question {
  id: string;
  content: string;
  options: string[];
  category: string;
  difficulty: string;
  imageUrl?: string | null;
}

export interface TestSession {
  id: string;
  examTypeId: string;
  startedAt: Date;
  completedAt?: Date | null;
  timeSpent?: number | null;
  score?: number | null;
  totalQuestions: number;
  correctAnswers?: number | null;
}

export interface ExamType {
  id: string;
  name: string;
  company: string;
  description?: string | null;
  timeLimit?: number | null;
}

export interface UserAnswer {
  id: string;
  sessionId: string;
  questionId: string;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  timeSpent: number | null;
}
