package com.swp.sbeauty.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Setter
@Getter
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long   id;
    private String code;
    private Long   branch;
    private Long   staff;
    private Long   customer;
    private String   date;
    private Double moneyPerTax;
    private Double moneyAfterTax;
    private String status;
}

