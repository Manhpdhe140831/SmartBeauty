package com.swp.sbeauty.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String date;
    private Long slotId;
    private Long bedId;
    private Long saleStaffId;
    private Long technicalStaffId;
    private Long customerId;
    private Long serviceId;
    private Long courseId;
    private Long courseHistoryId;
    private String status;
    private String note;
}
