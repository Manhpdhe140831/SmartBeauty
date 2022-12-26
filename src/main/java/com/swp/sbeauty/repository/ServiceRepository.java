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

    @Query(value = "select * from service where service.name like %?1% and service.is_delete is null", nativeQuery = true)
    List<Service> findService(String keyword);

    @Query(value = "select s from Service s where s.isDelete is null")
    Page<Service> getAllService(Pageable pageable);
}
