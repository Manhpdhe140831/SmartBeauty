package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.repository.CourseRepository;
import com.swp.sbeauty.service.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service @Transactional @Slf4j
public class CourseServiceImpl implements CourseService {

    private CourseRepository repository;
    @Override
    public List<CourseDto> getAl() {
        List<Course> listCourse = repository.findAll();

            List<CourseDto> listCourseDto = new ArrayList<>();
            for (Course item : listCourse
            ) {
                listCourseDto.add(new CourseDto(item));
            }
            return listCourseDto;



    }

    @Override
    public CourseDto save(CourseDto courseDto) {
        if(null != courseDto){
            Course course = new Course();
            course.setName(courseDto.getName());
            course.setPrice(courseDto.getPrice());
            course.setImageURL(courseDto.getImageURL());
            course.setMinSession(courseDto.getMinSession());
            if (null != course){
                return new CourseDto(course);
            }
        }
        return null;
    }

    @Override
    public Boolean remove(Long id) {
        Course course = null;
        Optional<Course> courseOptional = repository.findById(id);
        if (courseOptional.isPresent()){
            course = courseOptional.get();
        }
        if (null != course){
            repository.delete(course);
            return true;
        }
        return false;
    }

}
