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
    List<BillDetail> getBillDetailByBillId(Long id);
    @Query(value = "SELECT p from Product p join BillDetail bd on p.id = bd.product_id where bd.id = ?1")
    ProductDto getProductByBillDetail(Long id);
    @Query(value = "select s from Service s join BillDetail bd on s.id = bd.service_id where bd.id =?1")
    ServiceDto getServiceByBillDetail(Long id);
    @Query(value = "select c from Course c join BillDetail  bd on c.id = bd.course_id where bd.id = ?1")
    CourseDto getCourseByBillDetail(Long id);

    @Query(value = "SELECT bph from Bill_BillDetail_Mapping bbm join Bill_Product_history bph on bbm.billDetail_id = bph.billDetail_id where bph.billDetail_id =?1")
    Bill_Product_history getBillProductHistory(Long billId);

    @Query(value = "select c.* from bill a, bill_bill_detail_mapping b, bill_detail c where a.id = b.bill_id and b.bill_detail_id = c.id and c.product_id is not null and a.id =?1", nativeQuery = true)
    List<BillDetail> getAddons(Long idBill);
}
