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

    @Query(value = "select s from Service s where s.name like %:name% and s.isDelete is null")
    Page<Service> getListServiceWithPaginationAndSearch(String name, Pageable pageable);

    @Query(value = "select s from Service s join Course_Service_Mapping csm on s.id = csm.service_id where csm.course_id = ?1 and s.isDelete is null ")
    List<Service> getServiceByCourseId(Long id);

    Service getServiceById(Long id);

    Boolean existsByName(String name);

    @Query(value = "select s.* from bill_service_history s, bill_detail bd, customer_course_mapping ccm,bill_bill_detail_mapping bbd ,bill b, bill_customer_mapping bcm, customer c,customer_branch_mapping cb\n" +
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
            "and ccm.status IN('chuasudung')", nativeQuery = true)
    List<Service> getAllService(Long idBranch, Long idCustomer);

    @Query(value = "select * from service where service.name like %?1%", nativeQuery = true)
    List<Service> findService(String keyword);

    @Query(value = "select s from Service s where s.isDelete is null")
    Page<Service> getAllService(Pageable pageable);
}
