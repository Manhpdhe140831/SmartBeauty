package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CourseService {

    Page<Course> getListCourse(int offset, int page);
    CourseDto save(CourseDto courseDto);
    Boolean remove(Long id);

    Page<Course> getListCoursePaginationAndSearch(String name, String code, int offset, int pageSize);
    


}
