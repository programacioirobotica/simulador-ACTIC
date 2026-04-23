import type { Question } from "../../data/questions";
import type { UserAnswer } from "../../types/exam";

type OptionQuestion = Extract<Question, { tipus: "single" | "multiple" | "scenario" }>;

type Props = {
  question: OptionQuestion;
  answer: UserAnswer;
  onChange: (value: UserAnswer) => void;
};

export function ScenarioQuestion({ question, answer, onChange }: Props): JSX.Element {
  const current = typeof answer === "string" ? answer : "";

  return (
    <div className="space-y-3">
      {question.opcions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={`w-full rounded-none border px-4 py-3 text-left ${
            current === option.id ? "border-app-accent bg-orange-50" : "border-app-border bg-white"
          }`}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}

