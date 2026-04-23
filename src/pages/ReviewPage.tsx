import { Link } from "react-router-dom";
import type { Question } from "../data/questions";
import { isAnswerCorrect } from "../features/exam/scoring";
import { useExamStore } from "../store/examStore";

function formatUserAnswer(answer: unknown): string {
  if (answer === null || answer === undefined) {
    return "Sense resposta";
  }

  if (typeof answer === "string") {
    return answer;
  }

  if (Array.isArray(answer)) {
    return JSON.stringify(answer);
  }

  return String(answer);
}

function formatCorrect(question: Question): string {
  switch (question.tipus) {
    case "single":
    case "multiple":
    case "scenario":
      return JSON.stringify(question.respostaCorrecta);
    case "ordering":
      return JSON.stringify(question.respostaCorrecta.ordre);
    case "matching":
      return JSON.stringify(question.respostaCorrecta.parelles);
    case "hotspot":
      return question.respostaCorrecta.hotspotId;
    case "ui-click":
      return question.respostaCorrecta.targetId;
    default:
      return "";
  }
}

export function ReviewPage(): JSX.Element {
  const result = useExamStore((state) => state.latestResult);

  if (!result) {
    return (
      <div className="min-h-screen bg-app-bg p-6">
        <div className="mx-auto max-w-4xl panel">
          <p>No hi ha cap prova per revisar.</p>
          <Link className="mt-3 inline-block underline" to="/">
            Tornar a inici
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-bg p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-3">
        <h2 className="text-xl font-semibold">Revisió post-examen</h2>
        {result.questions.map((question, index) => {
          const answer = result.answers[question.id] ?? null;
          const correct = isAnswerCorrect(question, answer);

          return (
            <article key={question.id} className="panel">
              <p className="text-sm text-gray-600">Pregunta {index + 1} · {question.codi}</p>
              <h3 className="mt-1 text-base font-medium">{question.enunciat}</h3>
              <p className="mt-2 text-sm">Resposta usuari: {formatUserAnswer(answer)}</p>
              <p className="text-sm">Resposta correcta: {formatCorrect(question)}</p>
              <p className="mt-1 text-sm">Explicació: {question.explicacio}</p>
              <p className={`mt-2 text-sm font-semibold ${correct ? "text-green-700" : "text-red-700"}`}>
                {correct ? "Correcta" : "Incorrecta"}
              </p>
            </article>
          );
        })}

        <Link to="/results" className="inline-block border border-app-border bg-white px-4 py-2 text-sm">
          Tornar a resultats
        </Link>
      </div>
    </div>
  );
}
