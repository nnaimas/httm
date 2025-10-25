import { useMutation } from "@tanstack/react-query";
import { summarizeApi } from "../api/summaryApi";

export function useSummarizeMutation(onSuccess) {
  return useMutation(summarizeApi, {
    onSuccess,
  });
}
