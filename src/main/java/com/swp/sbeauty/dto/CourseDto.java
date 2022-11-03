package com.swp.sbeauty.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.Service;
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
    private double price;
    private int duration;
    private Integer timeOfUse;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date discountStart;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date discountEnd;
    private double discountPercent;
    private String image;
    private String description;
    private List<ServiceDto> service;


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

    public long getId() {
        return id;
    }


    public void setId(long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Date getDiscountStart() {
        return discountStart;
    }

    public void setDiscountStart(Date discountBegin) {
        this.discountStart = discountBegin;
    }

    public Date getDiscountEnd() {
        return discountEnd;
    }

    public void setDiscountEnd(Date discountEnd) {
        this.discountEnd = discountEnd;
    }

    public double getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(double discountPercent) {
        this.discountPercent = discountPercent;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTimeOfUse() {
        return timeOfUse;
    }

    public void setTimeOfUse(Integer timeOfUse) {
        this.timeOfUse = timeOfUse;
    }

    public List<ServiceDto> getService() {
        return service;
    }

    public void setService(List<ServiceDto> service) {
        this.service = service;
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
        this.setService(listService);

    }
}
