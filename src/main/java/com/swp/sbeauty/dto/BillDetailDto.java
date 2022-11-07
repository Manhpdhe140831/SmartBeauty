package com.swp.sbeauty.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BillDetailDto {
    private Long id;
    private String type;
    private ProductDto product;
    private ServiceDto service;
    private CourseDto course;
    private Integer quantity;

    public BillDetailDto(){}

    public BillDetailDto(String type, Integer quantity){
        this.type = type;
        this.quantity = quantity;
    }

    public BillDetailDto(Long id, ProductDto product, ServiceDto service, CourseDto course, Integer quantity){
        this.id = id;
        this.product = product;
        this.service = service;
        this.course = course;
        this.quantity = quantity;
    }
}
