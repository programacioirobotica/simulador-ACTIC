import { Link, useNavigate } from "react-router-dom";
import { formatTime } from "../features/exam/timer";
import { useExamStore } from "../store/examStore";

function buildRecommendations(weakBlocks: string[]): string[] {
  if (weakBlocks.length === 0) {
    return ["Mantén la pràctica regular amb simulacions completes per consolidar el nivell."];
  }

  return weakBlocks.map((block) => `Repassa continguts i exercicis del bloc: ${block}.`);
}

export function ResultsPage(): JSX.Element {
  const navigate = useNavigate();
  const { latestResult, startExam } = useExamStore((state) => ({
    latestResult: state.latestResult,
    startExam: state.startExam
  }));

  if (!latestResult) {
    return (
      <div className="min-h-screen bg-app-bg p-6">
        <div className="mx-auto max-w-4xl panel">
          <p>No hi ha resultats recents.</p>
          <Link className="mt-3 inline-block underline" to="/">
            Tornar a inici
          </Link>
        </div>
      </div>
    );
  }

  const recommendations = buildRecommendations(latestResult.weakBlocks);

  return (
    <div className="min-h-screen bg-app-bg p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <section className="panel text-center">
          <p className="text-sm text-gray-600">Resultat final</p>
          <p className="mt-2 text-6xl font-semibold">{latestResult.percentage}%</p>
          <p className={`mt-2 text-2xl font-semibold ${latestResult.status === "APTE" ? "text-green-700" : "text-red-700"}`}>
            {latestResult.status}
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="panel">
            <h3 className="mb-2 font-semibold">Resum general</h3>
            <p>Correctes: {latestResult.correctCount}</p>
            <p>Incorrectes: {latestResult.incorrectCount}</p>
            <p>Sense resposta: {latestResult.unansweredCount}</p>
            <p>
              Temps utilitzat: {formatTime(latestResult.usedSeconds)} / {formatTime(latestResult.totalSeconds)}
            </p>
          </div>

          <div className="panel">
            <h3 className="mb-2 font-semibold">Recomanacions de millora</h3>
            <ul className="space-y-1 text-sm">
              {recommendations.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="panel">
          <h3 className="mb-3 font-semibold">Resum per blocs</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {latestResult.blockSummary.map((block) => (
              <div key={block.bloc} className="border border-app-border p-3 text-sm">
                <p className="font-medium">Bloc {block.bloc} - {block.blocNom}</p>
                <p>{block.percent}%</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3 className="mb-3 font-semibold">Rendiment per dificultat</h3>
          <div className="grid gap-2 md:grid-cols-3">
            {latestResult.difficultySummary.map((item) => (
              <div key={item.difficulty} className="border border-app-border p-3 text-sm">
                <p className="font-medium uppercase">{item.difficulty}</p>
                <p>{item.percent}%</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-dark"
            onClick={() => {
              startExam({ mode: "full" });
              navigate("/exam");
            }}
          >
            Repetir prova
          </button>
          <button type="button" className="border border-app-border bg-white px-4 py-2" onClick={() => navigate("/review")}>
            Revisar preguntes
          </button>
          <Link to="/history" className="border border-app-border bg-white px-4 py-2">
            Veure historial
          </Link>
        </div>
      </div>
    </div>
  );
}

