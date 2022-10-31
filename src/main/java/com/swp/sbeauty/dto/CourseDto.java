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
    private String name;
    private double coursePrice;
    private int timeOfUse;
    private Date endOfCourse;
    private Date discountStart;
    private Date discountEnd;
    private double discountPercent;
    private String image;
    private String description;
    private Set<BranchDto> branches;
    private Set<ServiceDto> services;

    public CourseDto(Course course) {
        this.setId(course.getId());
        this.setName(course.getName());
        this.setCoursePrice(course.getCoursePrice());
        this.setTimeOfUse(course.getTimeOfUse());
        this.setEndOfCourse(course.getEndOfCourse());
        this.setDiscountStart(course.getDiscountStart());
        this.setDiscountEnd(course.getDiscountEnd());
        this.setDiscountPercent(course.getDiscountPercent());
        this.setImage(course.getImage());
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
