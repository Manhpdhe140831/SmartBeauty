package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.BranchResponseDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Branch;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BranchService {
    List<BranchDto> getBranch();

    BranchDto getById(Long id);

    Boolean saveBranch(String name, String email, String phone, String address, Long manager,MultipartFile image);

    String validateBranch(String name, String email, String phone);

    Page<Branch> findBranchsPaginationAndSort(int offset,int pageSize);

    Page<Branch> findBranchsPaginationAndSearch(String name,String address,String phone,int offset,int pageSize);

    BranchResponseDto getBranchAndSearch(String name,String address,String phone,int pageNo,int pageSize);

    BranchResponseDto getAllBranch(int pageNo,int pageSize);

    Boolean updateBranch(Long id, String name, String email, String phone, String address, Long manager, MultipartFile image);
}
