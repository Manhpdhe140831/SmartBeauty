package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.mapping.Customer_Course_Mapping;

public class ScheduleDto {
    private Long id;
    private String date;
    private SlotDto slot;
    private SpaBedDto bed;
    private UserDto sale_staff;
    private UserDto tech_staff;
    private CustomerDto customer;
    private CourseDto course;
    private ServiceDto service;
    private String status;
    private String note;
}
