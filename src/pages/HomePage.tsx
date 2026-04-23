import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useExamStore } from "../store/examStore";

export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const { startExam, hydrate, hydrated, session } = useExamStore((state) => ({
    startExam: state.startExam,
    hydrate: state.hydrate,
    hydrated: state.hydrated,
    session: state.session
  }));

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrate, hydrated]);

  const start = (mode: "full" | "quick" | "block", blockFilter?: number): void => {
    startExam({ mode, blockFilter });
    navigate("/exam");
  };

  return (
    <div className="space-y-4">
      <section className="panel space-y-4">
        <h2 className="text-2xl font-semibold">ACTIC Nivell 1</h2>
        <p className="text-sm text-gray-700">
          Simulació formal del nivell bàsic amb correcció automàtica, cronòmetre i historial local.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-dark" onClick={() => start("full")}>
            Començar simulació completa
          </button>
          <button type="button" className="btn-dark" onClick={() => start("quick")}>
            Pràctica ràpida
          </button>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Pràctica per blocs</p>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((block) => (
              <button key={block} type="button" className="border border-app-border bg-white px-3 py-2 text-sm" onClick={() => start("block", block)}>
                Bloc {block}
              </button>
            ))}
          </div>
        </div>
        <div className="pt-2">
          <Link className="text-sm text-gray-700 underline" to="/history">
            Veure historial
          </Link>
        </div>
      </section>

      {session ? (
        <section className="panel">
          <p className="text-sm">Tens una sessió oberta pendent de finalitzar.</p>
          <button type="button" className="mt-3 btn-dark" onClick={() => navigate("/exam")}>
            Recuperar sessió
          </button>
        </section>
      ) : null}
    </div>
  );
}


