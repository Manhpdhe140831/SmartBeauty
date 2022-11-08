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

    public Bed_Slot_Mapping() {
    }

    public Bed_Slot_Mapping(long id_spaBed, long id_slot) {
        this.id_spaBed = id_spaBed;
        this.id_slot = id_slot;
    }
}
