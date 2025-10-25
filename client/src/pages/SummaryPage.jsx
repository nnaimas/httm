import React, { useState } from "react";
import { icons } from "../components/icons";

function SummaryPage({ data, onBack }) {
  return (
    <div className="ml-64 min-h-screen bg-gray-900 text-gray-200 p-10">
      <button onClick={onBack} className="text-indigo-400 hover:underline mb-4">
        &lt; Quay lại
      </button>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Văn bản gốc</h2>
          <div className="bg-gray-900 p-3 rounded-md min-h-[300px] whitespace-pre-wrap">
            {data.originalText}
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg relative">
          <h2 className="text-lg font-semibold mb-2">Văn bản tóm tắt</h2>
          <div className="bg-gray-900 p-3 rounded-md min-h-[300px] whitespace-pre-wrap">
            {data.summarizedText}
          </div>
          <div className="absolute bottom-3 right-3 flex space-x-2">
            {[icons.share, icons.copy, icons.expand].map((Icon, i) => (
              <button
                key={i}
                className="p-2 bg-gray-700 rounded-full hover:bg-indigo-600"
              >
                {React.createElement(Icon, { className: "w-4 h-4" })}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// === App chính ===
export default function App() {
  const [summary, setSummary] = useState(null);
  return (
    <>
      <Sidebar onNewSummary={() => setSummary(null)} />
      {summary ? (
        <ResultPage data={summary} onBack={() => setSummary(null)} />
      ) : (
        <HomePage onSummarize={setSummary} />
      )}
    </>
  );
}
