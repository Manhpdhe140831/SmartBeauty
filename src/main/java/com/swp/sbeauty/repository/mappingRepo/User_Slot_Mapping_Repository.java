package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.mapping.User_Slot_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface User_Slot_Mapping_Repository extends JpaRepository<User_Slot_Mapping, Long> {

    @Query(value = "select usm from User_Slot_Mapping usm where usm.id_user =?1 and usm.id_slot =?2 and usm.date = ?3")
    public User_Slot_Mapping getUser_Slot_MappingBySchedule(Long userId, Long slotId, String date);

}
