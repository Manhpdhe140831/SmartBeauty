package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Course;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

@Getter
@Setter
public class CourseDto {
    private long id;
    private String name;
    private double price;
    private String imageURL;
    private short description;
    private int MinSession;

    public CourseDto(Course course){
        if (null != course){
            this.setId(course.getId());
            this.setName(course.getName());
            this.setPrice(course.getPrice());
            this.setImageURL(course.getImageURL());
            this.setDescription(course.getDescription());
            this.setMinSession(course.getMinSession());
        }
    }
}
