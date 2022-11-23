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



    @Query(value = "select s from Schedule s where s.date = ?1")
    public List<Schedule> getAllByDate(String date);


    @Query(value = "select ccm from Customer_Course_Mapping ccm where ccm.customer_id = ?1 and ccm.course_id = ?2 and ccm.status = 'using' or ccm.status = 'not yet'" )
    public Customer_Course_Mapping getCustomerCourseBySchedule(Long customerId, Long courseId);

}
