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
public class Bill_Branch_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long bill_id;
    private long branch_id;

    public Bill_Branch_Mapping(long bill_id, long branch_id) {
        this.bill_id = bill_id;
        this.branch_id = branch_id;
    }
}
