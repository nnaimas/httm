import React from "react";
import { icons } from "../components/icons.jsx"; // Import icon

/**
 * Component Trang Kết Quả (Ảnh 8.png)
 */
export default function SummaryPage({ summaryData }) {
  // Gán tên theo sơ đồ UML
  const textOriginOutput = summaryData.originalText;
  const textSummarizedOutput = summaryData.summarizedText;

  // Icons cho sidebar mini
  const sidebarIcons = [
    { icon: icons.settings, label: "Cài đặt" },
    { icon: icons.user, label: "Tài khoản" },
    { icon: icons.logOut, label: "Đăng xuất" },
  ];

  // Icons cho các nút hành động
  const actionIcons = [
    { icon: icons.share, label: "Chia sẻ" },
    { icon: icons.copy, label: "Sao chép" },
    { icon: icons.expand, label: "Toàn màn hình" },
  ];

  return (
    <div className="summary-page-container">
      {/* Thanh nhập liệu thu nhỏ ở trên (Tĩnh) */}
      <div className="summary-header-input">
        <span className="summary-header-icon">
          {icons.plus({ style: { width: "1.25rem", height: "1.25rem" } })}
        </span>
        <input type="text" placeholder="Nhập văn bản, tóm tắt tại đây" />
        <button className="summary-header-submit" title="Tóm tắt">
          {icons.arrowUp({ style: { width: "1.25rem", height: "1.25rem" } })}
        </button>
      </div>

      {/* Khu vực 2 cột */}
      <div className="summary-content-grid">
        {/* Cột Văn bản gốc */}
        <div className="summary-box">
          <h2 className="summary-box-title">Văn bản gốc</h2>
          <div className="summary-box-content">
            <p>{textOriginOutput}</p>
          </div>
        </div>

        {/* Cột Văn bản tóm tắt */}
        <div className="summary-box">
          <h2 className="summary-box-title">Văn bản tóm tắt</h2>
          <div className="summary-box-content">
            {/* Trong ứng dụng thật, đây sẽ là <textarea> để người dùng chỉnh sửa 
              và kích hoạt logic lưu 'tblEditHistory'
            */}
            {/* Hiển thị lỗi nếu API trả về lỗi */}
            {textSummarizedOutput.startsWith("Lỗi:") ? (
              <p style={{ color: "#ffcccc" }}>{textSummarizedOutput}</p>
            ) : (
              <p>{textSummarizedOutput}</p>
            )}
          </div>
        </div>

        {/* Các nút hành động ở góc dưới (Giữ nguyên) */}
        <div className="action-buttons">
          {actionIcons.map((item, index) => (
            <button key={index} title={item.label} className="action-button">
              {item.icon({ className: "action-button-icon" })}
            </button>
          ))}
        </div>

        {/* Sidebar icon bên trái (Giữ nguyên) */}
        <div className="mini-sidebar">
          {sidebarIcons.map((item, index) => (
            <button
              key={index}
              title={item.label}
              className="mini-sidebar-button"
            >
              {item.icon({ className: "mini-sidebar-icon" })}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
