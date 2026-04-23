import type { Question } from "../../data/questions";
import type { UserAnswer } from "../../types/exam";

type Props = {
  question: Extract<Question, { tipus: "hotspot" }>;
  answer: UserAnswer;
  onChange: (value: UserAnswer) => void;
};

export function HotspotQuestion({ question, answer, onChange }: Props): JSX.Element {
  const selected = typeof answer === "string" ? answer : "";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 border border-app-border bg-gray-100 p-4">
        {question.opcions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`h-20 border text-sm ${
              selected === option.id ? "border-app-accent bg-orange-50" : "border-app-border bg-white"
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-600">Maqueta simplificada per seleccionar l'àrea correcta.</p>
    </div>
  );
}

