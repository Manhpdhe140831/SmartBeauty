package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.SpaBedDto;
import com.swp.sbeauty.entity.SpaBed;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.SpaBedRepository;
import com.swp.sbeauty.service.SpaBedService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

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
        return null;
    }

    @Override
    public SpaBedDto updateBed(SpaBedDto spaBedDto, Long id) {
        return null;
    }
}
