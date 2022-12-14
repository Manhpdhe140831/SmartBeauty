package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.mapping.Customer_Course_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Customer_Course_Mapping_Repository extends JpaRepository<Customer_Course_Mapping, Long> {
    @Query(value = "select b.* from customer_course_mapping b where b.customer_id = ?1 and b.course_id = ?2 and b.status ='2'", nativeQuery = true)
    Customer_Course_Mapping getCustomerCourse(Long idCustomer, Long idCourse);

    @Query(value = "select ccm from Customer_Course_Mapping ccm where ccm.customer_id =?1 and ccm.service_id =?2 and ccm.status ='2'")
    Customer_Course_Mapping getCustomerService(Long customerId, Long serviceId);

}
