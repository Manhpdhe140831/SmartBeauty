package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.CourseResponseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.CourseRepository;
import com.swp.sbeauty.repository.ServiceRepository;
import com.swp.sbeauty.service.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@Transactional @Slf4j
public class CourseServiceImpl implements CourseService {

    @Autowired
    CourseRepository courseRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    BranchRepository branchRepository;
    @Autowired
    ModelMapper mapper;

    @Override
    public Page<Course> getListCourse(int offset, int pageSize) {
        Page<Course> courses  = courseRepository.findAll(PageRequest.of(offset, pageSize));

        return courses;
    }




    @Override
    public CourseDto save(CourseDto courseDto) {


        return null;
    }

    @Override
    public Boolean remove(Long id) {
        return null;
    }

    @Override
    public CourseResponseDto getListCoursePaginationAndSearch(String name, String code, int pageNo, int pageSize) {
        CourseResponseDto courseResponseDto = new CourseResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Course> page = courseRepository.getListCoursePaginationAndSearch(name, code, pageable);
        List<Course> courses = page.getContent();

        List<CourseDto> courseDtos = page
                .stream()
                .map(course -> mapper.map(course, CourseDto.class))
                .collect(Collectors.toList());
        List<CourseDto> result = new ArrayList<>(courseDtos);
        courseResponseDto.setCourseDto(result);
        courseResponseDto.setTotalPage(page.getTotalPages());
        courseResponseDto.setTotalElement(page.getTotalElements());
        courseResponseDto.setPageIndex(pageNo + 1);
        return courseResponseDto;
    }

    @Override
    public CourseResponseDto getAll(int pageNo, int pageSize) {
        CourseResponseDto courseResponseDto = new CourseResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Course> page = courseRepository.getAll(pageable);
        List<Course> courses = page.getContent();
        List<CourseDto> courseDtos = new ArrayList<>();
        for (Course itemC: courses
             ) {
            CourseDto courseDto = null;
            courseDto = mapper.map(itemC, CourseDto.class);
            courseDtos.add(courseDto);
        }

        courseResponseDto.setCourseDto(courseDtos);
        courseResponseDto.setTotalPage(page.getTotalPages());
        courseResponseDto.setTotalElement(page.getTotalElements());
        courseResponseDto.setPageIndex(pageNo + 1);
        return courseResponseDto;
    }


}
