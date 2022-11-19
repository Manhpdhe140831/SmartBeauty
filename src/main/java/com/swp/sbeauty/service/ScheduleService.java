package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ScheduleDto;

public interface ScheduleService {
    boolean updateCount(ScheduleDto scheduleDto);

    boolean save(ScheduleDto scheduleDto);

    ScheduleDto getScheduleById(Long id);



}
