package com.swp.sbeauty.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class ServiceCourseBuyedDto {
    List<ServiceDto> services;
    List<CourseDto> courses;
    List<ProductDto> products;

    public ServiceCourseBuyedDto() {
    }

    public ServiceCourseBuyedDto(List<ServiceDto> services, List<CourseDto> courses) {
        this.services = services;
        this.courses = courses;
    }

    public ServiceCourseBuyedDto(List<ServiceDto> services, List<CourseDto> courses, List<ProductDto> products) {
        this.services = services;
        this.courses = courses;
        this.products = products;
    }
}
