package com.swp.sbeauty.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long   id;
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    private String code;
    private String  date;
    private Double moneyPerTax;
    private Double moneyAfterTax;
    private String status;


    public Bill(Long id, String code, String date, Double moneyPerTax, Double moneyAfterTax, String status) {
        this.id = id;
        this.code = code;
        this.date = date;
        this.moneyPerTax = moneyPerTax;
        this.moneyAfterTax = moneyAfterTax;
        this.status = status;
    }
}

