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
public class Bill_Service_History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long billId;
    private Long serviceId;
    private String name;
    private String discountStart;
    private String discountEnd;
    private Double discountPercent;
    private Double price;
    private String description;
    private Long duration;
    private String image;

    public Bill_Service_History(Long id, Long billId,Long serviceId, String name, String discountStart, String discountEnd, Double discountPercent, Double price, String description, Long duration, String image) {
        this.id = id;
        this.billId = billId;
        this.serviceId = serviceId;
        this.name = name;
        this.discountStart = discountStart;
        this.discountEnd = discountEnd;
        this.discountPercent = discountPercent;
        this.price = price;
        this.description = description;
        this.duration = duration;
        this.image = image;
    }
}
