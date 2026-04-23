import type { Question, QuestionPair } from "../../data/questions";
import type { BlockSummary, DifficultySummary, ExamAttempt, ExamResultStatus, UserAnswer } from "../../types/exam";

function normalizeArray(value: string[]): string[] {
  return [...value].sort();
}

function samePairs(user: QuestionPair[], expected: QuestionPair[]): boolean {
  if (user.length !== expected.length) {
    return false;
  }

  return expected.every((pair) => user.some((item) => item.esquerra === pair.esquerra && item.dreta === pair.dreta));
}

export function isAnswerCorrect(question: Question, answer: UserAnswer): boolean {
  if (answer === null) {
    return false;
  }

  if (question.tipus === "single" || question.tipus === "scenario") {
    return typeof answer === "string" && answer === question.respostaCorrecta;
  }

  if (question.tipus === "multiple") {
    if (
      !Array.isArray(answer) ||
      !answer.every((item) => typeof item === "string") ||
      !Array.isArray(question.respostaCorrecta)
    ) {
      return false;
    }

    return JSON.stringify(normalizeArray(answer)) === JSON.stringify(normalizeArray(question.respostaCorrecta));
  }

  if (question.tipus === "ordering") {
    if (!Array.isArray(answer) || !answer.every((item) => typeof item === "string")) {
      return false;
    }

    return JSON.stringify(answer) === JSON.stringify(question.respostaCorrecta.ordre);
  }

  if (question.tipus === "matching") {
    return Array.isArray(answer) && samePairs(answer as QuestionPair[], question.respostaCorrecta.parelles);
  }

  if (question.tipus === "hotspot") {
    return typeof answer === "string" && answer === question.respostaCorrecta.hotspotId;
  }

  if (question.tipus === "ui-click") {
    return typeof answer === "string" && answer === question.respostaCorrecta.targetId;
  }

  return false;
}

export function calculateExamResult(params: {
  questions: Question[];
  answers: Record<string, UserAnswer>;
  startedAt: string;
  finishedAt: string;
  totalSeconds: number;
}): ExamAttempt {
  const { questions, answers, startedAt, finishedAt, totalSeconds } = params;

  let obtainedScore = 0;
  let maxScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const byBlock = new Map<number, BlockSummary>();
  const byDifficulty = new Map<"easy" | "medium" | "hard", DifficultySummary>();

  questions.forEach((question) => {
    const answer = answers[question.id] ?? null;
    const correct = isAnswerCorrect(question, answer);

    maxScore += question.pes;
    if (correct) {
      obtainedScore += question.pes;
      correctCount += 1;
    } else if (answer === null || (Array.isArray(answer) && answer.length === 0)) {
      unansweredCount += 1;
    } else {
      incorrectCount += 1;
    }

    if (!byBlock.has(question.bloc)) {
      byBlock.set(question.bloc, {
        bloc: question.bloc,
        blocNom: question.blocNom,
        maxScore: 0,
        obtainedScore: 0,
        percent: 0
      });
    }

    if (!byDifficulty.has(question.dificultat)) {
      byDifficulty.set(question.dificultat, {
        difficulty: question.dificultat,
        maxScore: 0,
        obtainedScore: 0,
        percent: 0
      });
    }

    const block = byBlock.get(question.bloc)!;
    block.maxScore += question.pes;
    if (correct) {
      block.obtainedScore += question.pes;
    }

    const difficulty = byDifficulty.get(question.dificultat)!;
    difficulty.maxScore += question.pes;
    if (correct) {
      difficulty.obtainedScore += question.pes;
    }
  });

  const percentage = maxScore === 0 ? 0 : Number(((obtainedScore / maxScore) * 100).toFixed(2));
  const status: ExamResultStatus = percentage >= 70 ? "APTE" : "NO APTE";

  const blockSummary = [...byBlock.values()].map((item) => ({
    ...item,
    percent: item.maxScore === 0 ? 0 : Number(((item.obtainedScore / item.maxScore) * 100).toFixed(2))
  }));

  const difficultySummary = [...byDifficulty.values()].map((item) => ({
    ...item,
    percent: item.maxScore === 0 ? 0 : Number(((item.obtainedScore / item.maxScore) * 100).toFixed(2))
  }));

  const usedSeconds = Math.max(
    0,
    Math.min(totalSeconds, Math.floor((new Date(finishedAt).getTime() - new Date(startedAt).getTime()) / 1000))
  );

  const weakBlocks = blockSummary
    .filter((item) => item.percent < 70)
    .sort((a, b) => a.percent - b.percent)
    .slice(0, 3)
    .map((item) => item.blocNom);

  return {
    id: `ATT-${Date.now()}`,
    date: finishedAt,
    status,
    percentage,
    obtainedScore,
    maxScore,
    correctCount,
    incorrectCount,
    unansweredCount,
    usedSeconds,
    totalSeconds,
    weakBlocks,
    blockSummary,
    difficultySummary,
    answers,
    questions
  };
}

