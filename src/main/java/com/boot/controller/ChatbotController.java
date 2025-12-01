package com.boot.controller;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Value;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement; // 🚨 이 줄을 추가해야 합니다.

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

        // response를 try 블록 밖에서 선언하여 catch 블록에서 접근 가능하게 유지
        HttpResponse<String> response;
        try {
            // 1. API 키 정리: 혹시 남아있을 수 있는 따옴표를 제거하여 URI 오류 방지
            String cleanedApiKey = apiKey.trim().replace("\"", "");

            // 🚨 maxOutputTokens를 2048로 늘려 이전의 MAX_TOKENS 오류 방지
            String prompt = "너는 한국어로 친절한 자동차 정비소 AI 상담사야. 자연스럽고 친근하게 답변해줘. 질문: " + message;
            String requestBody = """
                {
                  "contents": [{
                    "role": "user",
                    "parts": [{ "text": "%s" }]
                  }],
                  "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 2048
                  }
                }
                """.formatted(prompt.replace("\"", "\\\""));

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(GEMINI_API_URL + "?key=" + cleanedApiKey))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // 응답 본문이 비어있는지 확인
            if (response.body() == null || response.body().trim().isEmpty()) {
                log.error("Gemini API로부터 빈 응답을 받았습니다. 상태 코드: {}", response.statusCode());
                return "죄송해요, AI 서비스에 일시적인 문제가 발생했어요. 잠시 후 다시 시도해주세요.";
            }

            log.info("Gemini 응답 상태코드: {}", response.statusCode());

            // 200이 아닌 경우 에러 처리
            if (response.statusCode() != 200) {
                log.error("Gemini API 오류 응답: {}", response.body());
                return "죄송해요, AI 서비스에 일시적인 문제가 발생했어요. (에러 코드: " + response.statusCode() + ")";
            }

            String responseBody = response.body();
            log.info("Gemini 응답 본문: {}", responseBody); // 응답 본문 전체 로깅 추가

            // 내부 JSON 파싱 및 데이터 추출 로직 시작
            try {
                // JSON 파싱 전에 유효성 검사
                if (responseBody == null || responseBody.trim().isEmpty()) {
                    log.error("빈 응답 본문을 받았습니다.");
                    return "죄송해요, AI로부터 유효한 응답을 받지 못했어요.";
                }

                JsonElement jsonElement = JsonParser.parseString(responseBody);

                if (jsonElement == null || !jsonElement.isJsonObject()) {
                    log.error("유효한 JSON 객체가 아닙니다: {}", responseBody);
                    return "죄송해요, AI 응답 형식이 올바르지 않아요.";
                }

                JsonObject json = jsonElement.getAsJsonObject();

                // 1. candidates 배열 확인
                if (json.has("candidates") && json.get("candidates").isJsonArray()) {
                    JsonArray candidates = json.getAsJsonArray("candidates");
                    if (!candidates.isEmpty()) {
                        JsonObject firstCandidate = candidates.get(0).getAsJsonObject();

                        // 1.5. finish reason 확인 및 처리
                        if (firstCandidate.has("finishReason") && !firstCandidate.get("finishReason").isJsonNull()) {
                            String finishReason = firstCandidate.get("finishReason").getAsString();
                            log.warn("Gemini 응답이 완료 사유로 중단되었습니다. finishReason: {}", finishReason);

                            if ("MAX_TOKENS".equals(finishReason)) {
                                return "죄송해요, 답변이 너무 길어 중단되었습니다. 더 간결하게 질문해 주시겠어요?";
                            } else if ("SAFETY".equals(finishReason)) {
                                return "죄송해요, 안전 문제로 답변을 완성할 수 없습니다. 다른 질문을 해주세요.";
                            }
                            // finishReason이 STOP이거나 다른 이유라도, content가 있으면 계속 파싱 시도
                        }

                        // 2. content 객체 확인
                        if (firstCandidate.has("content") && firstCandidate.get("content").isJsonObject()) {
                            JsonObject content = firstCandidate.getAsJsonObject("content");

                            // 3. parts 배열 확인
                            if (content.has("parts") && content.get("parts").isJsonArray()) {
                                JsonArray parts = content.getAsJsonArray("parts");
                                if (!parts.isEmpty()) {
                                    JsonObject firstPart = parts.get(0).getAsJsonObject();

                                    // 4. text 필드 확인
                                    if (firstPart.has("text") && !firstPart.get("text").isJsonNull()) {
                                        return firstPart.get("text").getAsString();
                                    } else {
                                        log.warn("text 필드를 찾을 수 없습니다. firstPart: {}", firstPart);
                                        return "죄송해요, AI가 답변을 생성하는 데 실패했어요. (텍스트 없음)";
                                    }
                                } else {
                                    log.warn("parts 배열이 비어있습니다.");
                                    return "죄송해요, AI가 답변을 생성하는 데 실패했어요. (응답 형식 오류)";
                                }
                            } else {
                                log.warn("parts 배열을 찾을 수 없습니다. content: {}", content);
                                return "죄송해요, AI가 답변을 생성하는 데 실패했어요. (응답 형식 오류)";
                            }
                        } else {
                            log.warn("content 객체를 찾을 수 없습니다. firstCandidate: {}", firstCandidate);
                            return "죄송해요, AI가 답변을 생성하는 데 실패했어요. (응답 형식 오류)";
                        }
                    } else {
                        log.warn("candidates 배열이 비어있습니다.");

                        // promptFeedback이 있는지 확인 (차단된 경우)
                        if (json.has("promptFeedback") && json.get("promptFeedback").isJsonObject()) {
                            JsonObject feedback = json.getAsJsonObject("promptFeedback");
                            String blockReason = feedback.has("blockReason") ?
                                    feedback.get("blockReason").getAsString() : "알 수 없음";
                            log.warn("Gemini 응답이 차단되었습니다. 사유: {}", blockReason);
                            return "죄송해요, 이 질문은 안전 문제로 답변드릴 수 없어요. (차단 사유: " + blockReason + ")";
                        }
                        return "죄송해요, AI가 답변을 생성하는 데 실패했어요. (응답 형식 오류)";
                    }
                } else {
                    log.warn("candidates 배열을 찾을 수 없습니다. 응답: {}", json);
                    return "죄송해요, AI가 답변을 생성하는 데 실패했어요. (응답 형식 오류)";
                }
            } catch (JsonSyntaxException e) {
                log.error("Gemini 응답 파싱 중 JSON 구문 오류 발생: {}", e.getMessage());
                log.debug("문제가 있는 응답 본문: {}", responseBody);
                return "죄송해요, AI 응답을 처리하는 중 오류가 발생했어요. (데이터 형식 오류)";
            } catch (Exception e) {
                log.error("Gemini 응답 처리 중 예상치 못한 오류 발생: {}", e.getMessage(), e);
                log.debug("오류 응답 본문: {}", responseBody != null ? responseBody : "null");
                return "죄송해요, 예상치 못한 오류가 발생했어요. 잠시 후 다시 시도해주세요.";
            }

            // HTTP 통신 및 기타 IO 오류 처리
        } catch (Exception e) {
            log.error("Gemini 호출 실패 (네트워크 또는 기타 IO 오류)", e);
            return "죄송해요, 지금 AI가 잠시 쉬고 있어요. 잠시 후 다시 시도해주세요.";
        }
    }
}