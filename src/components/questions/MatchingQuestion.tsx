import { useMemo } from "react";
import type { Question, QuestionPair } from "../../data/questions";
import type { UserAnswer } from "../../types/exam";

type Props = {
  question: Extract<Question, { tipus: "matching" }>;
  answer: UserAnswer;
  onChange: (value: UserAnswer) => void;
};

export function MatchingQuestion({ question, answer, onChange }: Props): JSX.Element {
  const current = useMemo(() => {
    if (Array.isArray(answer) && answer.length > 0) {
      return answer as QuestionPair[];
    }
    return question.parelles.map((pair) => ({ esquerra: pair.esquerra, dreta: "" }));
  }, [answer, question.parelles]);

  const rightOptions = question.parelles.map((pair) => pair.dreta);

  const setMatch = (left: string, right: string): void => {
    const next = current.map((pair) => (pair.esquerra === left ? { ...pair, dreta: right } : pair));
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {current.map((pair) => (
        <div key={pair.esquerra} className="border border-app-border bg-white p-3">
          <div className="mb-2 font-medium">{pair.esquerra}</div>
          <div className="grid gap-2 md:grid-cols-2">
            {rightOptions.map((right) => {
              const selected = pair.dreta === right;
              return (
                <button
                  key={right}
                  type="button"
                  onClick={() => setMatch(pair.esquerra, right)}
                  className={`border px-3 py-2 text-left text-sm ${
                    selected ? "border-app-accent bg-orange-50" : "border-app-border"
                  }`}
                >
                  {right}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

