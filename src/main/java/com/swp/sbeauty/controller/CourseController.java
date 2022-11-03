package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.CourseResponseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class CourseController {
    @Autowired
    private CourseService service;

    @GetMapping(value = "/course")

    private ResponseEntity<?> getServiceWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false) String name
            , @RequestParam(value = "code", required = false) String code
    ){
        Pageable pageable = PageRequest.of(page, pageSize);
        CourseResponseDto courseResponseDto = null;

        if (name==null && code == null){
            courseResponseDto = service.getAll(page-1, pageSize);
            return new ResponseEntity<>(courseResponseDto, HttpStatus.OK);
        }else {
            courseResponseDto = service.getListCoursePaginationAndSearch(name, code, page-1, pageSize);
            return new ResponseEntity<>(courseResponseDto, HttpStatus.OK);

        }
    }

    @RequestMapping(value = "/course/save", headers="Content-Type=multipart/form-data",method = RequestMethod.POST)
    public ResponseEntity<?> saveCourse (
            @RequestParam(value = "name") String name,
            @RequestParam(value = "price") Double price,
            @RequestParam(value = "duration") Integer duration,
            @RequestParam(value = "timeOfUse") Integer timeOfUse,
            @RequestParam(value = "discountStart", required = false) String discountStart,
            @RequestParam(value = "discountEnd", required = false) String discountEnd,
            @RequestParam(value = "discountPercent") Double discountPercent ,
            @RequestParam(value = "image", required = false) String image,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam (value = "services", required = false) String[] services
    ){
        Boolean result = service.saveCourse(name, price, duration,timeOfUse, discountStart, discountEnd, discountPercent, image, description, services);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @RequestMapping(value = "/course/update", headers="Content-Type=multipart/form-data",method = RequestMethod.POST)
    public ResponseEntity<?> updateCourse (
            @RequestParam("id") Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "price",required = false ,defaultValue = "0") Double price,
            @RequestParam(value = "duration", required = false) Integer duration,
            @RequestParam(value = "discountStart", required = false) String discountStart,
            @RequestParam(value = "discountEnd", required = false) String discountEnd,
            @RequestParam(value = "discountPercent", required = false) Double discountPercent ,
            @RequestParam(value = "image", required = false) String image,
            @RequestParam(value = "description",required = false) String description,
            @RequestParam (value = "services", required = false) String[] services
    ){
        Boolean result = service.update(id, name, price, duration, discountStart, discountEnd, discountPercent, image, description, services);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }
    @GetMapping(value = "/course/getcourse")
    public ResponseEntity<?> getCourseById(@RequestParam("id") Long id){
        CourseDto courseDto = service.getCourseById(id);
        return new ResponseEntity<>(courseDto, HttpStatus.OK);
    }

//    @RequestMapping(value = "/course/remove", method = RequestMethod.POST)
//    public ResponseEntity<?> removeCourse(@RequestParam("id") Long id){
//
//        Boolean checkRemove = service.remove(id);
//        return new ResponseEntity<>(checkRemove, HttpStatus.OK);
//    }


}
