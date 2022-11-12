package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.*;
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
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;


@Service @Transactional @Slf4j
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    BranchRepository branchRepository;

    @Autowired
    Course_Service_Mapping_Repository course_service_mapping_repository;

    @Autowired
    ModelMapper mapper;

    @Override
    public Boolean saveCourse(String name, Double price, Integer duration, Integer timeOfUse, String discountStart, String discountEnd, Double discountPercent, String image, String description, String[] services) {
        try{
            Course course = new Course();
            course.setCode("code");
            course.setName(name);
            course.setPrice(price);
            course.setDuration(duration);
            course.setTimeOfUse(timeOfUse);
            if(discountStart != null){
                //DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                //Date startDate = df.parse(discountStart);
                course.setDiscountStart(discountStart);
            }
            if(discountEnd != null){
                //DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                //Date endDate = df.parse(discountEnd);
                course.setDiscountEnd(discountEnd);
            }
            if(discountPercent!=null){
                course.setDiscountPercent(discountPercent);
            }
            if(image!=null){
                course.setImage(image);
            }
            if(description!=null){
                course.setDescription(description);
            }
            course = courseRepository.save(course);
            if (services!=null){
                for (int i =0; i < services.length; i++
                ) {
                    Course_Service_Mapping course_service_mapping = new Course_Service_Mapping(course.getId(), Long.parseLong(services[i]));
                    course_service_mapping_repository.save(course_service_mapping);
                }
            }
            return true;
        } catch (Exception e){
            return false;
        }
    }

    @Override
    public CourseResponseDto getListCoursePaginationAndSearch(String name, String code, int pageNo, int pageSize) {
        CourseResponseDto courseResponseDto = new CourseResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Course> page = courseRepository.getListCoursePaginationAndSearch(name, code, pageable);

        List<CourseDto> courseDtos = page
                .stream()
                .map(course -> mapper.map(course, CourseDto.class))
                .collect(Collectors.toList());
        for(CourseDto courseDto : courseDtos){
            List<Long> listIdService = course_service_mapping_repository.getMappingByIdCourse(courseDto.getId());
            List<ServiceDto> list = new ArrayList<>();
            for(Long id : listIdService){
                list.add(new ServiceDto(serviceRepository.getServiceById(id)));
            }
            courseDto.setServices(list);
        }
        courseResponseDto.setData(courseDtos);
        courseResponseDto.setTotalPage(page.getTotalPages());
        courseResponseDto.setTotalElement(page.getTotalElements());
        courseResponseDto.setPageIndex(pageNo + 1);
        return courseResponseDto;
    }

    @Override
    public CourseResponseDto getAll(int pageNo, int pageSize) {
        CourseResponseDto courseResponseDto = new CourseResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Course> page = courseRepository.findAll(pageable);
        List<CourseDto> courseDtos = page
                .stream()
                .map(course -> mapper.map(course, CourseDto.class))
                .collect(Collectors.toList());
        for(CourseDto courseDto : courseDtos){
            List<Long> listIdService = course_service_mapping_repository.getMappingByIdCourse(courseDto.getId());
            List<ServiceDto> list = new ArrayList<>();
            for(Long id : listIdService){
                list.add(new ServiceDto(serviceRepository.getServiceById(id)));
            }
            courseDto.setServices(list);
        }
        courseResponseDto.setData(courseDtos);
        courseResponseDto.setTotalPage(page.getTotalPages());
        courseResponseDto.setTotalElement(page.getTotalElements());
        courseResponseDto.setPageIndex(pageNo + 1);
        return courseResponseDto;
    }

    @Override
    public Boolean update(Long id, String name, Double price, Integer duration, String discountStart, String discountEnd, Double discountPercent, String image, String description, String[] services) {
        try {
            Course course = null;
            course = courseRepository.getCourseById(id);
            if (name != null) {
                course.setName(name);
            }
            if (price != null) {
                course.setPrice(price);
            }
            if (duration != null) {
                course.setDuration(duration);
            }
            if (discountStart != null) {
                course.setDiscountStart(discountStart);
            }
            if (discountEnd != null) {
                course.setDiscountEnd(discountEnd);
            }
            if (discountPercent != null) {
                course.setDiscountPercent(discountPercent);
            }
            if (image != null) {
                course.setImage(image);
            }
            if (description != null) {
                course.setDescription(description);
            }
            List<Course_Service_Mapping> listMapping = course_service_mapping_repository.getMappingById(id);
            for(Course_Service_Mapping mapping : listMapping){
                course_service_mapping_repository.deleteById(mapping.getId());
            }
            if (services != null) {
                for (int i = 0; i < services.length; i++) {
                    Course_Service_Mapping course_service_mapping = new Course_Service_Mapping(course.getId(), Long.parseLong(services[i]));
                    course_service_mapping_repository.save(course_service_mapping);
                }
            }
            return true;
        } catch (Exception e){
            return false;
        }
    }

    @Override
    public CourseDto getCourseById(Long id) {
        Course course = null;
        Optional<Course> optional = courseRepository.findById(id);
        if (optional.isPresent()){
            course = optional.get();
        }
        List<com.swp.sbeauty.entity.Service> services = serviceRepository.getServiceByCourseId(course.getId());
        List<ServiceDto> serviceDtos = new ArrayList<>();
        for (com.swp.sbeauty.entity.Service s: services
             ) {
            serviceDtos.add(new ServiceDto(s));
        }
        CourseDto courseDto = new CourseDto(course, serviceDtos);
        return courseDto;
    }

    @Override
    public String validateCourse(String name, String discountStart, String discountEnd, Double discountPercent) {
        String result = "";
        if(discountStart!=null || discountEnd!=null){
            if(discountPercent == null){
                result += "Discount percent cannot be null. ";
            }
        }
        if(courseRepository.existsByName(name)){
            result += "Name already exists in data. ";
        }
        return result;
    }
}
