import { Link } from "react-router-dom";
import { formatTime } from "../features/exam/timer";
import { useExamStore } from "../store/examStore";

export function HistoryPage(): JSX.Element {
  const history = useExamStore((state) => state.history);

  return (
    <section className="panel">
      <h2 className="mb-4 text-xl font-semibold">Historial d'intents</h2>
      {history.length === 0 ? (
        <p className="text-sm text-gray-600">Encara no hi ha intents guardats.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-app-border bg-gray-50 text-left">
                <th className="p-2">Data</th>
                <th className="p-2">Percentatge</th>
                <th className="p-2">Resultat</th>
                <th className="p-2">Temps utilitzat</th>
                <th className="p-2">Blocs febles</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-b border-app-border">
                  <td className="p-2">{new Date(item.date).toLocaleString("ca-ES")}</td>
                  <td className="p-2">{item.percentage}%</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2">{formatTime(item.usedSeconds)}</td>
                  <td className="p-2">{item.weakBlocks.join(", ") || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4">
        <Link to="/" className="underline">
          Tornar a inici
        </Link>
      </div>
    </section>
  );
}

