import questions, { type Question } from "../../data/questions";
import type { ExamMode } from "../../types/exam";

type GeneratorOptions = {
  mode: ExamMode;
  blockFilter?: number;
};

const FULL_BLOCK_TARGET: Record<number, number> = {
  1: 10,
  2: 7,
  3: 7,
  4: 10,
  5: 6
};

const FULL_BLOCK_DIFFICULTY_TARGET: Record<number, { easy: number; medium: number; hard: number }> = {
  1: { easy: 4, medium: 4, hard: 2 },
  2: { easy: 3, medium: 3, hard: 1 },
  3: { easy: 3, medium: 3, hard: 1 },
  4: { easy: 4, medium: 4, hard: 2 },
  5: { easy: 2, medium: 2, hard: 2 }
};

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function byBlock(block: number): Question[] {
  return questions.filter((q) => q.bloc === block);
}

function takeWithGuards(pool: Question[], count: number, existing: Question[]): Question[] {
  const picked: Question[] = [];
  const candidates = shuffle(pool);

  while (picked.length < count && candidates.length > 0) {
    const combined = [...existing, ...picked];
    const prev = combined[combined.length - 1];
    const prev2 = combined[combined.length - 2];

    let index = candidates.findIndex((q) => {
      if (!prev) {
        return true;
      }

      const sameType = prev.tipus === q.tipus;
      const sameCode = prev.codi === q.codi;
      const sameTag = prev.tags[0] === q.tags[0];

      if (sameCode) {
        return false;
      }

      if (sameType && sameTag) {
        return false;
      }

      if (prev2 && prev2.codi === q.codi) {
        return false;
      }

      return true;
    });

    if (index < 0) {
      index = 0;
    }

    picked.push(candidates.splice(index, 1)[0]);
  }

  return picked;
}

function generateFullExam(): Question[] {
  const selected: Question[] = [];

  Object.entries(FULL_BLOCK_TARGET).forEach(([blockStr]) => {
    const block = Number(blockStr);
    const difficultyTarget = FULL_BLOCK_DIFFICULTY_TARGET[block];
    const blockQuestions = byBlock(block);
    const easyPool = blockQuestions.filter((q) => q.dificultat === "easy");
    const mediumPool = blockQuestions.filter((q) => q.dificultat === "medium");
    const hardPool = blockQuestions.filter((q) => q.dificultat === "hard");

    selected.push(...takeWithGuards(easyPool, difficultyTarget.easy, selected));
    selected.push(...takeWithGuards(mediumPool, difficultyTarget.medium, selected));
    selected.push(...takeWithGuards(hardPool, difficultyTarget.hard, selected));
  });

  return shuffle(selected).slice(0, 40);
}

function generateQuickExam(): Question[] {
  const selected: Question[] = [];
  [1, 2, 3, 4, 5].forEach((block) => {
    selected.push(...takeWithGuards(byBlock(block), 2, selected));
  });
  return shuffle(selected).slice(0, 10);
}

function generateBlockExam(block: number): Question[] {
  return shuffle(takeWithGuards(byBlock(block), 10, []));
}

export function generateExam(options: GeneratorOptions): Question[] {
  if (options.mode === "quick") {
    return generateQuickExam();
  }

  if (options.mode === "block") {
    const block = options.blockFilter ?? 1;
    return generateBlockExam(block);
  }

  return generateFullExam();
}

