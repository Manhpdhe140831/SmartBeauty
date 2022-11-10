package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.SpaBed;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SpaBedService {
    List<SpaBedDto> getBeds();
    SpaBedDto getById(Long id);
    SpaBedResponseDto getSpaBedAndSearch(String name, int pageNo, int pageSize);
    SpaBedResponseDto getAllSpaBed(int pageNo,int pageSize);
    String validateSpaBed(String name);
    Boolean saveSpaBed(String name, Long branch);
    Boolean updateSpaBed(Long id, String name, Long branch);
    List<SpaBedDto> getBedFree(Long idCheck, String date, Long slot);
}
