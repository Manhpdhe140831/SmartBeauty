package com.swp.sbeauty.entity;

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
public class Bill_Product_history {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String date;
    private Long billId;
    // product
    private Long productId;
    private String name;
    private Double price;
    private String description;
    private String image;
    private String discountStart;
    private String discountEnd;
    private Double discountPercent;
    private String unit;
    private Integer dose;

    public Bill_Product_history(Long id, String date, Long billId, Long productId, String name, Double price, String description, String image, String discountStart, String discountEnd, Double discountPercent, String unit, Integer dose) {
        this.id = id;
        this.date = date;
        this.billId = billId;
        this.productId= productId;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.discountStart = discountStart;
        this.discountEnd = discountEnd;
        this.discountPercent = discountPercent;
        this.unit = unit;
        this.dose = dose;
    }
}
