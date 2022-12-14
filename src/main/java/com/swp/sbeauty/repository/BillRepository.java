package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BillRepository extends JpaRepository<Bill, Long> {
    @Query(value = "select b from Bill b join Bill_Customer_Mapping bcm on bcm.bill_id = b.id where bcm.customer_id =?1")
    Page<Bill> searchBillByCustomer(Long customerId, Pageable pageable);

    Bill getBillById(Long id);

    @Query(value = "SELECT b.* FROM bill b, bill_branch_mapping bbm where b.id = bbm.bill_id and bbm.branch_id = ?1 order by b.create_date desc",
            countQuery = "SELECT count(*) FROM bill b, bill_branch_mapping bbm where b.id = bbm.bill_id and bbm.branch_id = ?1",nativeQuery = true)
    Page<Bill> getAllBill(Long idBranch, Pageable pageable);

    @Query(value = "select b.* from Bill b, Bill_Customer_Mapping bcm, customer_branch_mapping cbm, customer c  where bcm.bill_id = b.id and cbm.id_customer = bcm.customer_id and cbm.id_customer = c.id and cbm.id_branch =?1 and c.name like %?2% order by b.create_date desc",
            countQuery = "SELECT count(*) from Bill b, Bill_Customer_Mapping bcm, customer_branch_mapping cbm, customer c  where bcm.bill_id = b.id and cbm.id_customer = bcm.customer_id and cbm.id_customer = c.id and cbm.id_branch =?1 and c.name like %?2%",nativeQuery = true)
    Page<Bill> getBillAndSearch(Long idBranch,String keyword, Pageable pageable);


    @Query(value = "select a from Bill a, Schedule_Bill_Mapping b where a.id = b.id_bill and b.id_schedule =?1")
    Bill getBillBySchedule(Long idSchedule);
}
