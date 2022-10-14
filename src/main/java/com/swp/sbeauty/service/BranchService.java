package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.BranchDto;

import java.util.List;

public interface BranchService {
    List<BranchDto> getBranch();


    BranchDto saveBranch(BranchDto branchDto);

    BranchDto updateBranch(BranchDto branchDto, Long id);
}
