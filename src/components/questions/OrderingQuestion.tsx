import { useMemo } from "react";
import type { Question } from "../../data/questions";
import type { UserAnswer } from "../../types/exam";

type Props = {
  question: Extract<Question, { tipus: "ordering" }>;
  answer: UserAnswer;
  onChange: (value: UserAnswer) => void;
};

export function OrderingQuestion({ question, answer, onChange }: Props): JSX.Element {
  const current = useMemo(() => {
    if (Array.isArray(answer) && answer.length > 0 && answer.every((item) => typeof item === "string")) {
      return answer;
    }
    return question.passos;
  }, [answer, question.passos]);

  const move = (index: number, direction: -1 | 1): void => {
    const target = index + direction;
    if (target < 0 || target >= current.length) {
      return;
    }
    const cloned = [...current];
    [cloned[index], cloned[target]] = [cloned[target], cloned[index]];
    onChange(cloned);
  };

  return (
    <div className="space-y-2">
      {current.map((step, index) => (
        <div key={`${step}-${index}`} className="flex items-center gap-2 border border-app-border bg-white p-2">
          <div className="w-8 text-center font-semibold text-gray-600">{index + 1}</div>
          <div className="flex-1 text-sm">{step}</div>
          <button type="button" className="border border-app-border px-2 py-1 text-xs" onClick={() => move(index, -1)}>
            Pujar
          </button>
          <button type="button" className="border border-app-border px-2 py-1 text-xs" onClick={() => move(index, 1)}>
            Baixar
          </button>
        </div>
      ))}
    </div>
  );
}

