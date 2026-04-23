import type { Question, QuestionPair } from "../data/questions";

export type ExamMode = "full" | "quick" | "block";

export type UserAnswer = string | string[] | QuestionPair[] | null;

export type ExamResultStatus = "APTE" | "NO APTE";

export type ExamSession = {
  id: string;
  mode: ExamMode;
  blockFilter?: number;
  startedAt: string;
  endAt: string;
  durationSeconds: number;
  questions: Question[];
  currentIndex: number;
  remainingSeconds: number;
  answers: Record<string, UserAnswer>;
  markedForReview: Record<string, boolean>;
  finished: boolean;
};

export type BlockSummary = {
  bloc: number;
  blocNom: string;
  maxScore: number;
  obtainedScore: number;
  percent: number;
};

export type DifficultySummary = {
  difficulty: "easy" | "medium" | "hard";
  maxScore: number;
  obtainedScore: number;
  percent: number;
};

export type ExamAttempt = {
  id: string;
  date: string;
  status: ExamResultStatus;
  percentage: number;
  obtainedScore: number;
  maxScore: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  usedSeconds: number;
  totalSeconds: number;
  weakBlocks: string[];
  blockSummary: BlockSummary[];
  difficultySummary: DifficultySummary[];
  answers: Record<string, UserAnswer>;
  questions: Question[];
};

