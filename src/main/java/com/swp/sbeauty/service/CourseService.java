package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.CourseResponseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

public interface CourseService {

    Boolean saveCourse(String name, Double price, Integer duration, Integer timeOfUse, String discountStart, String discountEnd, Double discountPercent, MultipartFile image, String description, String[] services);

    CourseResponseDto getListCoursePaginationAndSearch(String name, String code, int pageNo, int pageSize);

    CourseResponseDto getAll(int pageNo, int pageSize);

    String update(Long id, String name, Double price, Integer duration, String discountStart, String discountEnd, Double discountPercent, MultipartFile image, String description, String[] services);

    CourseDto getCourseById(Long id);

    List<CourseDto> getServiceBuyed(Long idCheck, Long customer);

    String validateCourse(String name, String discountStart, String discountEnd, Double discountPercent);

    Boolean delete(Long id);

}
