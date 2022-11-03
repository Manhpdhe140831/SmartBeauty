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
    public Page<Course> getListCourse(int offset, int pageSize) {
        Page<Course> courses  = courseRepository.findAll(PageRequest.of(offset, pageSize));

        return courses;
    }

    @Override
    public Boolean saveCourse(String name, Double price, Integer duration, String discountStart, String discountEnd, Double discountPercent, String image, String description, String[] services) {
        try{
            Course course = new Course();
            course.setName(name);
            course.setPrice(price);
            course.setDuration(duration);
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            Date startDate = df.parse(discountStart);
            course.setDiscountStart(startDate);
            Date endDate = df.parse(discountEnd);
            course.setDiscountEnd(endDate);
            course.setDiscountPercent(discountPercent);
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

//    @Override
//    public Boolean remove(Long id) {
//
//        Boolean checkRemove = courseRepository.remove(id);
//        if (checkRemove == true){
//            return true;
//        }else{
//            return false;
//        }
//    }

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
            courseDto.setService(list);
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
            courseDto.setService(list);
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

    @Override
    public Boolean update(Long id, String name, Double price, Integer duration, String discountStart, String discountEnd, Double discountPercent, String image, String description, String[] services) {
//            Course course = null;
//            Optional<Course> optional = courseRepository.findById(id);
//            if (optional.isPresent()){
//                course = optional.get();
//                if (name != null){
//                    course.setName(name);
//                }
//                if (price != null){
//                    course.setPrice(price);
//                }
//                if (duration != null){
//                    course.setDuration(duration);
//                }
//                if (discountStart != null){
//                    course.setDiscountStart(discountStart);
//                }
//                if (discountEnd != null){
//                    course.setDiscountEnd(discountEnd);
//                }
//                if (discountPercent != null){
//                    course.setDiscountPercent(discountPercent);
//                }
//                if (image != null){
//                    course.setImage(image);
//                }
//                if (description != null){
//                    course.setDescription(description);
//                }
//                Course_Service_Mapping course_service_mapping = course_service_mapping_repository.getServiceById(course.getId());
//                if (null !=course_service_mapping) {
//                    course_service_mapping_repository.delete(course_service_mapping);
//                    if (null == services) {
//                        courseRepository.save(course);
//                        return true;
//                    } else {
//
//                        for (int i =0; i < services.length; i++
//                        ) {
//                            course = courseRepository.save(course);
//                            Course_Service_Mapping course_service_mapping1 = new Course_Service_Mapping(course.getId(), Long.parseLong(services[i]));
//                            course_service_mapping_repository.save(course_service_mapping1);
//
//                        }
//                        return true;
//                    }
//                }else{
//                    courseRepository.save(course);
//                    return true;
//                }
//
//            }else{
//                return false;
//            }
        return false;
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


}
