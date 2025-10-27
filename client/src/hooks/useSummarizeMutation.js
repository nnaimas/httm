import { useMutation } from '@tanstack/react-query';
import { summarizeApi } from '../api/summaryApi';

/**
 * Hook tùy chỉnh cho việc tóm tắt
 * Khớp với `useSummarizeMutation` trong sơ đồ UML
 */
export const useSummarizeMutation = (onSuccessCallback) => {
  return useMutation(summarizeApi, {
    onSuccess: (data) => {
      // 'data' là 'SummaryResponse' từ API
      console.log("Summarization successful:", data);
      
      // Gọi hàm callback (truyền từ App.jsx) để cập nhật UI
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError: (error) => {
      console.error("Summarization error:", error);
      // Bạn có thể hiển thị thông báo lỗi ở đây
      alert("Lỗi tóm tắt: " + (error.response?.data?.message || error.message));
    }
  });
};
