package com.swp.sbeauty.repository;

import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    @Query(value = "select s, p, spm.productUsage from Service s join Service_Product_mapping  spm on s.id = spm.service_id join Product p on p.id = spm.product_id where s.id=?1")
    public ServiceDto getServiceById(Long id);

    @Query(value = "select s from Service s where s.name like %?1%")
    public Page<Service> getListServiceWithPaginationAndSearch(String name, Pageable pageable);

    @Query(value = "select s from Service s join Course_Service_Mapping csm on s.id = csm.service_id where csm.course_id = ?1 ")
    public List<Service> getServiceByCourseId(Long id);

}
