package com.boot.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;

@Slf4j
@Component
public class SessionAuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain)
            throws ServletException, IOException {

        String uri = req.getRequestURI();
        String method = req.getMethod();

        // OPTIONS preflight → 무조건 통과
        if ("OPTIONS".equalsIgnoreCase(method)) {
            chain.doFilter(req, res);
            return;
        }

        log.info("🔥 SessionAuthFilter 실행됨: {} {}", method, uri);

        // 제외 URL이면 보안 검사 없이 통과
        if (isExcluded(uri)) {
            chain.doFilter(req, res);
            return;
        }

        // 보호 URL → 세션 필요
        HttpSession session = req.getSession(false);

        Object accountId = (session != null ? session.getAttribute("accountId") : null);
        Object storeId = (session != null ? session.getAttribute("storeId") : null);

        log.info("   ▶ 세션 accountId={}, storeId={}", accountId, storeId);

        if (accountId == null && storeId == null) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.setContentType("application/json;charset=UTF-8");
            res.getWriter().write("{\"success\":false,\"message\":\"로그인이 필요합니다.\"}");
            return;
        }

        chain.doFilter(req, res);
    }

    private boolean isExcluded(String uri) {

        // 1) 정적 리소스
        if (uri.startsWith("/css/") ||
            uri.startsWith("/js/") ||
            uri.startsWith("/images/") ||
            uri.equals("/favicon.ico") ||
            uri.equals("/error")) {
            return true;
        }

        // 2) JSP 접근 허용 (기존 기능 유지)
        if (uri.equals("/") ||
            uri.startsWith("/recommend") ||

            uri.startsWith("/login") ||
            uri.startsWith("/storeLogin") ||
            uri.startsWith("/register") ||
            uri.startsWith("/registerstore") ||

            uri.startsWith("/findAccount") ||
            uri.startsWith("/findPW") ||
            uri.startsWith("/findOK") ||

            uri.startsWith("/notice/list") ||
            uri.startsWith("/notice/view") ||

            (uri.startsWith("/faq") && 
             !uri.contains("write") && 
             !uri.contains("modify") && 
             !uri.contains("delete")) ||

            uri.startsWith("/guide") ||
            uri.startsWith("/autoSearch")) {
            return true;
        }

        // 3) React API용 공개 URL
        if (uri.startsWith("/api/register") ||        // 일반 회원가입
            uri.startsWith("/api/registerstore") ||   // 업체 회원가입
            uri.startsWith("/api/login") ||           // 로그인
            uri.startsWith("/api/storeLogin") ||      // 업체 로그인
            uri.startsWith("/api/findAccount") ||     // 아이디 찾기
            uri.startsWith("/api/findPW") ||          // 비번찾기
            uri.startsWith("/api/logout")) {          // 로그아웃
            return true;
        }

        // 4) 나머지 /api/** 는 보호 URL
        if (uri.startsWith("/api/")) {
            return false;
        }

        // 5) 기타 요청은 기본적으로 열어둠
        return true;
    }
}
