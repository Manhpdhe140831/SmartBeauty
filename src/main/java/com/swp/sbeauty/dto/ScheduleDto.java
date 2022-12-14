package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.mapping.Customer_Course_Mapping;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
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
    private Long status;
    private String note;
    private Boolean isBill;

    private Long slotId;
    private Long bedId;
    private Long saleStaffId;
    private Long techStaffId;
    private Long customerId;
    private Long serviceId;
    private Long courseId;

    public ScheduleDto(Long id, String date, SlotDto slot, SpaBedDto bed, UserDto sale_staff, UserDto tech_staff, CustomerDto customer, CourseDto course, ServiceDto service, Long status, String note, Boolean isBill) {
        this.id = id;
        this.date = date;
        this.slot = slot;
        this.bed = bed;
        this.sale_staff = sale_staff;
        this.tech_staff = tech_staff;
        this.customer = customer;
        this.course = course;
        this.service = service;
        this.status = status;
        this.note = note;
        this.isBill = isBill;
    }
}
