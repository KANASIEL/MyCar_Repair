package com.boot.service;

import com.boot.dao.NoticeDAO;
import com.boot.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// ServiceImpl (심플 끝판왕)
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeServiceImpl implements NoticeService {

    private final NoticeDAO noticeDAO;

    @Override
    public List<NoticeDTO> getNoticeList(Criteria cri) {
        return noticeDAO.getNoticeList(cri);
    }

    @Override
    public int getTotalCount(Criteria cri) {
        return noticeDAO.getTotalCount(cri);
    }

    @Override
    public NoticeDTO getNoticeById(Long noticeNo) {
        return noticeDAO.getNoticeById(noticeNo);
    }

    @Override
    @Transactional
    public void increaseViews(Long noticeNo) {
        noticeDAO.increaseViews(noticeNo);
    }

    @Override
    @Transactional
    public void writeNotice(NoticeDTO notice) {
        notice.setNotice_writer("관리자");  // 무조건 서버에서 강제 지정 → 위조 방지
        noticeDAO.insertNotice(notice);
    }

    @Override
    @Transactional
    public void updateNotice(NoticeDTO notice) {
        notice.setNotice_writer("관리자");  // 수정해도 작성자는 그대로
        int result = noticeDAO.updateNotice(notice);
        if (result == 0) throw new RuntimeException("수정 실패");
    }

    @Override
    @Transactional
    public void deleteNotice(Long noticeNo) {
        int result = noticeDAO.deleteNotice(noticeNo);
        if (result == 0) throw new RuntimeException("삭제 실패");
    }
}