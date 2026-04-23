import type { Question } from "../../data/questions";
import type { UserAnswer } from "../../types/exam";

type Props = {
  question: Extract<Question, { tipus: "ui-click" }>;
  answer: UserAnswer;
  onChange: (value: UserAnswer) => void;
};

export function UIClickQuestion({ question, answer, onChange }: Props): JSX.Element {
  const selected = typeof answer === "string" ? answer : "";

  return (
    <div className="space-y-4">
      <div className="border border-app-border bg-white p-4">
        <div className="mb-3 border-b border-app-border pb-2 text-sm text-gray-600">Interfície simulada</div>
        <div className="grid gap-2">
          {question.opcions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`border px-3 py-2 text-left ${
                selected === option.id ? "border-app-accent bg-orange-50" : "border-app-border"
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

