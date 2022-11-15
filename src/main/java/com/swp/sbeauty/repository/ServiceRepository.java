package com.swp.sbeauty.repository;

import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    @Query(value = "select s from Service s where s.name like %?1%")
    Page<Service> getListServiceWithPaginationAndSearch(String name, Pageable pageable);

    @Query(value = "select s from Service s join Course_Service_Mapping csm on s.id = csm.service_id where csm.course_id = ?1 ")
    List<Service> getServiceByCourseId(Long id);

    Service getServiceById(Long id);

    Boolean existsByName(String name);

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
    List<Service> getAllService(Long idBranch, Long idCustomer);

    @Query(value = "select * from service where service.name like %?1%", nativeQuery = true)
    List<Service> findService(String keyword);
}
