package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Bill_Service_History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Bill_Service_History_Repository extends JpaRepository<Bill_Service_History, Long> {
    @Query(value = "select s.* from bill_service_history s, customer_course_mapping cc, bill b, bill_customer_mapping bc, customer c , customer_branch_mapping cb\n" +
            "where s.id = cc.service_id\n" +
            "and cc.bill_id = b.id\n" +
            "and b.id = bc.bill_id\n" +
            "and bc.customer_id = c.id\n" +
            "and c.id = cb.id_customer\n" +
            "and cb.id = ?1\n" +
            "and c.id =?2\n" +
            "and b.status IN('dathanhtoan')\n" +
            "and cc.status IN('chuasudung')", nativeQuery = true)
    List<Bill_Service_History> getAllServiceBuyed(Long idBranch, Long idCustomer);
}
