package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.CourseResponseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class CourseController {
    @Autowired
    private CourseService service;

    @GetMapping(value = "/course/getallcourse")

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

    @RequestMapping(value = "/courses/add", method = RequestMethod.POST)
    public ResponseEntity<CourseDto> saveCourse (@RequestBody CourseDto courseDto){
        CourseDto courseDtoResult = service.save(courseDto);
        return new ResponseEntity<>(courseDtoResult, HttpStatus.OK);
    }

    @RequestMapping(value = "/courses/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> removeCourse(@PathVariable Long id){
        Boolean resultRemove = service.remove(id);
        return new ResponseEntity<>(resultRemove, HttpStatus.OK);
    }


}
