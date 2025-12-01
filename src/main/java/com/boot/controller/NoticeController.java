package com.boot.controller;

import com.boot.dto.*;
import com.boot.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {

    private final NoticeService noticeService;

    /**
     * 1. 공지사항 목록 조회 및 관리자 권한 반환
     */
    @GetMapping("/list")
    public Map<String, Object> list(Criteria cri, HttpSession session) {
        String role = (String) session.getAttribute("ROLE");
        boolean isAdmin = "ADMIN".equals(role);

        return Map.of(
                "list", noticeService.getNoticeList(cri),
                "pageMaker", new PagingDTO(noticeService.getTotalCount(cri), cri),
                "isAdmin", isAdmin
        );
    }

    /**
     * 2. 공지사항 상세 조회 및 조회수 증가 (비관리자일 경우)
     */
    @GetMapping("/view/{no}")
    public Map<String, Object> detail(@PathVariable Long no, HttpSession session) {
        String role = (String) session.getAttribute("ROLE");

        // ADMIN이 아닐 경우에만 조회수 증가
        if (!"ADMIN".equals(role)) {
            noticeService.increaseViews(no);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("view", noticeService.getNoticeById(no));
        response.put("role", role != null ? role : "USER");
        response.put("pageMaker", null);
        return response;
    }

    /**
     * 3. 공지사항 작성 권한 체크 (ADMIN만 허용)
     */
    @GetMapping("/write/auth")
    public ResponseEntity<Void> checkWriteAuth(HttpSession session) {
        if (!"ADMIN".equals(session.getAttribute("ROLE"))) {
            return ResponseEntity.status(403).build(); // 권한 없음
        }
        return ResponseEntity.ok().build(); // 권한 있음
    }

    /**
     * 4. 공지사항 작성 처리 (ADMIN만 허용)
     */
    @PostMapping("/write")
    public ResponseEntity<String> write(@RequestBody NoticeDTO notice, HttpSession session) {
        if (!"ADMIN".equals(session.getAttribute("ROLE"))) {
            return ResponseEntity.status(403).body("권한 없음");
        }
        noticeService.writeNotice(notice);
        return ResponseEntity.ok("success");
    }

    /**
     * 5. 공지사항 수정 폼 데이터 불러오기 (ADMIN만 허용)
     */
    @GetMapping("/modify/{no}")
    public Map<String, Object> getModifyForm(@PathVariable Long no, Criteria cri) {

        Map<String, Object> response = new HashMap<>();
        response.put("notice", noticeService.getNoticeById(no));
        response.put("pageMaker", new PagingDTO(noticeService.getTotalCount(cri), cri));
        return response;
    }

    /**
     * 6. 공지사항 수정 처리 (ADMIN만 허용)
     */
    @PutMapping("/modify/{no}")
    public ResponseEntity<String> modify(
            @PathVariable Long no,
            @RequestBody NoticeDTO notice,
            HttpSession session) {

        if (!"ADMIN".equals(session.getAttribute("ROLE"))) {
            return ResponseEntity.status(403).body("권한 없음");
        }

        notice.setNotice_no(no);
        noticeService.updateNotice(notice);
        return ResponseEntity.ok("success");
    }

    /**
     * 7. 공지사항 삭제 처리 (ADMIN만 허용)
     */
    @DeleteMapping("/view/{no}")
    public ResponseEntity<String> delete(@PathVariable Long no, HttpSession session) {
        if (!"ADMIN".equals(session.getAttribute("ROLE"))) {
            return ResponseEntity.status(403).body("권한 없음");
        }
        noticeService.deleteNotice(no);
        return ResponseEntity.ok("success");
    }
}