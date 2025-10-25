import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const summarizeApi = async ({ textInput, file, userId, modelId }) => {
  const formData = new FormData();
  formData.append("textInput", textInput || "");
  if (file) formData.append("file", file);
  formData.append("userId", userId);
  formData.append("modelId", modelId);

  const { data } = await axios.post(`${API_BASE_URL}/summarize`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
