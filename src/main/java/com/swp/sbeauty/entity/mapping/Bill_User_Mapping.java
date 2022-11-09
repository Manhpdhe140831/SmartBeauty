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
public class Bill_User_Mapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long bill_id;
    private long user_id;

    public Bill_User_Mapping(long bill_id, long user_id) {
        this.bill_id = bill_id;
        this.user_id = user_id;
    }
}
