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
public class Bed_Slot_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long id_spaBed;
    private long id_slot;
    private String date;
    private Long id_schedule;

    public Bed_Slot_Mapping() {
    }

    public Bed_Slot_Mapping(Long id_schedule, long id_spaBed, long id_slot, String date) {
        this.id_spaBed = id_spaBed;
        this.id_slot = id_slot;
        this.date = date;
        this.id_schedule = id_schedule;
    }
}
