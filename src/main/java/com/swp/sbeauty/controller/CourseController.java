package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class CourseController {
    @Autowired
    private CourseService service;

    @GetMapping("/courses/list")
    public ResponseEntity<List<CourseDto>> getAll(){
        List<CourseDto> listCourse = service.getAl();
        return new ResponseEntity<>(listCourse, HttpStatus.OK);
    }
    @RequestMapping(value = "/courses/add", method = RequestMethod.POST)
    public ResponseEntity<CourseDto> create (@RequestBody CourseDto courseDto){
        CourseDto courseDtoResult = service.save(courseDto);
        return new ResponseEntity<>(courseDtoResult, HttpStatus.OK);
    }

    @RequestMapping(value = "/courses/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> removeCourse(@PathVariable Long id){
        Boolean resultRemove = service.remove(id);
        return new ResponseEntity<>(resultRemove, HttpStatus.OK);
    }


}