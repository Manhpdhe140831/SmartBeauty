package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
    @Query(value = "SELECT c from Course c where c.name like %?1% or c.code like %?1%")
    public Page<Course> getListCoursePaginationAndSearch(String name, String code, Pageable pageable);
}
