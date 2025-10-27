// Dữ liệu giả cho user
export const MOCK_USER = {
  name: "User 123",
  avatarUrl: "https://placehold.co/40x40/6366f1/ffffff?text=U",
};

// Dữ liệu giả cho lịch sử
export const MOCK_HISTORY = [
  { id: 1, title: "Tóm tắt gần đây" },
  { id: 2, title: "Tin tức hôm nay" },
  { id: 3, title: "Tìm kiếm và nghiên cứu..." },
];

// Dữ liệu giả cho kết quả (nếu API thất bại)
export const MOCK_RESULT = {
  original: "Đây là văn bản gốc... ".repeat(10),
  summary: "Đây là văn bản tóm tắt... ".repeat(5),
};
