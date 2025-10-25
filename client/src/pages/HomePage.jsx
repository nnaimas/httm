import React, { useState, useRef } from "react";
import { icons } from "../components/icons";

export default function HomePage({ mutation }) {
  const { mutate, isLoading, isError, error } = mutation;
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setTextInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim() && !file) return alert("Nhập văn bản hoặc tải file!");
    mutate({ textInput, file, userId: 123, modelId: 1 });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <h1 className="text-4xl font-bold text-gray-300 mb-8 text-center">
        Tóm tắt văn bản đơn giản hơn với 1 click
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="relative flex items-center">
          <span className="absolute left-0 pl-5">
            {React.createElement(icons.plus, {
              className: "w-7 h-7 text-gray-400",
            })}
          </span>
          <input
            type="text"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
              if (e.target.value) setFile(null);
            }}
            placeholder={file ? file.name : "Nhập văn bản tại đây"}
            disabled={!!file}
            className="w-full h-20 pl-16 pr-24 py-4 text-xl text-gray-200 bg-gray-700 border rounded-full focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-0 mr-4 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-500"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0" />
              </svg>
            ) : (
              React.createElement(icons.arrowUp, { className: "w-7 h-7" })
            )}
          </button>
        </div>
      </form>

      <div className="mt-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".txt,.pdf,.docx"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="flex items-center px-4 py-2 bg-gray-700 text-indigo-300 rounded-full hover:bg-gray-600"
        >
          {React.createElement(icons.paperclip, { className: "w-5 h-5 mr-2" })}
          {file
            ? `Đã chọn: ${file.name}`
            : "hoặc Tải tệp lên (.txt, .pdf, .docx)"}
        </button>
      </div>

      {isError && (
        <div className="mt-4 text-red-400 bg-red-900 border border-red-700 px-4 py-2 rounded-lg">
          Lỗi: {error?.message || "Không thể kết nối đến máy chủ."}
        </div>
      )}
    </div>
  );
}
