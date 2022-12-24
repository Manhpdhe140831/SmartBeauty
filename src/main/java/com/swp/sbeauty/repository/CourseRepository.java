package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
    @Query(value = "SELECT c from Course c where c.name like %?1% or c.code like %?1% and c.isDelete is null")
    Page<Course> getListCoursePaginationAndSearch(String name, String code, Pageable pageable);

    Boolean existsByName(String name);
    Course getCourseById(Long id);

    @Query(value = "select c.* from course c where c.id != ?1 and c.name like %?2% ", nativeQuery = true)
    List<Course> getCourseExpelId(Long id, String keyword);

    @Query(value = "select c.* from course c where c.name like %?1% ", nativeQuery = true)
    List<Course> findCourses(String keyword);

    @Query(value = "SELECT c From Course c where c.isDelete is null")
    Page<Course> getAllCourse(Pageable pageable);

}
