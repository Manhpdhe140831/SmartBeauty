package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.service.BranchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
@Service @Transactional @Slf4j
public class BranchServiceImpl implements BranchService {
    @Autowired
    private BranchRepository branchRepository;

    @Override
    public List<BranchDto> getBranch() {
        List<Branch> list = branchRepository.findAll();
        List<BranchDto> result = new ArrayList<>();
        for (Branch branch :list){
            result.add(new BranchDto(branch));
        }
        return result;
    }

    @Override
    public BranchDto saveBranch(BranchDto branchDto) {
        return null;
    }

    @Override
    public BranchDto updateBranch(BranchDto branchDto, Long id) {
        return null;
    }
}
