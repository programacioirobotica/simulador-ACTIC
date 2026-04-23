import type { ReactNode } from "react";

type Props = {
  headerRight: ReactNode;
  main: ReactNode;
  sidebar: ReactNode;
};

export function ExamLayout({ headerRight, main, sidebar }: Props): JSX.Element {
  return (
    <div className="min-h-screen bg-app-bg text-gray-900">
      <header className="border-b border-app-border bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div>
            <h1 className="text-xl font-semibold">ACTIC Nivell 1</h1>
            <p className="text-sm text-gray-600">Simulació de prova</p>
          </div>
          <div>{headerRight}</div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-5 md:grid-cols-[1fr_320px] md:px-6">
        <section className="border border-app-border bg-white p-5">{main}</section>
        <aside className="space-y-3">{sidebar}</aside>
      </main>

      <footer className="border-t border-app-border bg-white py-3 text-center text-xs text-gray-600">
        © Generalitat de Catalunya · Avís legal · Protecció de dades · Accessibilitat · Versió 1.0.0
      </footer>
    </div>
  );
}

