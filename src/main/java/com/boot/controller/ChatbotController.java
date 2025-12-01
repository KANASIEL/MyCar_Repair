package com.boot.controller;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Value;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;
import com.google.gson.JsonArray;


import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import javax.annotation.PostConstruct;

@Slf4j
@RestController
@RequestMapping("/api/react/chat")
@CrossOrigin(origins = {"http://localhost:5173", "https://yourdomain.com"}, maxAge = 3600)
public class ChatbotController {

    // Spring Value로 API 키 로드
    @Value("${gemini.api.key:}")
    private String apiKey;

    private static final String GEMINI_API_URL = 
        "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

    // 애플리케이션 시작 시 키 로드 상태 로그 출력
    @PostConstruct
    public void logApiKeyStatus() {
        if (apiKey != null && !apiKey.trim().isEmpty()) {
            log.info("Gemini API 키 로드됨 (길이: {})", apiKey.trim().length());
        } else {
            log.warn("🚨 Gemini API 키가 로드되지 않았습니다. application.properties 확인 필요.");
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> handleChat(@RequestBody Map<String, String> request) {
        String userMessage = request.getOrDefault("message", "").trim();
        log.info("챗봇 요청 받음: {}", userMessage);

        String reply = callGemini(userMessage);
        return Map.of("response", reply);
    }

    private String callGemini(String message) {
        if (apiKey == null || apiKey.trim().isEmpty()) {
            return "Gemini API 키가 없습니다. application.properties에 GEMINI_API_KEY 넣어주세요.";
        }

        try {
            // 1. API 키 정리: 혹시 남아있을 수 있는 따옴표를 제거하여 URI 오류 방지
            String cleanedApiKey = apiKey.trim().replace("\"", ""); 
            
            String prompt = "너는 한국어로 친절한 자동차 정비소 AI 상담사야. 자연스럽고 친근하게 답변해줘. 질문: " + message;

            // 2. 프롬프트 내 따옴표 이스케이프: JSON 형식 파손 방지
            String requestBody = """
                {
                  "contents": [{
                    "role": "user",
                    "parts": [{ "text": "%s" }]
                  }],
                  "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 1024
                  }
                }
                """.formatted(prompt.replace("\"", "\\\""));

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(GEMINI_API_URL + "?key=" + cleanedApiKey))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            log.info("Gemini 응답 상태코드: {}", response.statusCode());

            if (response.statusCode() == 200) {
                JsonObject json = JsonParser.parseString(response.body()).getAsJsonObject();
                
                // 3. candidates 존재 여부 확인: NullPointerException 방지 (안전 필터 응답 처리)
                if (json.has("candidates")) {
                    String geminiText = json
                        .getAsJsonArray("candidates")
                        .get(0).getAsJsonObject()
                        .get("content").getAsJsonObject()
                        .getAsJsonArray("parts")
                        .get(0).getAsJsonObject()
                        .get("text").getAsString();
                    
                    return geminiText;
                } else if (json.has("promptFeedback")) {
                    // 콘텐츠가 차단된 경우 (candidates가 null인 경우)
                    String blockReason = "알 수 없음";
                    try {
                        blockReason = json.getAsJsonObject("promptFeedback").get("blockReason").getAsString();
                    } catch (Exception ignored) {
                        // promptFeedback이 없거나 형식이 다를 경우를 대비한 안전 장치
                    }
                    log.warn("Gemini 응답 차단됨. 사유: {}", blockReason);
                    return "죄송해요, 이 질문은 안전 문제로 답변드릴 수 없어요. 다른 질문을 해주세요. (차단 사유: " + blockReason + ")";
                } else {
                    log.warn("Gemini 응답에 'candidates'나 'promptFeedback'이 없습니다: {}", response.body());
                    return "죄송해요, AI 응답 형식이 예상과 달라 처리할 수 없었어요.";
                }

            } else {
                // 200이 아닌 다른 상태 코드 처리
                return "Gemini 오류: " + response.statusCode() + "\n" + response.body();
            }

        } catch (JsonSyntaxException e) {
            log.error("Gemini 응답 JSON 파싱 실패", e);
            return "죄송해요, AI가 이상한 응답을 줬어요. (JSON 파싱 오류)";
        } catch (Exception e) {
            log.error("Gemini 호출 실패", e);
            return "죄송해요, 지금 AI가 잠시 쉬고 있어요. 잠시 후 다시 시도해주세요.";
        }
    }
}