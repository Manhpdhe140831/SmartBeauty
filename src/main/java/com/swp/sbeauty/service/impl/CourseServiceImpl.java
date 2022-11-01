package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.CourseResponseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.*;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.CourseRepository;
import com.swp.sbeauty.repository.ServiceRepository;
import com.swp.sbeauty.repository.mappingRepo.Course_Service_Mapping_Repository;
import com.swp.sbeauty.service.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
    Course_Service_Mapping_Repository course_service_mapping_repository;
    @Autowired
    ModelMapper mapper;

    @Override
    public Page<Course> getListCourse(int offset, int pageSize) {
        Page<Course> courses  = courseRepository.findAll(PageRequest.of(offset, pageSize));

        return courses;
    }
//    private long id;
//    private String code;
//    private String name;
//    private double price;
//    private int duration;
//    private Long endOfCourse;
//    private Date discountStart;
//    private Date discountEnd;
//    private double discountPercent;
//    private String image;
//    private String description;
//    private boolean deleted;



    @Override
    public Boolean save(String name, double price, int duration, Date endOfCourse, Date discountStart, Date discountEnd, double discountPercent, String image, String description, boolean deleted, List<Long> listProductId) {

            Course course = new Course();
            course.setName(name);
            course.setPrice(price);
            course.setDuration(duration);
            course.setEndOfCourse(endOfCourse);
            course.setDiscountStart(discountStart);
            course.setDiscountEnd(discountEnd);
            course.setDiscountPercent(discountPercent);
            course.setImage(image);
            course.setDescription(description);
            course.setDeleted(true);

            if (null == listProductId){
                course = courseRepository.save(course);
                return true;
            }else if (null != listProductId){
                for (Long item: listProductId
                     ) {
                    Course_Service_Mapping course_service_mapping = new Course_Service_Mapping(course.getId(), item);
                    course_service_mapping_repository.save(course_service_mapping);
                }
                return true;
            }else {
                return false;
            }
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
        courseResponseDto.setData(result);
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

        courseResponseDto.setData(courseDtos);
        courseResponseDto.setTotalPage(page.getTotalPages());
        courseResponseDto.setTotalElement(page.getTotalElements());
        courseResponseDto.setPageIndex(pageNo + 1);
        return courseResponseDto;
    }

    @Override
    public Date parseDate(String strDate) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse(strDate);
            return date;

        }catch (Exception e){
            try {
                throw e;
            } catch (ParseException ex) {
                throw new RuntimeException(ex);
            }
        }
    }


}
