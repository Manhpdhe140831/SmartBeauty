package com.swp.sbeauty.repository;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.CustomerDto;
import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BillDetailRepository extends JpaRepository<BillDetail, Long> {

    @Query(value = "SELECT bd from BillDetail  bd join Bill_BillDetail_Mapping  bbm on bbm.billDetail_id = bd.id where bbm.bill_id = ?1")
    public List<BillDetail> getBillDetailByBillId(Long id);
    @Query(value = "SELECT p from Product p join BillDetail bd on p.id = bd.product_id where bd.id = ?1")
    public ProductDto getProductByBillDetail(Long id);
    @Query(value = "select s from Service s join BillDetail bd on s.id = bd.service_id where bd.id =?1")
    public ServiceDto getServiceByBillDetail(Long id);
    @Query(value = "select c from Course c join BillDetail  bd on c.id = bd.course_id where bd.id = ?1")
    public CourseDto getCourseByBillDetail(Long id);

    @Query(value = "select c.duration from Course c where c.id =?1")
    Integer getDuration(Long id);

//    @Query(value = "SELECT bph from Bill_Product_history bph where bph.productId =?1 and bph.billId =?2")
//    public Product getProductByBill(Long productId, Long billId);

//    @Query(value = "SELECT bsh from Bill_Service_History bsh where bsh.serviceId =?1 and bsh.billId =?2")
//    public Service getServiceByBill(Long serviceId, Long billId);
//
//    @Query(value = "SELECT bch from Bill_Course_History bch where bch.course_id =?1 and bch.billId =?2")
//    public Course getCourseByBill(Long courseId, Long billId);
    @Query(value = "SELECT bph from Bill_BillDetail_Mapping bbm join Bill_Product_history bph on bbm.billDetail_id = bph.billDetail_id where bph.billDetail_id =?1")
    public Bill_Product_history getBillProductHistory(Long billId);
    @Query(value = "SELECT bsh from Bill_BillDetail_Mapping bbm join Bill_Service_History bsh on bbm.billDetail_id = bsh.billDetail_id where bsh.billDetail_id =?1")
    public Bill_Service_History getBillServiceHistory(Long billId);


    @Query(value = "SELECT bch from Bill_BillDetail_Mapping bbm join Bill_Course_History bch on bbm.billDetail_id = bch.billDetail_id where bch.billDetail_id =?1")
    public Bill_Course_History getBillCourseHistory(Long billId);

}
