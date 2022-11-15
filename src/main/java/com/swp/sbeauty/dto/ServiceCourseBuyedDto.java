package com.swp.sbeauty.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class ServiceCourseBuyedDto {
    List<ServiceDto> services;
    List<CourseDto> courses;

    public ServiceCourseBuyedDto() {
    }

    public ServiceCourseBuyedDto(List<ServiceDto> services, List<CourseDto> courses) {
        this.services = services;
        this.courses = courses;
    }
}
