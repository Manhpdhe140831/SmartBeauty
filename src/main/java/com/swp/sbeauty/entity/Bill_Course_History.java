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
public class Bill_Course_History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long scheduleId;
    private String date;

    private Long course_id;
    private String code;
    private String name;
    private Double price;
    private Integer duration;
    private Integer timeOfUse;
    private String discountStart;
    private String discountEnd;
    private Double discountPercent;
    private String image;
    private String description;

    public Bill_Course_History(Long id, Long scheduleId ,String date, Long course_id, String code, String name, Double price, Integer duration, Integer timeOfUse, String discountStart, String discountEnd, Double discountPercent, String image, String description) {
        this.id = id;
        this.scheduleId = scheduleId;
        this.date = date;
        this.course_id = course_id;
        this.code = code;
        this.name = name;
        this.price = price;
        this.duration = duration;
        this.timeOfUse = timeOfUse;
        this.discountStart = discountStart;
        this.discountEnd = discountEnd;
        this.discountPercent = discountPercent;
        this.image = image;
        this.description = description;
    }

    public Bill_Course_History(Long scheduleId, String date, long course_id, String code, String name, Double price, int duration, Integer timeOfUse, String discountStart, String discountEnd, Double discountPercent, String image, String description) {
        this.scheduleId = scheduleId;
        this.date = date;
        this.course_id = course_id;
        this.code = code;
        this.name = name;
        this.price = price;
        this.duration = duration;
        this.timeOfUse = timeOfUse;
        this.discountStart = discountStart;
        this.discountEnd = discountEnd;
        this.discountPercent = discountPercent;
        this.image = image;
        this.description = description;
    }
}
