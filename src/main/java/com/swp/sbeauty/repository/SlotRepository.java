package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SlotRepository extends JpaRepository<Slot,Long> {
    @Query(value = "select s.* from slot s , slot_branch_mapping sb where s.id = sb.id_slot and sb.id_branch =?1",nativeQuery = true)
    List<Slot> getAllSlotByBranch(Long idBranch);
}
