package com.swp.sbeauty.entity.mapping;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Getter
@Setter
public class Customer_Course_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long billDetail_id;
    private Long customer_id;
    private Long service_id;
    private Long course_id;
    private String endDate;
    private Integer count;
    private String status; // dasudung-chuasudung-dangsudung

    public Customer_Course_Mapping() {
    }

    //cons luu service
    public Customer_Course_Mapping (Long billDetail_id, Long customer_id, Long service_id, String status){
        this.billDetail_id = billDetail_id;
        this.customer_id = customer_id;
        this.service_id = service_id;
        this.status = status;
    }

    //cons luu course
    public Customer_Course_Mapping(Long billDetail_id, Long customer_id, Long course_id, String endDate, Integer count, String status) {
        this.billDetail_id = billDetail_id;
        this.customer_id = customer_id;
        this.course_id = course_id;
        this.endDate = endDate;
        this.count = count;
        this.status = status;
    }

    public Customer_Course_Mapping(Long billDetail_id, Long customer_id, Long course_id, String endDate, Integer count) {
        this.billDetail_id = billDetail_id;
        this.customer_id = customer_id;
        this.course_id = course_id;
        this.endDate = endDate;
        this.count = count;
    }
}
