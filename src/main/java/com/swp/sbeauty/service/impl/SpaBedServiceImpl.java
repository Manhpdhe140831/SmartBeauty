package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.CategoryDto;
import com.swp.sbeauty.dto.SpaBedDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.SpaBed;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.SpaBedRepository;
import com.swp.sbeauty.service.SpaBedService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service @Transactional @Slf4j
public class SpaBedServiceImpl implements SpaBedService {
    @Autowired
    private SpaBedRepository spaBedRepository;
    @Autowired
    private BranchRepository branchRepository;

    @Override
    public List<SpaBedDto> getBeds() {
        List<SpaBed> list = spaBedRepository.findAll();
        List<SpaBedDto> result =new ArrayList<>();
        for(SpaBed spaBed : list){
            result.add(new SpaBedDto(spaBed));
        }
        return result;
    }

    @Override
    public SpaBedDto saveBed(SpaBedDto spaBedDto) {
        if(spaBedDto != null){
            SpaBed spaBed = new SpaBed();
            spaBed.setName(spaBedDto.getName());
            if(spaBedDto.getBranch()!=null){
                Branch branch = null;
                Optional<Branch> optional = branchRepository.findById(spaBedDto.getBranch().getId());
                if (optional.isPresent()) {
                    branch = optional.get();
                }
                spaBed.setBranch(branch);
            }
            spaBed = spaBedRepository.save(spaBed);
            if(spaBed != null){
                return new SpaBedDto(spaBed);
            }
        }
        return null;
    }

    @Override
    public SpaBedDto getById(Long id) {
        if (id != null) {
            SpaBed entity = spaBedRepository.findById(id).orElse(null);
            if (entity != null) {
                return new SpaBedDto(entity);
            }
        }
        return null;
    }

    @Override
    public SpaBedDto updateBed(SpaBedDto spaBedDto, Long id) {
        if(spaBedDto !=null){
            SpaBed spaBed = null;
            if(id !=null){
                Optional<SpaBed> optional =spaBedRepository.findById(id);
                if(optional.isPresent()){
                    spaBed = optional.get();
                }
            }
            if(spaBed != null){
                spaBed.setName(spaBedDto.getName());
                if(spaBedDto.getBranch()!=null){
                    Branch branch = null;
                    Optional<Branch> optional = branchRepository.findById(spaBedDto.getBranch().getId());
                    if (optional.isPresent()) {
                        branch = optional.get();
                    }
                    spaBed.setBranch(branch);
                }
                spaBed = spaBedRepository.save(spaBed);
                return new SpaBedDto(spaBed);
            } else {
                return null;
            }
        }
        return null;
    }

    @Override
    public Page<SpaBed> getAllSpaBedPagination(int offset, int pageSize) {
        Page<SpaBed> spaBeds =spaBedRepository.findAll(PageRequest.of(offset,pageSize));
        return spaBeds;
    }

    @Override
    public Page<SpaBed> findSpaBedPaginationAndSearch(int offset, int pageSize, String name) {
        Page<SpaBed> spaBeds =spaBedRepository.searchListWithField(name,PageRequest.of(offset,pageSize));
        return spaBeds;
    }
}
