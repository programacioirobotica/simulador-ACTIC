import { create } from "zustand";
import { generateExam } from "../features/exam/examGenerator";
import { calculateExamResult } from "../features/exam/scoring";
import { EXAM_DURATION_SECONDS, createExamEndTimestamp, getRemainingSeconds } from "../features/exam/timer";
import { clearSession, loadHistory, loadSession, saveHistory, saveSession } from "../storage/storage";
import type { ExamAttempt, ExamMode, ExamSession, UserAnswer } from "../types/exam";

type StartOptions = {
  mode: ExamMode;
  blockFilter?: number;
};

type ExamState = {
  session: ExamSession | null;
  history: ExamAttempt[];
  latestResult: ExamAttempt | null;
  hydrated: boolean;
  hydrate: () => void;
  startExam: (options: StartOptions) => void;
  setAnswer: (questionId: string, answer: UserAnswer) => void;
  toggleMarkForReview: (questionId: string) => void;
  setCurrentIndex: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  tickTimer: () => void;
  finalizeExam: () => ExamAttempt | null;
  clearLatestResult: () => void;
};

function persistState(session: ExamSession | null, history: ExamAttempt[]): void {
  saveSession(session);
  saveHistory(history);
}

function getDurationByMode(mode: ExamMode): number {
  if (mode === "quick") {
    return 20 * 60;
  }
  if (mode === "block") {
    return 25 * 60;
  }
  return EXAM_DURATION_SECONDS;
}

export const useExamStore = create<ExamState>((set, get) => ({
  session: null,
  history: [],
  latestResult: null,
  hydrated: false,

  hydrate: () => {
    const session = loadSession();
    const history = loadHistory();

    if (session && !session.finished) {
      const remaining = getRemainingSeconds(session.endAt);
      session.remainingSeconds = remaining;
      if (remaining === 0) {
        session.finished = true;
      }
    }

    set({ session, history, hydrated: true });
  },

  startExam: ({ mode, blockFilter }) => {
    const generatedQuestions = generateExam({ mode, blockFilter });
    const now = new Date();
    const durationSeconds = getDurationByMode(mode);
    const session: ExamSession = {
      id: `SES-${Date.now()}`,
      mode,
      blockFilter,
      startedAt: now.toISOString(),
      endAt: createExamEndTimestamp(durationSeconds, now.getTime()),
      durationSeconds,
      questions: generatedQuestions,
      currentIndex: 0,
      remainingSeconds: durationSeconds,
      answers: {},
      markedForReview: {},
      finished: false
    };

    const history = get().history;
    persistState(session, history);
    set({ session, latestResult: null });
  },

  setAnswer: (questionId, answer) => {
    const session = get().session;
    if (!session || session.finished) {
      return;
    }

    const updated: ExamSession = {
      ...session,
      answers: {
        ...session.answers,
        [questionId]: answer
      }
    };

    persistState(updated, get().history);
    set({ session: updated });
  },

  toggleMarkForReview: (questionId) => {
    const session = get().session;
    if (!session || session.finished) {
      return;
    }

    const updated: ExamSession = {
      ...session,
      markedForReview: {
        ...session.markedForReview,
        [questionId]: !session.markedForReview[questionId]
      }
    };

    persistState(updated, get().history);
    set({ session: updated });
  },

  setCurrentIndex: (index) => {
    const session = get().session;
    if (!session || session.finished) {
      return;
    }

    const safeIndex = Math.min(Math.max(index, 0), session.questions.length - 1);
    const updated = { ...session, currentIndex: safeIndex };

    persistState(updated, get().history);
    set({ session: updated });
  },

  nextQuestion: () => {
    const { session, setCurrentIndex } = get();
    if (!session) {
      return;
    }

    setCurrentIndex(session.currentIndex + 1);
  },

  prevQuestion: () => {
    const { session, setCurrentIndex } = get();
    if (!session) {
      return;
    }

    setCurrentIndex(session.currentIndex - 1);
  },

  tickTimer: () => {
    const session = get().session;
    if (!session || session.finished) {
      return;
    }

    const remaining = getRemainingSeconds(session.endAt);
    const updated = {
      ...session,
      remainingSeconds: remaining
    };

    if (remaining <= 0) {
      updated.finished = true;
      set({ session: updated });
      get().finalizeExam();
      return;
    }

    persistState(updated, get().history);
    set({ session: updated });
  },

  finalizeExam: () => {
    const state = get();
    const session = state.session;

    if (!session) {
      return null;
    }

    const nowIso = new Date().toISOString();
    const result = calculateExamResult({
      questions: session.questions,
      answers: session.answers,
      startedAt: session.startedAt,
      finishedAt: nowIso,
      totalSeconds: session.durationSeconds
    });

    const history = [result, ...state.history].slice(0, 30);

    clearSession();
    saveHistory(history);

    set({
      session: null,
      history,
      latestResult: result
    });

    return result;
  },

  clearLatestResult: () => set({ latestResult: null })
}));

