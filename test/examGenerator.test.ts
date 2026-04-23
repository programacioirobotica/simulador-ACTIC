import { describe, expect, it } from "vitest";
import { generateExam } from "../src/features/exam/examGenerator";

describe("examGenerator", () => {
  it("genera una prova completa de 40 preguntes amb repartiment per blocs", () => {
    const exam = generateExam({ mode: "full" });
    expect(exam).toHaveLength(40);

    const byBlock = exam.reduce<Record<number, number>>((acc, q) => {
      acc[q.bloc] = (acc[q.bloc] ?? 0) + 1;
      return acc;
    }, {});

    expect(byBlock[1]).toBe(10);
    expect(byBlock[2]).toBe(7);
    expect(byBlock[3]).toBe(7);
    expect(byBlock[4]).toBe(10);
    expect(byBlock[5]).toBe(6);
  });
});

