package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.CourseResponseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CourseService {

    Page<Course> getListCourse(int offset, int page);
    CourseDto save(CourseDto courseDto);
    Boolean remove(Long id);

    CourseResponseDto getListCoursePaginationAndSearch(String name, String code, int pageNo, int pageSize);

    CourseResponseDto getAll(int pageNo, int pageSize);
    


}
