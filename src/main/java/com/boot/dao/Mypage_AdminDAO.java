package com.boot.dao;

import java.util.List;

import com.boot.dto.Criteria;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.boot.dto.AccountDTO;
import com.boot.dto.StoreDTO;

@Mapper
public interface Mypage_AdminDAO {

    // 1. 회원 관리

    // (이전: List<AccountDTO> getAllUsers(Criteria cri);)
    // XML의 ID와 일치시키기 위해 Paging이 적용된 쿼리를 사용하며 이름을 변경함
    List<AccountDTO> getAllUsersWithPaging(Criteria cri);

    // 회원 전체 수 (getTotalUserCount로 이름 일치)
    int getTotalUserCount(Criteria cri);


    // 2. 업체 관리 (페이징 적용)

    // (이전: List<StoreDTO> getPendingStores(Criteria cri);)
    // XML ID와 일치
    List<StoreDTO> getPendingStoresWithPaging(Criteria cri);

    // (이전: int countPendingStores(Criteria cri);)
    // XML ID와 일치
    int countPendingStores(Criteria cri);


    // 3. 상태 업데이트 메서드 (기존 유지)
    void updateAccountStatus(@Param("accountId") String accountId,
                             @Param("status") String status);

    void updateStoreStatus(@Param("storeId") String storeId,
                           @Param("status") String status);

    // 4. 권한 업데이트 메서드 (기존 유지)
    void updateAccountRole(@Param("accountId") String accountId,
                           @Param("role") String role);
}