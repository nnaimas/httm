import axios from "axios";

// Địa chỉ backend Java Spring Boot
const API_BASE_URL = "http://localhost:8080/api/summary";

export const summarizeApi = async (payload) => {
  const { textInput, file, userId, modelId } = payload;

  const formData = new FormData();

  // --- SỬA LỖI 400 (Missing Parameter) ---
  // Chuyển đổi ID sang String một cách tường minh
  // Điều này đảm bảo Spring Boot luôn nhận được chúng là String
  formData.append("userId", String(userId));
  formData.append("modelId", String(modelId || 1)); // Gán cứng model 1 nếu không chọn

  // Gửi các trường còn lại
  formData.append("textInput", textInput || "");

  // 2. Thêm file nếu tồn tại
  if (file) {
    formData.append("file", file);
  }

  // 3. Gọi API với FormData
  const { data } = await axios.post(
    `${API_BASE_URL}/summarize`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        // 'Authorization': 'Bearer ' + authToken
      },
    }
  );

  // Trả về 'SummaryResponse'
  return data;
};


