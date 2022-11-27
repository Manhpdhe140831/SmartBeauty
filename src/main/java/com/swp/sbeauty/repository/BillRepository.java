package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BillRepository extends JpaRepository<Bill, Long> {

    @Query(value = "select b from Bill b join Bill_Customer_Mapping bcm on bcm.bill_id = b.id where bcm.customer_id =?1")
    public Page<Bill> searchBillByCustomer(Long customerId, Pageable pageable);

    Bill getBillById(Long id);

    @Query(value = "SELECT b.* FROM bill b, bill_branch_mapping bbm where b.id = bbm.bill_id and bbm.branch_id = ?1 ORDER BY ?#{#pageable}",
            countQuery = "SELECT count(*) FROM bill b, bill_branch_mapping bbm where b.id = bbm.bill_id and bbm.branch_id = ?1",nativeQuery = true)
    Page<Bill> getAllBill(Long idBranch, Pageable pageable);
}
