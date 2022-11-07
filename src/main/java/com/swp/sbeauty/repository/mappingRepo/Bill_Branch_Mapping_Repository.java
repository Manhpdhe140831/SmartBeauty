package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.mapping.Bill_Branch_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface Bill_Branch_Mapping_Repository extends JpaRepository<Bill_Branch_Mapping, Long> {

    @Query("SELECT b from Branch b join Bill_Branch_Mapping bbm on bbm.branch_id = b.id where bbm.bill_id =?1")
    public Branch getBranchByBill(Long id);
}
