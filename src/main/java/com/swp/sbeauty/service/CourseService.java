package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.CourseResponseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.domain.Page;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

public interface CourseService {

    Page<Course> getListCourse(int offset, int page);
    Boolean save(String name, double price, int duration, Date endOfCourse, Date discountStart, Date discountEnd, double discountPercent, String image, String description, boolean deleted, String[] services
    );
//    Boolean remove(Long id);

    CourseResponseDto getListCoursePaginationAndSearch(String name, String code, int pageNo, int pageSize);

    CourseResponseDto getAll(int pageNo, int pageSize);

    public Date parseDate(String strDate);

    public Boolean update(Long id, String name, Double price, Integer duration, Date endOfCourse, Date discountStart, Date discountEnd, Double discountPercent, String image, String description, boolean deleted, List<Long> listServiceId);

    CourseDto getCourseById(Long id);

    


}
