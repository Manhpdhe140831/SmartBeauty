package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Bill_Course_History;
import com.swp.sbeauty.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Bill_Course_History_Repository extends JpaRepository<Bill_Course_History, Long> {
    @Query(value = "select s.* from bill_course_history s, bill_detail bd, customer_course_mapping ccm,bill_bill_detail_mapping bbd ,bill b, bill_customer_mapping bcm, customer c,customer_branch_mapping cb\n" +
            "where bd.id = s.bill_detail_id\n" +
            "and ccm.bill_detail_id = bd.id\n" +
            "and bd.id = bbd.bill_detail_id\n" +
            "and bbd.bill_id =b.id\n" +
            "and b.id = bcm.bill_id\n" +
            "and bcm.customer_id = c.id\n" +
            "and c.id = cb.id_customer\n" +
            "and cb.id_branch =?1\n" +
            "and c.id =?2\n" +
            "and b.status IN('dathanhtoan')\n" +
            "and ccm.status IN('chuasudung','dangsudung')", nativeQuery = true)
    List<Bill_Course_History> getCourseBuyed(Long idBranch, Long idCustomer);


    @Query(value = "select b.* from bill_course_history b where b.name like %?1% ", nativeQuery = true)
    List<Bill_Course_History> getCourseHistory(String keyword);

    /*@Query(value = "select b.* from bill_course_history b where b.id =?1)", nativeQuery = true)
    Bill_Course_History getById(Long keyword);*/
    Bill_Course_History getBill_Course_HistoriesById(Long id);

    @Query(value = "select bch from Bill_Course_History bch join Customer_Course_Mapping ccm on ccm.course_id = bch.course_id where ccm.id = ?1")
    public Bill_Course_History getBill_Course_HistoriesBySchedule(Long id);


}
