package com.boot.service;

import java.util.List;

import com.boot.dto.Criteria;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.dao.Mypage_AdminDAO;
import com.boot.dto.AccountDTO;
import com.boot.dto.StoreDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class Mypage_AdminServiceImpl implements Mypage_AdminService {

    @Autowired
    private SqlSession sqlSession;

    // 1. 회원 목록 조회 (Paging 적용)
    @Override
    public List<AccountDTO> getAllUsers(Criteria cri) {
        log.info("@# getAllUsers() - {}", cri);
        // DAO의 getAllUsersWithPaging 메서드와 매핑 (DAO/Mapper에서 getAllUsersWithPaging로 정의)
        return sqlSession.getMapper(Mypage_AdminDAO.class).getAllUsersWithPaging(cri);
    }

    // 2. 업체 승인 대기 목록 조회 (Paging 적용)
    @Override
    public List<StoreDTO> getPendingStoresWithPaging(Criteria cri) {
        log.info("@# getPendingStoresWithPaging() - {}", cri);
        // DAO의 getPendingStoresWithPaging 메서드와 매핑
        return sqlSession.getMapper(Mypage_AdminDAO.class).getPendingStoresWithPaging(cri);
    }

    // 3. 계정/업체 상태 업데이트 (기존 유지)
    @Override
    public void updateAccountStatus(String accountId, String status) {
        log.info("@# updateAccountStatus({}, {})", accountId, status);
        sqlSession.getMapper(Mypage_AdminDAO.class).updateAccountStatus(accountId, status);
    }

    @Override
    public void updateStoreStatus(String storeId, String status) {
        log.info("@# updateStoreStatus({}, {})", storeId, status);
        sqlSession.getMapper(Mypage_AdminDAO.class).updateStoreStatus(storeId, status);
    }

    // 4. 관리자 권한 해제 (기존 유지)
    @Override
    public void downgradeAdmin(String accountId) {
        log.info("@# downgradeAdmin() - {}", accountId);
        sqlSession.getMapper(Mypage_AdminDAO.class).updateAccountRole(accountId, "USER");
    }

    // 5. 전체 개수 조회

    // 회원 전체 수 조회 (기존 유지)
    @Override
    public int getTotalUserCount(Criteria cri) {
        log.info("@# getTotalUserCount()");
        return sqlSession.getMapper(Mypage_AdminDAO.class).getTotalUserCount(cri);
    }

    // 6. 업체 전체 수 조회 (추가)
    @Override
    public int countPendingStores(Criteria cri) {
        log.info("@# countPendingStores()");
        return sqlSession.getMapper(Mypage_AdminDAO.class).countPendingStores(cri);
    }
}