package com.swp.sbeauty.repository;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchRepository extends JpaRepository<Branch,Long> {
    Long countByPhone(String phone);

    Boolean existsByAddress(String address);
    Boolean existsByName(String name);
    @Query(value = "select a.* from `branch` a " , nativeQuery = true)
    Page<Branch> getBranchByFilter(String search, String address, Pageable pageable);

    @Query(value = "SELECT b FROM Branch b where  " +
            "b.name like %?1% and b.address like %?2% and b.phone like %?3%")
    public Page<Branch> searchListWithField(String key,String key2,String key3, Pageable pageable);

    @Query(value = "select a.id_branch from user_branch_mapping a where id_user = ?1", nativeQuery = true)
    Integer getIdBranchByManager(Integer idManager);

    @Query(value = "select a.* from users a, user_branch_mapping b, user_role c where a.id = b.id_user and a.id = c.user_id and c.role_id=2 and b.id_branch = ?1", nativeQuery = true)
    UserDto getManagerFromBranch(Long inBranch);
}
