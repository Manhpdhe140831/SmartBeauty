package com.swp.sbeauty.dto;

import java.util.List;

public class ProductServiceCourseDto {
    List<ServiceDto> services;
    List<CourseDto> courses;
    List<ProductDto> products;

    public ProductServiceCourseDto() {
    }

    public ProductServiceCourseDto(List<ServiceDto> services, List<CourseDto> courses, List<ProductDto> products) {
        this.services = services;
        this.courses = courses;
        this.products = products;
    }
}
