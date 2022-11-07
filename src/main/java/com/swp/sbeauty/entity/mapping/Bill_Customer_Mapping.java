package com.swp.sbeauty.entity.mapping;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Bill_Customer_Mapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long bill_id;
    private long customer_id;

    public Bill_Customer_Mapping(long bill_id, long customer_id) {
        this.bill_id = bill_id;
        this.customer_id = customer_id;
    }
}
