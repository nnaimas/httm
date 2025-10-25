import React from "react";
import { icons } from "./icons";

export default function Sidebar({ user, history, onNewSummary }) {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-gray-300 p-4 flex flex-col">
      <div className="flex items-center mb-6">
        {React.createElement(icons.layout, { className: "w-8 h-8 text-white" })}
        <span className="text-xl font-bold text-white ml-2">Summarizer</span>
      </div>

      <nav className="flex-grow">
        <ul>
          <li className="mb-2">
            <button
              onClick={onNewSummary}
              className="flex items-center w-full p-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
            >
              {React.createElement(icons.plus, { className: "w-5 h-5 mr-3" })}
              Tạo tóm tắt mới
            </button>
          </li>
        </ul>

        <h3 className="text-sm font-semibold text-gray-500 uppercase mt-6 mb-2">
          Tóm tắt gần đây
        </h3>
        <ul className="space-y-1 overflow-y-auto max-h-60">
          {history.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                className="block text-sm p-2 rounded-lg truncate hover:bg-gray-700 transition-colors"
                title={item.title}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <div className="flex items-center p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-600"
          />
          <span className="ml-3 font-medium text-white">{user.name}</span>
        </div>
      </div>
    </div>
  );
}
