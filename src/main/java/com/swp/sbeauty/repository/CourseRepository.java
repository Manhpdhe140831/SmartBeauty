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
    @Query(value = "SELECT c from Course c where c.name like %?1% or c.code like %?1%")
    public Page<Course> getListCoursePaginationAndSearch(String name, String code, Pageable pageable);

    Boolean existsByName(String name);
    Course getCourseById(Long id);

    @Query(value = "select s.* from bill_course_history s, bill_detail bd, customer_course_mapping ccm,bill_bill_detail_mapping bbd ,bill b, bill_customer_mapping bcm, customer c,customer_branch_mapping cb\n" +
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
            "and ccm.status IN('chuasudung','dangsudung')", nativeQuery = true)
    List<Course> getCourseBuyed(Long idBranch, Long idCustomer);

    @Query(value = "select * from course where course.name like %?1%", nativeQuery = true)
    List<Course> findCourse(String keyword);
}
