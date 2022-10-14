package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CourseDto;

import java.util.List;

public interface CourseService {

    List<CourseDto> getAl();
    CourseDto save(CourseDto courseDto);
    Boolean remove(Long id);
    


}
