package com.swp.sbeauty.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Course_Service_Mapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long course_id;
    private long service_id;

    public Course_Service_Mapping(long course_id, long service_id) {
        this.course_id = course_id;
        this.service_id = service_id;
    }


}


