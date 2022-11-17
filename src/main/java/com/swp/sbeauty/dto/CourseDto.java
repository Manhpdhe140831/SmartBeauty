package com.swp.sbeauty.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.swp.sbeauty.entity.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class CourseDto {
    private long id;
    private String code;
    private String name;
    private Double price;
    private Integer duration;
    private Integer timeOfUse;
    private String discountStart;
    private String discountEnd;
    private Double discountPercent;
    private String image;
    
    private String status;
    private String description;
    private List<ServiceDto> services;


    public CourseDto(Course course) {
        this.setId(course.getId());
        this.setName(course.getName());
        this.setPrice(course.getPrice());
        this.setDuration(course.getDuration());
        this.setTimeOfUse(course.getTimeOfUse());
        this.setDiscountStart(course.getDiscountStart());
        this.setDiscountEnd(course.getDiscountEnd());
        this.setDiscountPercent(course.getDiscountPercent());
        this.setImage(course.getImage());
        this.setDescription(course.getDescription());

    }
    public CourseDto(Bill_Course_History course) {
        this.setId(course.getCourse_id());
        this.setName(course.getName());
        this.setPrice(course.getPrice());
        this.setDuration(course.getDuration());
        this.setTimeOfUse(course.getTimeOfUse());
        this.setDiscountStart(course.getDiscountStart());
        this.setDiscountEnd(course.getDiscountEnd());
        this.setDiscountPercent(course.getDiscountPercent());
        this.setImage(course.getImage());
        this.setDescription(course.getDescription());

    }

    public CourseDto(Course course, List<ServiceDto> listService){
        if (null != course) {
            this.setId(course.getId());
            this.setCode(course.getCode());
            this.setName(course.getName());
            this.setPrice(course.getPrice());
            this.setDuration(course.getDuration());
            this.setDiscountStart(course.getDiscountStart());
            this.setDiscountEnd(course.getDiscountEnd());
            this.setDiscountPercent(course.getDiscountPercent());
            this.setImage(course.getImage());
            this.setDescription(course.getDescription());
            this.setTimeOfUse(course.getTimeOfUse());
        }
        this.setServices(listService);

    }

    public CourseDto(long id, String code, String name, Double price, int duration, Integer timeOfUse, String discountStart, String discountEnd, Double discountPercent, String image, String description) {
        this.id = id;
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
