package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Branch;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BranchService {
    List<BranchDto> getBranch();
    List<Branch> findAllBranchs();
    BranchDto getById(Long id);
    List<Branch> findBranchsWithSorting(String field);

    /*List<RecruiterAdminDto> getRecruiterByName(String name, int pageNo, int pageSize);*/
    Boolean saveBranch(String name, String email, String phone, String address, Long manager);

    String validateBranch(String name, String email, String phone);

    BranchDto updateBranch(BranchDto branchDto, Long id);

    Page<Branch> findBranchsPaginationAndSort(int offset,int pageSize);
    Page<Branch> findBranchsPaginationAndSearch(String name,String address,String phone,int offset,int pageSize);


}
