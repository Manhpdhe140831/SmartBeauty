package com.swp.sbeauty.repository;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Branch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchRepository extends JpaRepository<Branch,Long> {
    Long countByPhone(String phone);
    @Query(value = "select a.* from `branch` a " , nativeQuery = true)
    Page<Branch> getBranchByFilter(String search, String address, Pageable pageable);
}
