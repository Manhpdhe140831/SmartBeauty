package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Bill_Course_History;
import com.swp.sbeauty.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Bill_Course_History_Repository extends JpaRepository<Bill_Course_History, Long> {
    @Query(value = "select co.* from bill_course_history co, customer_course_mapping cc, bill b, bill_customer_mapping bc, customer c, customer_branch_mapping cb\n" +
            "            where co.id = cc.course_id\n" +
            "            and cc.bill_id = b.id\n" +
            "            and b.id = bc.bill_id\n" +
            "            and bc.customer_id = c.id\n" +
            "            and c.id = cb.id_customer\n" +
            "            and cb.id_branch =?1\n" +
            "            and c.id =?2\n" +
            "            and b.status IN ('dathanhtoan')\n" +
            "            and cc.status IN ('chuasudung', 'dangsudung')", nativeQuery = true)
    List<Bill_Course_History> getCourseBuyed(Long idBranch, Long idCustomer);
}
