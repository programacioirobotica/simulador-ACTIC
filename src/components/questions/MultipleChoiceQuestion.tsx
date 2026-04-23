import type { Question } from "../../data/questions";
import type { UserAnswer } from "../../types/exam";

type OptionQuestion = Extract<Question, { tipus: "single" | "multiple" | "scenario" }>;

type Props = {
  question: OptionQuestion;
  answer: UserAnswer;
  onChange: (value: UserAnswer) => void;
};

export function MultipleChoiceQuestion({ question, answer, onChange }: Props): JSX.Element {
  const current = Array.isArray(answer) && answer.every((item) => typeof item === "string") ? answer : [];

  const toggle = (id: string): void => {
    if (current.includes(id)) {
      onChange(current.filter((value) => value !== id));
      return;
    }
    onChange([...current, id]);
  };

  return (
    <div className="space-y-3">
      {question.opcions.map((option) => {
        const selected = current.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => toggle(option.id)}
            className={`w-full rounded-none border px-4 py-3 text-left ${
              selected ? "border-app-accent bg-orange-50" : "border-app-border bg-white"
            }`}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );
}

