package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.ServiceDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CourseService {

    Page<CourseDto> getListCourse(int offset, int page);
    CourseDto save(CourseDto courseDto);
    Boolean remove(Long id);
    


}
