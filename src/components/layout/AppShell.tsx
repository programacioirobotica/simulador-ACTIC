import { Link, Outlet } from "react-router-dom";

export function AppShell(): JSX.Element {
  return (
    <div className="min-h-screen bg-app-bg text-gray-900">
      <header className="border-b border-app-border bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-semibold">ACTIC Nivell 1</h1>
            <p className="text-sm text-gray-600">Simulació de prova</p>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <Link className="hover:underline" to="/">
              Inici
            </Link>
            <Link className="hover:underline" to="/history">
              Historial
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

