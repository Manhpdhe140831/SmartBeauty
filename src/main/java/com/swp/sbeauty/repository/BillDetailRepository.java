package com.swp.sbeauty.repository;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.CustomerDto;
import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.BillDetail;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillDetailRepository extends JpaRepository<BillDetail, Long> {

    @Query(value = "SELECT bd from BillDetail  bd join Bill_BillDetail_Mapping  bbm on bbm.billDetail_id = bd.id where bbm.bill_id = ?1")
    public List<BillDetail> getBillDetailByBillId(Long id);
    @Query(value = "SELECT p from Product p join BillDetail bd on p.id = bd.product_id where bd.id = ?1")
    public ProductDto getProductByBillDetail(Long id);
    @Query(value = "select s from Service s join BillDetail bd on s.id = bd.service_id where bd.id =?1")
    public ServiceDto getServiceByBillDetail(Long id);
    @Query(value = "select c from Course c join BillDetail  bd on c.id = bd.course_id where bd.id = ?1")
    public CourseDto getCourseByBillDetail(Long id);

    @Query(value = "select c.timeOfUse from Course c where c.id =?1")
    Integer getTimeOfUse(Long id);

    @Query(value = "SELECT p from Product p where p.id = ?1")
    public Product getProductByBill(Long id);

    @Query(value = "SELECT s from Service s where s.id =?1")
    public Service getServiceByBill(Long id);

    @Query(value = "SELECT c from Course c where c.id =?1")
    public Course getCourseByBill(Long id);
}
