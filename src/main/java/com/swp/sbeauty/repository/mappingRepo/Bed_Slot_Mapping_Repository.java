package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.mapping.Bed_Slot_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface Bed_Slot_Mapping_Repository extends JpaRepository<Bed_Slot_Mapping, Long> {
    @Query(value = "select bsm from Bed_Slot_Mapping bsm where bsm.id_spaBed =?1 and bsm.id_slot = ?2 and bsm.date =?3")
    Bed_Slot_Mapping getBed_Slot_MappingBySchedule(Long bedId, Long slotId, String date);

    @Query(value = "select a from Bed_Slot_Mapping a where a.id_schedule = ?1")
    Bed_Slot_Mapping getBed_Slot_MappingById_schedule(Long id);
}
