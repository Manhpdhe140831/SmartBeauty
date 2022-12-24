package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Course_Service_Mapping;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Course_Service_Mapping_Repository extends JpaRepository<Course_Service_Mapping, Long> {

//    @Query(value = "DELETE from Course_Service_Mapping csm WHERE csm.service_id = ?1");
//    public Boolean remove

    @Query(value = "SELECT csm From Course_Service_Mapping csm where csm.course_id = ?1")
    List<Course_Service_Mapping> getMappingById(Long id);

    @Query(value = "select c.service_id from sbeauty.course_service_mapping as c join sbeauty.service as s where c.service_id = s.id and c.course_id = ?1 and s.is_delete is null", nativeQuery = true)
    public List<Long> getMappingByIdCourse(Long id);






}
