package com.swp.sbeauty.repository;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.CourseResponseDto;
import com.swp.sbeauty.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query(value = "SELECT c from Course c where c.name like %?1% or c.code like %?1% and c.deleted = true")
    public Page<Course> getListCoursePaginationAndSearch(String name, String code, Pageable pageable);

    @Query(value = "SELECT c FROM Course c where c.deleted = true")
    public Page<Course> getAll(Pageable pageable);


    @Query(value = "UPDATE Course c SET c.deleted = false ")
    public Boolean remove(Long id);


}
