package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.CourseResponseDto;
import com.swp.sbeauty.dto.ResponseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.CourseService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CourseController {
    @Autowired
    private CourseService service;

    @Autowired
    JwtUtils jwtUtils;

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

    @RequestMapping(value = "/course/create", headers="Content-Type=multipart/form-data",method = RequestMethod.POST)
    public ResponseEntity<?> saveCourse (
            @RequestParam(value = "name") String name,
            @RequestParam(value = "price") Double price,
            @RequestParam(value = "duration") Integer duration,
            @RequestParam(value = "timeOfUse") Integer timeOfUse,
            @RequestParam(value = "discountStart", required = false) String discountStart,
            @RequestParam(value = "discountEnd", required = false) String discountEnd,
            @RequestParam(value = "discountPercent", required = false) Double discountPercent ,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam (value = "services[]", required = false) String[] services
    ){
        String check = service.validateCourse(name, discountStart, discountEnd, discountPercent);
        if(check == ""){
            Boolean result = service.saveCourse(name, price, duration,timeOfUse, discountStart, discountEnd, discountPercent, image, description, services);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }

    }


    @RequestMapping(value = "/course/update", headers="Content-Type=multipart/form-data",method = RequestMethod.PUT)
    public ResponseEntity<?> updateCourse (
            @RequestParam("id") Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "price",required = false ,defaultValue = "0") Double price,
            @RequestParam(value = "duration", required = false) Integer duration,
            @RequestParam(value = "discountStart", required = false) String discountStart,
            @RequestParam(value = "discountEnd", required = false) String discountEnd,
            @RequestParam(value = "discountPercent", required = false) Double discountPercent ,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "description",required = false) String description,
            @RequestParam (value = "services[]", required = false) String[] services
    ){
        String check = service.validateCourse(name, discountStart, discountEnd, discountPercent);
        if(check == ""){
            Boolean result = service.update(id, name, price, duration, discountStart, discountEnd, discountPercent, image, description, services);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/course/getById")
    public ResponseEntity<?> getCourseById(@RequestParam("id") Long id){
        CourseDto courseDto = service.getCourseById(id);
        return new ResponseEntity<>(courseDto, HttpStatus.OK);
    }

    @GetMapping("/course/getCourseBuyed")
    private ResponseEntity<?> getCourseBuyed(@RequestHeader("Authorization") String authHeader,
                                            @RequestParam(value = "customer") Long customer){
        if(authHeader != null){
            Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
            String id = temp.get("id").toString();
            Long idCheck = Long.parseLong(id);
            List<CourseDto> list = service.getServiceBuyed(idCheck, customer);
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(404, "Not logged in"), HttpStatus.BAD_REQUEST);
        }
    }


}
