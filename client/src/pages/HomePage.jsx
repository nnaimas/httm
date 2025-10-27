import React, { useState, useRef } from "react";
import { icons } from "../components/icons.jsx";

/**
 * Component Trang chủ (Ảnh 4.png)
 * Nhận `mutation` object từ App.jsx
 */
export default function HomePage({ mutation }) {
  const { mutate, isPending: isLoading, isError, error } = mutation; // Sửa: v5 dùng isPending

  // `SummarizePage` state từ sơ đồ UML
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState(null); // 'file'
  const fileInputRef = useRef(null);

  // 'onFileChange'
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      setTextInput(""); // Xóa text input khi đã chọn file
    }
  };

  // 'handleSubmit'
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim() && !file) {
      // alert đã bị vô hiệu hóa, dùng console.error
      console.error("Vui lòng nhập văn bản hoặc tải lên một tệp.");
      return;
    }

    // Kích hoạt mutation (gọi hook)
    // payload này sẽ được gửi đến `summarizeApi`
    mutate({
      textInput: textInput,
      file: file,
      userId: 1, // Tạm gán cứng, sẽ lấy từ context
      modelId: 1, // Tạm gán cứng, sẽ lấy từ dropdown
    });
  };

  // Logic kích hoạt nút submit ('btnSubmit')
  const canSubmit = (textInput.trim() !== "" || file !== null) && !isLoading;

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">
        Tóm tắt văn bản đơn giản hơn với 1 click
      </h1>

      {/* Input file ẩn */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // ẩn đi
        accept=".txt,.pdf,.docx" // Giới hạn loại file (tùy chọn)
      />

      {/* Thanh nhập liệu chính */}
      <form onSubmit={handleSubmit} className="summary-form">
        <div className="input-container">
          {/* Nút 'tải file' */}
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="file-upload-button"
            title="Tải tệp lên"
          >
            {icons.paperclip({ className: "file-upload-icon" })}
          </button>

          {/* Ô 'textInput' */}
          <input
            type="text"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
              if (e.target.value) setFile(null); // Xóa file nếu người dùng gõ text
            }}
            placeholder={file ? file.name : "Nhập văn bản, tóm tắt tại đây"}
            disabled={file !== null} // Vô hiệu hóa gõ text nếu đã chọn file
            className="text-input"
          />

          {/* Nút 'btnSubmit' */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="submit-button"
            title="Tóm tắt"
          >
            {isLoading ? (
              // Icon loading xoay
              <svg
                className="loading-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  style={{ opacity: 0.25 }}
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  style={{ opacity: 0.75 }}
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              icons.arrowUp({ className: "submit-icon" })
            )}
          </button>
        </div>
      </form>

      {/* Hiển thị lỗi nếu có */}
      {isError && (
        <div className="error-message">
          Lỗi: {error.message || "Không thể kết nối đến máy chủ."}
        </div>
      )}
    </div>
  );
}
