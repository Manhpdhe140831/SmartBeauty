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

    @Query(value = "select co.* from bill_course_history co, customer_course_mapping cc, bill b, bill_customer_mapping bc, customer c, customer_branch_mapping cb\n" +
            "            where co.id = cc.course_id\n" +
            "            and cc.bill_id = b.id\n" +
            "            and b.id = bc.bill_id\n" +
            "            and bc.customer_id = c.id\n" +
            "            and c.id = cb.id_customer\n" +
            "            and cb.id_branch =?1\n" +
            "            and c.id =?2\n" +
            "            and b.status IN ('dathanhtoan')\n" +
            "            and cc.status IN ('chuasudung', 'dangsudung')", nativeQuery = true)
    List<Course> getCourseBuyed(Long idBranch, Long idCustomer);
}
