package server.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class AIModelService {

    @Value("${ai.api.key}")
    private String apiKey;

    private final String aiEndpoint = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"; //dung api co san

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String requestSummaryText(String textToSummarize) {
        // kiem tra dau vao
        if (textToSummarize == null || textToSummarize.trim().length() < 100) {
            return "Lỗi: Văn bản quá ngắn để tóm tắt (cần ít nhất 100 ký tự).";
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("inputs", textToSummarize);
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("max_new_tokens", 200);
            requestBody.put("parameters", parameters);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(aiEndpoint, entity, String.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return parseResponse(response.getBody());
            } else {
                return "API lỗi: " + response.getStatusCode();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Lỗi khi gọi API: " + e.getMessage();
        }
    }

    private String parseResponse(String responseBody) {
        try {
            JsonNode root = objectMapper.readTree(responseBody);

            if (root.isArray() && root.size() > 0) {
                JsonNode first = root.get(0);
                if (first.has("summary_text")) {
                    return first.get("summary_text").asText().trim();
                }
            }

            if (root.has("error")) {
                return "Lỗi API: " + root.get("error").asText();
            }

            return "Không phân tích được output.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Lỗi khi đọc phản hồi.";
        }
    }
}