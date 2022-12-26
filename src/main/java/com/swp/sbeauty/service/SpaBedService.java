package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.SpaBed;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SpaBedService {
    List<SpaBedDto> getBeds();
    SpaBedDto getById(Long id);
    SpaBedResponseDto getSpaBedAndSearch(Long idCheck, String name, int pageNo, int pageSize);
    SpaBedResponseDto getAllSpaBed(Long idCheck, int pageNo,int pageSize);
    String updateSpaBed(SpaBedDto spaBedDto);

    StaffBedDto findStaffAndBedFree(Long idCheck,String date, Long idSlot);
    Boolean saveBed(SpaBedDto spaBedDto, String authHeader);

    Boolean delete(Long id);
}
