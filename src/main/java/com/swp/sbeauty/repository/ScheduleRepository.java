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

    @Query(value = "select ccm from Customer_Course_Mapping ccm where ccm.course_id =?1")
    public Customer_Course_Mapping getCustomerCourseBySchedule(Long id);

    @Query(value = "select bch from Bill_Course_History bch join Customer_Course_Mapping ccm on ccm.course_id = bch.course_id where ccm.id = ?1")
    public Bill_Course_History getBill_Course_HistoriesBySchedule(Long id);

    @Query(value = "select s from Schedule s where s.date = ?1")
    public List<Schedule> getAllByDate(String date);


    @Query(value = "select ccm from Customer_Course_Mapping ccm where ccm.customer_id = ?1 and ccm.course_id = ?2 and ccm.status = 'using'" )
    public Customer_Course_Mapping getCustomerCourseBySchedule(Long customerId, Long courseId);

}
