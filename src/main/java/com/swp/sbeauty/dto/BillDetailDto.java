package com.swp.sbeauty.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BillDetailDto {
    private Long id;
    private String type;

    private Long type_id;
    private ProductDto product;
    private ServiceDto service;
    private CourseDto course;
    private Long quantity;



    public BillDetailDto(){}

    public BillDetailDto(String type, Long quantity, Long type_id){
        this.type = type;
        this.quantity = quantity;
        this.type_id = type_id;
    }

    public BillDetailDto(Long id, ProductDto product, ServiceDto service, CourseDto course, Long quantity){
        this.id = id;
        this.product = product;
        this.service = service;
        this.course = course;
        this.quantity = quantity;
    }

    public BillDetailDto(Long id, String type, Long type_id, ProductDto product, ServiceDto service, CourseDto course, Long quantity) {
        this.id = id;
        this.type = type;
        this.type_id = type_id;
        this.product = product;
        this.service = service;
        this.course = course;
        this.quantity = quantity;
    }


}
