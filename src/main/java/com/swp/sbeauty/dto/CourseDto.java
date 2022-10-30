package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.Service;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class CourseDto {
    private long id;
    private String courseCode;
    private String courseName;
    private double coursePrice;
    private int timeOfUse;
    private Date endOfCourse;
    private Date courseBeginDiscount;
    private Date courseEndDiscount;
    private double discountPercent;
    private String courseImage;
    private String description;
    private Set<BranchDto> branches;
    private Set<ServiceDto> services;

    public CourseDto(Course course) {
        this.setId(course.getId());
        this.setCourseCode(course.getCourseCode());
        this.setCourseName(course.getCourseName());
        this.setCoursePrice(course.getCoursePrice());
        this.setTimeOfUse(course.getTimeOfUse());
        this.setEndOfCourse(course.getEndOfCourse());
        this.setCourseBeginDiscount(course.getCourseBeginDiscount());
        this.setCourseEndDiscount(course.getCourseEndDiscount());
        this.setDiscountPercent(course.getDiscountPercent());
        this.setCourseImage(course.getCourseImage());
        this.setDescription(course.getDescription());

        if (course.getBranches() != null) {
            this.branches = new HashSet<>();
            for (Branch branch : course.getBranches()) {
                this.branches.add(new BranchDto(branch));
            }
        }
        if (course.getServices() != null) {
            this.services = new HashSet<>();
            for (Service service : course.getServices()) {
              //  this.services.add(new ServiceDto(service));
            }
        }

    }
}
