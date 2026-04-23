import { beforeEach, describe, expect, it } from "vitest";
import { loadSession, saveSession } from "../src/storage/storage";

class LocalStorageMock {
  private store = new Map<string, string>();

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }
}

describe("storage session", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "window", {
      value: globalThis,
      configurable: true
    });
    Object.defineProperty(globalThis, "localStorage", {
      value: new LocalStorageMock(),
      configurable: true
    });
  });

  it("guarda i restaura sessió", () => {
    const sample = {
      id: "s1",
      mode: "full",
      startedAt: new Date().toISOString(),
      endAt: new Date().toISOString(),
      durationSeconds: 10,
      questions: [],
      currentIndex: 0,
      remainingSeconds: 10,
      answers: {},
      markedForReview: {},
      finished: false
    } as const;

    saveSession(sample as never);
    const restored = loadSession();

    expect(restored?.id).toBe("s1");
    expect(restored?.mode).toBe("full");
  });
});

