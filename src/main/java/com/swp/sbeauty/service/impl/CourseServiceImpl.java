package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.CourseRepository;
import com.swp.sbeauty.repository.ServiceRepository;
import com.swp.sbeauty.service.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.*;

@org.springframework.stereotype.Service
@Transactional @Slf4j
public class CourseServiceImpl implements CourseService {

    @Autowired
    CourseRepository courseRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    BranchRepository branchRepository;

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
    public Page<Course> getListCoursePaginationAndSearch(String name, String code, int offset, int pageSize) {
        Page<Course> courses = courseRepository.getListCoursePaginationAndSearch(name, code, PageRequest.of(offset, pageSize));

        return courses;
    }

}
