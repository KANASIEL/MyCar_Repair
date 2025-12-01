package com.boot.dao;

import com.boot.dto.Criteria;
import com.boot.dto.NoticeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeDAO {

    // 1. 목록 (Oracle 11g rownum 방식)
    List<NoticeDTO> getNoticeList(Criteria cri);

    // 2. 전체 개수
    int getTotalCount(Criteria cri);

    // 3. 상세 조회
    NoticeDTO getNoticeById(Long noticeNo);

    // 4. 등록
    void insertNotice(NoticeDTO notice);

    // 5. 수정
    int updateNotice(NoticeDTO notice);

    // 6. 삭제
    int deleteNotice(Long noticeNo);

    // 7. 조회수 증가
    void increaseViews(Long noticeNo);
}