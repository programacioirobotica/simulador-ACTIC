import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { ExamPage } from "./pages/ExamPage";
import { HistoryPage } from "./pages/HistoryPage";
import { HomePage } from "./pages/HomePage";
import { ResultsPage } from "./pages/ResultsPage";
import { ReviewPage } from "./pages/ReviewPage";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
      <Route path="/exam" element={<ExamPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

