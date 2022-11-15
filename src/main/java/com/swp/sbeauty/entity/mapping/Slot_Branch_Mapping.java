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
public class Slot_Branch_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long id_slot;
    private Long id_branch;

    public Slot_Branch_Mapping() {
    }

    public Slot_Branch_Mapping(Long id_slot, Long id_branch) {
        this.id_slot = id_slot;
        this.id_branch = id_branch;
    }

}
