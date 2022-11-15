package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.SlotDto;
import com.swp.sbeauty.entity.Slot;
import com.swp.sbeauty.repository.SlotRepository;
import com.swp.sbeauty.repository.mappingRepo.Service_Branch_Mapping_Repo;
import com.swp.sbeauty.service.SlotService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
public class SlotServiceImpl implements SlotService {
    @Autowired
    SlotRepository repository;

    @Autowired
    Service_Branch_Mapping_Repo service_branch_mapping_repo;
    @Override
    public List<SlotDto> getAllSlot(Long idCheck) {
        if(idCheck==null){
            return null;
        } else {
            Long idBranch = service_branch_mapping_repo.idBranch(idCheck);
            List<Slot> slots = repository.getAllSlotByBranch(idBranch);
            List<SlotDto> slotDtos = new ArrayList<>();
            for (Slot slot : slots){
                slotDtos.add(new SlotDto(slot));
            }
            return slotDtos;
        }
    }
}
