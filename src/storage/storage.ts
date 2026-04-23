import type { ExamAttempt, ExamSession } from "../types/exam";

const SESSION_KEY = "actic_n1_session";
const HISTORY_KEY = "actic_n1_history";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function saveSession(session: ExamSession | null): void {
  if (typeof window === "undefined") {
    return;
  }

  if (!session) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function loadSession(): ExamSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  return safeParse<ExamSession | null>(localStorage.getItem(SESSION_KEY), null);
}

export function saveHistory(history: ExamAttempt[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function loadHistory(): ExamAttempt[] {
  if (typeof window === "undefined") {
    return [];
  }

  return safeParse<ExamAttempt[]>(localStorage.getItem(HISTORY_KEY), []);
}

export function clearSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(SESSION_KEY);
}

