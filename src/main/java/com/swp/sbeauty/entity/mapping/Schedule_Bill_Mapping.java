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
public class Schedule_Bill_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long id_schedule;
    private Long id_bill;

    public Schedule_Bill_Mapping() {
    }

    public Schedule_Bill_Mapping(Long id_schedule, Long id_bill) {
        this.id_schedule = id_schedule;
        this.id_bill = id_bill;
    }
}
