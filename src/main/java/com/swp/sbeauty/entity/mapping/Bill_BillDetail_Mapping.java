package com.swp.sbeauty.entity.mapping;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Bill_BillDetail_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long bill_id;
    private long billDetail_id;

    public Bill_BillDetail_Mapping(long bill_id, long billDetail_id) {
        this.bill_id = bill_id;
        this.billDetail_id = billDetail_id;
    }
}

