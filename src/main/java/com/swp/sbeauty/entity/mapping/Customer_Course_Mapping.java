package com.swp.sbeauty.entity.mapping;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

public class Customer_Course_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long bill_id;
    private Long customer_id;
    private Long course_id;
    private String endDate;
    private Integer count;

    public Customer_Course_Mapping() {
    }

    public Customer_Course_Mapping(Long id, Long bill_id, Long customer_id, Long course_id, String endDate, Integer count) {
        this.id = id;
        this.bill_id = bill_id;
        this.customer_id = customer_id;
        this.course_id = course_id;
        this.endDate = endDate;
        this.count = count;
    }

    public Customer_Course_Mapping(Long bill_id, Long customer_id, Long course_id, String endDate, Integer count) {
        this.bill_id = bill_id;
        this.customer_id = customer_id;
        this.course_id = course_id;
        this.endDate = endDate;
        this.count = count;
    }
}
