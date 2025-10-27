import React from "react";
import { icons } from "./icons.jsx";

/**
 * Component Sidebar
 */
export default function Sidebar({ user, history, onNewSummary }) {
  // `onNewSummary` là một hàm được truyền từ App để thay đổi view
  return (
    <div className="sidebar-container">
      {/* Logo và Tiêu đề */}
      <div className="sidebar-logo">
        {icons.layout({ className: "sidebar-logo-icon" })}
        <span className="sidebar-logo-title">Summarizer</span>
      </div>

      {/* Các nút điều hướng chính */}
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item">
            <button
              onClick={onNewSummary}
              className="sidebar-button sidebar-button-primary"
            >
              {icons.plus({ className: "sidebar-button-icon" })}
              Tạo tóm tắt mới
            </button>
          </li>
          <li className="nav-item">
            <a href="#" className="sidebar-link">
              {icons.search({ className: "sidebar-link-icon" })}
              Tìm kiếm bản tóm tắt
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="sidebar-link">
              {icons.clock({ className: "sidebar-link-icon" })}
              Toàn bộ lịch sử tóm tắt
            </a>
          </li>
        </ul>

        {/* Lịch sử gần đây */}
        <h3 className="history-title">Tóm tắt gần đây</h3>
        <ul className="history-list">
          {history.map((item) => (
            <li key={item.id}>
              <a href="#" className="history-item-link" title={item.title}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Thông tin User */}
      <div className="user-profile">
        <a href="#" className="user-profile-button">
          <img src={user.avatarUrl} alt="User Avatar" className="user-avatar" />
          <span className="user-name">{user.name}</span>
        </a>
      </div>
    </div>
  );
}
