package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Bill_Course_History;
import com.swp.sbeauty.entity.Schedule;
import com.swp.sbeauty.entity.mapping.Customer_Course_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    @Query(value = "select a.* from schedule a, schedule_branch_mapping b where a.id = b.id_schedule and b.id_branch = ?2 and a.date like %?1% and a.status != 0", nativeQuery = true)
    List<Schedule> getAllByDate(String date, Long idBranch);

    @Query(value = "select ccm from Customer_Course_Mapping ccm where ccm.customer_id =?1 and ccm.course_id =?2 and ccm.status='2'")
    Customer_Course_Mapping getCustomerCourseBySchedule(Long customerId, Long courseId);

    @Query(value = "select a.* from schedule a, schedule_branch_mapping b where a.id = b.id_schedule and b.id_branch = ?1", nativeQuery = true)
    List<Schedule> getAll(long longValue);

    @Query(value = "select a from Schedule a where a.courseHistoryId = ?1")
    List<Schedule> getScheduleCCM(Long ccm);
}
