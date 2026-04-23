import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ExamLayout } from "../components/ExamLayout";
import { QuestionRenderer } from "../components/QuestionRenderer";
import { formatTime } from "../features/exam/timer";
import { useExamStore } from "../store/examStore";

export function ExamPage(): JSX.Element {
  const navigate = useNavigate();
  const {
    session,
    hydrate,
    hydrated,
    tickTimer,
    setAnswer,
    setCurrentIndex,
    nextQuestion,
    prevQuestion,
    toggleMarkForReview,
    finalizeExam
  } = useExamStore((state) => ({
    session: state.session,
    hydrate: state.hydrate,
    hydrated: state.hydrated,
    tickTimer: state.tickTimer,
    setAnswer: state.setAnswer,
    setCurrentIndex: state.setCurrentIndex,
    nextQuestion: state.nextQuestion,
    prevQuestion: state.prevQuestion,
    toggleMarkForReview: state.toggleMarkForReview,
    finalizeExam: state.finalizeExam
  }));

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrate, hydrated]);

  useEffect(() => {
    if (!session) {
      return;
    }

    const interval = window.setInterval(() => tickTimer(), 1000);

    const beforeUnload = (event: BeforeUnloadEvent): void => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [session, tickTimer]);

  if (!session) {
    return <div className="p-6">No hi ha cap prova activa.</div>;
  }

  const currentQuestion = session.questions[session.currentIndex];
  const total = session.questions.length;
  const answered = session.questions.filter((q) => session.answers[q.id] !== undefined).length;
  const pending = total - answered;
  const marked = session.questions.filter((q) => session.markedForReview[q.id]).length;
  const percent = Math.round((answered / total) * 100);
  const currentAnswer = session.answers[currentQuestion.id] ?? null;

  const finish = (): void => {
    if (pending > 0) {
      const proceed = window.confirm(`Encara tens ${pending} preguntes pendents. Vols finalitzar igualment?`);
      if (!proceed) {
        return;
      }
    }

    finalizeExam();
    navigate("/results");
  };

  const circular = useMemo(() => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    return { radius, circumference, offset };
  }, [percent]);

  return (
    <ExamLayout
      headerRight={
        <button type="button" className="btn-dark" onClick={finish}>
          FINALITZAR PROVA
        </button>
      }
      main={
        <div className="space-y-4">
          <div className="border-b border-app-border pb-3">
            <p className="text-sm text-gray-600">{currentQuestion.codi} · {currentQuestion.blocNom}</p>
            <h2 className="mt-2 text-xl font-semibold">{currentQuestion.enunciat}</h2>
            <p className="mt-2 text-sm text-gray-600">{currentQuestion.instruccio}</p>
          </div>

          <QuestionRenderer question={currentQuestion} answer={currentAnswer} onChange={(value) => setAnswer(currentQuestion.id, value)} />

          <div className="flex items-center justify-between border-t border-app-border pt-4">
            <button
              type="button"
              className="border border-app-border bg-white px-3 py-2 text-sm"
              onClick={() => toggleMarkForReview(currentQuestion.id)}
            >
              {session.markedForReview[currentQuestion.id] ? "Desmarcar revisió" : "Marcar per revisar"}
            </button>
            <div className="flex gap-2">
              <button type="button" className="border border-app-border bg-white px-3 py-2 text-sm" onClick={prevQuestion}>
                ANTERIOR
              </button>
              <button type="button" className="btn-dark" onClick={nextQuestion}>
                SEGÜENT
              </button>
            </div>
          </div>
        </div>
      }
      sidebar={
        <>
          <div className="panel">
            <h3 className="text-sm font-semibold text-gray-700">Temps restant</h3>
            <p className="mt-2 text-3xl font-semibold">{formatTime(session.remainingSeconds)}</p>
          </div>

          <div className="panel">
            <h3 className="text-sm font-semibold text-gray-700">Progrés de la prova</h3>
            <div className="mt-2 h-3 w-full bg-gray-200">
              <div className="h-3 bg-app-accent" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-2 text-sm">{percent}%</p>
          </div>

          <div className="panel text-sm">
            <h3 className="mb-2 font-semibold text-gray-700">Estat de respostes</h3>
            <p>Contestades: {answered}</p>
            <p>Pendents: {pending}</p>
            <p>Marcades: {marked}</p>
          </div>

          <div className="panel flex flex-col items-center justify-center">
            <svg viewBox="0 0 120 120" className="h-28 w-28">
              <circle cx="60" cy="60" r={circular.radius} stroke="#e5e7eb" strokeWidth="10" fill="none" />
              <circle
                cx="60"
                cy="60"
                r={circular.radius}
                stroke="#ea580c"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circular.circumference}
                strokeDashoffset={circular.offset}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <p className="text-sm">Pregunta {session.currentIndex + 1} / {total}</p>
          </div>

          <div className="panel">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">Navegació</h3>
            <div className="grid grid-cols-8 gap-1">
              {session.questions.map((q, index) => (
                <button
                  key={q.id}
                  type="button"
                  className={`h-8 border text-xs ${
                    index === session.currentIndex
                      ? "border-app-accent bg-orange-50"
                      : session.answers[q.id]
                        ? "border-app-border bg-green-50"
                        : "border-app-border bg-white"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      }
    />
  );
}

