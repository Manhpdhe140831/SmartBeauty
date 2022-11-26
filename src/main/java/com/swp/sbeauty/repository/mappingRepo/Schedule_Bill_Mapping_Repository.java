package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.mapping.Schedule_Bill_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface Schedule_Bill_Mapping_Repository extends JpaRepository<Schedule_Bill_Mapping, Long> {
    @Query(value = "select a from Schedule_Bill_Mapping a where a.id_schedule = ?1")
    Schedule_Bill_Mapping getSchedule_Bill_MappingById_schedule(Long scheduleId);
}
