package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.SlotDto;
import com.swp.sbeauty.dto.StaffBedDto;
import com.swp.sbeauty.entity.Customer;
import com.swp.sbeauty.entity.Slot;
import com.swp.sbeauty.entity.mapping.Customer_Branch_Mapping;
import com.swp.sbeauty.entity.mapping.Slot_Branch_Mapping;
import com.swp.sbeauty.repository.SlotRepository;
import com.swp.sbeauty.repository.mappingRepo.Service_Branch_Mapping_Repo;
import com.swp.sbeauty.repository.mappingRepo.Slot_Branch_Mapping_Repo;
import com.swp.sbeauty.repository.mappingRepo.User_Branch_Mapping_Repo;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.SlotService;
import io.jsonwebtoken.Claims;
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
    JwtUtils jwtUtils;
    @Autowired
    Service_Branch_Mapping_Repo service_branch_mapping_repo;

    @Autowired
    User_Branch_Mapping_Repo user_branch_mapping_repo;

    @Autowired
    Slot_Branch_Mapping_Repo slot_branch_mapping;

    @Override
    public List<SlotDto> getAllSlot() {
        List<Slot> slots = repository.findAll();
        List<SlotDto> slotDtos = new ArrayList<>();
        for (Slot slot : slots) {
            slotDtos.add(new SlotDto(slot));
        }
        return slotDtos;
    }

    @Override
    public Boolean saveSlot(SlotDto slotDto, String authHeader) {
        try {

            Slot slot = new Slot();

            if (slotDto.getName() != null) {
                slot.setName(slotDto.getName());
            }
            slot.setTimeline(slotDto.getTimeline());
            slot = repository.save(slot);
            Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
            Long idStaff = Long.parseLong(temp.get("id").toString());
            Long idBranch = user_branch_mapping_repo.idBranch(idStaff);
            slot_branch_mapping.save(new Slot_Branch_Mapping(slot.getId(), idBranch));
            return true;
        } catch (Exception e) {
            return false;
        }
    }


}
