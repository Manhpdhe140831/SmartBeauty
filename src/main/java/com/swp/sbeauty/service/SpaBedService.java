package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CategoryDto;
import com.swp.sbeauty.dto.SpaBedDto;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.SpaBed;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SpaBedService {
    List<SpaBedDto> getBeds();
    SpaBedDto saveBed(SpaBedDto spaBedDto);
    SpaBedDto getById(Long id);
    SpaBedDto updateBed(SpaBedDto spaBedDto, Long id);
    Page<SpaBed> getAllSpaBedPagination(int offset, int pageSize);
    Page<SpaBed> findSpaBedPaginationAndSearch(int offset,int pageSize,String name);
}
