import React, { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SummaryPage from "./pages/SummaryPage.jsx";
import { useSummarizeMutation } from "./hooks/useSummarizeMutation.js";
// Xóa MOCK_USER và MOCK_HISTORY
import "./index.css"; // Đảm bảo đã import CSS

// 1. Thay thế MOCK_USER bằng một đối tượng tạm thời
const currentUser = {
  name: "User 123",
  avatarUrl: "https://placehold.co/40x40/6366f1/ffffff?text=U",
};

// 2. Thay thế MOCK_HISTORY bằng mảng rỗng
const historyData = [];

/**
 * Component App chính
 * Quản lý state chung và logic chuyển trang
 */
export default function App() {
  // State quản lý view (trang chủ hoặc kết quả)
  const [view, setView] = useState("home");

  // State giữ dữ liệu tóm tắt trả về từ API
  const [summaryData, setSummaryData] = useState(null);

  // Hàm callback sẽ được gọi khi mutation (API) thành công
  const handleSuccess = (data) => {
    // 'data' là 'SummaryResponse' từ API
    setSummaryData({
      originalText: data.originalText,
      summarizedText: data.summarizedText,
      // Backend của bạn trả về { originalText, summarizedText }
      // nên chúng ta gán trực tiếp
    });
    setView("result"); // Chuyển sang trang kết quả
  };

  // Khởi tạo hook mutation và truyền hàm callback
  const summarizeMutation = useSummarizeMutation(handleSuccess);

  // Hàm này được gọi bởi Sidebar để quay về trang chủ
  const handleNewSummary = () => {
    setView("home");
    setSummaryData(null);
    summarizeMutation.reset(); // Reset trạng thái của hook (lỗi, loading, v.v.)
  };

  return (
    <div className="app-container">
      {/* --- SỬA LỖI GIAO DIỆN --- */}
      {/* Chỉ hiển thị Sidebar ở trang chủ (view === "home") */}
      {view === "home" && (
        <Sidebar
          user={currentUser} // <-- 3. Sử dụng currentUser
          history={historyData} // <-- 4. Sử dụng historyData
          onNewSummary={handleNewSummary}
        />
      )}

      <main className="main-content">
        {/* Hiển thị trang chủ */}
        {view === "home" && (
          // Truyền object mutation xuống cho HomePage
          <HomePage mutation={summarizeMutation} />
        )}

        {/* Hiển thị trang kết quả */}
        {view === "result" && summaryData && (
          <SummaryPage summaryData={summaryData} />
        )}
      </main>
    </div>
  );
}
