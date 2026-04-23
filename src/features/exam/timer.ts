export const EXAM_DURATION_SECONDS = 75 * 60;

export function createExamEndTimestamp(remainingSeconds: number, now = Date.now()): string {
  return new Date(now + remainingSeconds * 1000).toISOString();
}

export function getRemainingSeconds(endAt: string, now = Date.now()): number {
  const endMs = new Date(endAt).getTime();
  const remaining = Math.floor((endMs - now) / 1000);
  return Math.max(remaining, 0);
}

export function formatTime(totalSeconds: number): string {
  const safe = Math.max(totalSeconds, 0);
  const h = String(Math.floor(safe / 3600)).padStart(2, "0");
  const m = String(Math.floor((safe % 3600) / 60)).padStart(2, "0");
  const s = String(safe % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

