import { describe, expect, it } from "vitest";
import type { Question } from "../src/data/questions";
import { calculateExamResult } from "../src/features/exam/scoring";

const mockQuestions: Question[] = [
  {
    id: "q1",
    bloc: 1,
    blocNom: "B1",
    competencia: "C1",
    codi: "1.1.1",
    tipus: "single",
    dificultat: "easy",
    pes: 1,
    enunciat: "",
    instruccio: "",
    opcions: [
      { id: "a", text: "A" },
      { id: "b", text: "B" }
    ],
    respostaCorrecta: "a",
    explicacio: "",
    tags: [],
    mouseOnly: true
  },
  {
    id: "q2",
    bloc: 2,
    blocNom: "B2",
    competencia: "C2",
    codi: "2.1.1",
    tipus: "multiple",
    dificultat: "hard",
    pes: 3,
    enunciat: "",
    instruccio: "",
    opcions: [
      { id: "a", text: "A" },
      { id: "b", text: "B" },
      { id: "c", text: "C" }
    ],
    respostaCorrecta: ["a", "b"],
    explicacio: "",
    tags: [],
    mouseOnly: true
  }
];

describe("scoring", () => {
  it("calcula percentatge ponderat correctament", () => {
    const result = calculateExamResult({
      questions: mockQuestions,
      answers: {
        q1: "a",
        q2: ["a", "b"]
      },
      startedAt: new Date("2026-01-01T10:00:00.000Z").toISOString(),
      finishedAt: new Date("2026-01-01T10:10:00.000Z").toISOString(),
      totalSeconds: 1200
    });

    expect(result.maxScore).toBe(4);
    expect(result.obtainedScore).toBe(4);
    expect(result.percentage).toBe(100);
    expect(result.status).toBe("APTE");
  });
});

