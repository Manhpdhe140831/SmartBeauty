package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.SpaBedDto;

import java.util.List;

public interface SpaBedService {
    List<SpaBedDto> getBeds();
    SpaBedDto saveBed(SpaBedDto spaBedDto);
    SpaBedDto updateBed(SpaBedDto spaBedDto, Long id);
}
