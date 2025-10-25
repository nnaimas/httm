import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import SummaryPage from "./pages/SummaryPage";
import { MOCK_USER, MOCK_HISTORY } from "./data/mockData";
import { useSummarizeMutation } from "./hooks/useSummarizeMutation";

export default function App() {
  const [summaryData, setSummaryData] = useState(null);
  const mutation = useSummarizeMutation(setSummaryData);

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar
        user={MOCK_USER}
        history={MOCK_HISTORY}
        onNewSummary={() => setSummaryData(null)}
      />
      <main className="flex-1 ml-64 p-6 overflow-auto">
        {!summaryData ? (
          <HomePage mutation={mutation} />
        ) : (
          <SummaryPage summaryData={summaryData} />
        )}
      </main>
    </div>
  );
}
