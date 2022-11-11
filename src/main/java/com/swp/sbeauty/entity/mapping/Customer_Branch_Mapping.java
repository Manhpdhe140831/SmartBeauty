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
public class Customer_Branch_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long id_customer;
    private long id_branch;

    public Customer_Branch_Mapping() {
    }

    public Customer_Branch_Mapping(long id_customer, long id_branch) {
        this.id_customer = id_customer;
        this.id_branch = id_branch;
    }
}
