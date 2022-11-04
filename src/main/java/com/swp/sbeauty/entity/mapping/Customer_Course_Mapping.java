package com.swp.sbeauty.entity.mapping;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

public class Customer_Course_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long bill_id;
    private long customer_id;
    private long course_id;
    private Date endDate;
    private int count;
    private String status;
}
