package com.swp.sbeauty.entity.mapping;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
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
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class User_Slot_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long id_user;
    private Long id_slot;
    private String date;

    public User_Slot_Mapping(){}

    public User_Slot_Mapping(Long id_user, Long id_slot, String date){
        this.id_user = id_user;
        this.id_slot = id_slot;
        this.date = date;
    }
}
