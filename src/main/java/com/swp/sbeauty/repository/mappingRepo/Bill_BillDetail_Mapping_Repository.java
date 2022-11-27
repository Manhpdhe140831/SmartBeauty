package com.swp.sbeauty.repository.mappingRepo;


import com.swp.sbeauty.entity.mapping.Bill_BillDetail_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Bill_BillDetail_Mapping_Repository extends JpaRepository<Bill_BillDetail_Mapping,Long> {
    @Query(value = "select bbm from Bill_BillDetail_Mapping bbm where bbm.bill_id =?1")
    List<Bill_BillDetail_Mapping> getByBillId(Long id);

    @Query(value = "select bbm from Bill_BillDetail_Mapping bbm where bbm.billDetail_id =?1")
    Bill_BillDetail_Mapping getByBillDetailId(Long id);
}
