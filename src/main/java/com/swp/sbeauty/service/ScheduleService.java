package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ScheduleDto;

import java.util.List;

public interface ScheduleService {
    boolean updateCount(ScheduleDto scheduleDto);

    boolean save(ScheduleDto scheduleDto);

    ScheduleDto getScheduleById(Long id);

    boolean update(Long id, ScheduleDto scheduleDto);

    List<ScheduleDto> getAll();


}
