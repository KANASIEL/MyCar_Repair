package com.boot.service;

import java.util.List;
import com.boot.dto.AccountDTO;
import com.boot.dto.Criteria;
import com.boot.dto.StoreDTO;

public interface Mypage_AdminService {

    // 1. 회원 관리

    /** 회원 목록 조회 (페이징 적용) */
    // DAO와 일관성을 위해 getAllUsersWithPaging 사용을 권장하지만, 기존 이름을 유지합니다.
    List<AccountDTO> getAllUsers(Criteria cri);

    /** 회원 전체 수 조회 */
    // DAO와 일관성을 위해 getTotalUserCount 사용
    int getTotalUserCount(Criteria cri);


    // 2. 업체 관리 (페이징 추가)

    /** 정비업체 승인 대기 목록 조회 (페이징 적용) */
    // 기존 getPendingStores()를 Criteria를 받는 메서드로 확장
    List<StoreDTO> getPendingStoresWithPaging(Criteria cri);

    /** 승인 대기중인 업체 전체 개수 조회 (storePageMaker 계산용) */
    int countPendingStores(Criteria cri);


    // 3. 상태 업데이트 및 권한

    /** 계정 상태 업데이트 (정지/복구/삭제) */
    void updateAccountStatus(String accountId, String status);

    /** 업체 상태 업데이트 (승인/거절) */
    void updateStoreStatus(String storeId, String status);

    /** 관리자 권한 해제 */
    void downgradeAdmin(String accountId);
}