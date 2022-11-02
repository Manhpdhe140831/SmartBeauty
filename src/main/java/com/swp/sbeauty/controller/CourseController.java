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

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class CourseController {
    @Autowired
    private CourseService service;

    @GetMapping(value = "/course/getall")

    private ResponseEntity<?> getServiceWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false, defaultValue = "") String name
            , @RequestParam(value = "code", required = false,defaultValue = "") String code
    ){
        Pageable pageable = PageRequest.of(page, pageSize);
        CourseResponseDto courseResponseDto = null;

        if (name=="" && code == ""){
            courseResponseDto = service.getAll(page-1, pageSize);
            return new ResponseEntity<>(courseResponseDto, HttpStatus.OK);
        }else {
            courseResponseDto = service.getListCoursePaginationAndSearch(name, code, page-1, pageSize);
            return new ResponseEntity<>(courseResponseDto, HttpStatus.OK);

        }
    }

    @RequestMapping(value = "/course/save", headers="Content-Type=multipart/form-data",method = RequestMethod.POST)
    public ResponseEntity<?> saveCourse (
            @RequestParam("name") String name,
            @RequestParam(value = "price", defaultValue = "0") double price,
            @RequestParam("duration") int duration,
            @RequestParam("endOfCourse") String endOfCourse,
            @RequestParam("discountStart") String discountStart,
            @RequestParam("discountEnd") String discountEnd,
            @RequestParam("discountPercent") double discountPercent ,
            @RequestParam(value = "image", defaultValue = "") String image,
            @RequestParam("description") String description,
            @RequestParam(value = "deleted", required = false) boolean deleted,
            @RequestParam (value = "listProduct", required = false) List<Long> listProduct
    ){

        Date startDate = service.parseDate(discountStart);
        Date endDate = service.parseDate(discountEnd);
        Date endCourse = service.parseDate(endOfCourse);
        Boolean result = service.save(name, price, duration, endCourse, startDate, endDate, discountPercent, image, description, deleted, listProduct);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @RequestMapping(value = "/course/update", headers="Content-Type=multipart/form-data",method = RequestMethod.POST)
    public ResponseEntity<?> updateCourse (
            @RequestParam("id") Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "price",required = false ,defaultValue = "0") Double price,
            @RequestParam(value = "duration", required = false) Integer duration,
            @RequestParam(value = "endOfCourse", required = false) String endOfCourse,
            @RequestParam(value = "discountStart", required = false) String discountStart,
            @RequestParam(value = "discountEnd", required = false) String discountEnd,
            @RequestParam(value = "discountPercent", required = false) Double discountPercent ,
            @RequestParam(value = "image", required = false,defaultValue = "") String image,
            @RequestParam(value = "description",required = false) String description,
            @RequestParam(value = "deleted", required = false) boolean deleted,
            @RequestParam (value = "listProduct", required = false) List<Long> listProduct
    ){

        Date startDate = service.parseDate(discountStart);
        Date endDate = service.parseDate(discountEnd);
        Date endCourse = service.parseDate(endOfCourse);
        Boolean result = service.update(id, name, price, duration, endCourse, startDate, endDate, discountPercent, image, description, deleted, listProduct);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

//    @RequestMapping(value = "/course/remove", method = RequestMethod.POST)
//    public ResponseEntity<?> removeCourse(@RequestParam("id") Long id){
//
//        Boolean checkRemove = service.remove(id);
//        return new ResponseEntity<>(checkRemove, HttpStatus.OK);
//    }


}
