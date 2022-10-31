package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.CourseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.CourseRepository;
import com.swp.sbeauty.repository.ServiceRepository;
import com.swp.sbeauty.service.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.*;

@org.springframework.stereotype.Service
@Transactional @Slf4j
public class CourseServiceImpl implements CourseService {

    @Autowired
    CourseRepository courseRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    BranchRepository branchRepository;

    @Override
    public Page<CourseDto> getListCourse(int offset, int pageSize) {
        Page<Course> courses  = courseRepository.findAll(PageRequest.of(offset, pageSize));
        Page<CourseDto> result = courses.map(course -> new CourseDto(course));
        return result;
    }

//    private long id;
//    private String courseCode;
//    private String name;
//    private double coursePrice;
//    private int timeOfUse;
//    private Date endOfCourse;
//    private Date discountStart;
//    private Date discountEnd;
//    private double discountPercent;
//    private String image;
//    private String description;
//    private Set<BranchDto> branches;
//    private Set<ServiceDto> services;
    @Override
    public CourseDto save(CourseDto courseDto) {
//        if (null != courseDto){
//            Course course = new Course();
//            course.setCourseCode(courseDto.getCourseCode());
//            course.setname(courseDto.getname());
//            course.setCoursePrice(courseDto.getCoursePrice());
//            course.setTimeOfUse(courseDto.getTimeOfUse());
//            course.setEndOfCourse(courseDto.getEndOfCourse());
//            course.setdiscountStart(courseDto.getdiscountStart());
//            course.setdiscountEnd(courseDto.getdiscountEnd());
//            course.setDiscountPercent(courseDto.getDiscountPercent());
//            course.setimage(courseDto.getimage());
//            course.setDescription(courseDto.getDescription());
//            Set<Branch> branchSet = new HashSet<>();
//
//            if (courseDto.getBranches() != null || courseDto.getBranches().isEmpty()){
//                for (BranchDto itemB: courseDto.getBranches()
//                ) {
//                    if (null != itemB){
//                        Branch branch = null;
//                        if (itemB.getId() != null){
//                            Optional<Branch> optionalBranch = branchRepository.findById(itemB.getId());
//                            if (optionalBranch.isPresent()){
//                                branch = optionalBranch.get();
//                            }
//                            if (null != branch){
//                                branchSet.add(branch);
//                            }
//                        }
//                    }
//                }
//                course.setBranches(branchSet);
//            }else {
//                Set<Branch> branchAll =(Set<Branch>) branchRepository.findAll();
//                for (Branch item: branchAll
//                ) {
//                    branchSet.add(item);
//                }
//                course.setBranches(branchSet);
//            }
//            Set<com.swp.sbeauty.entity.Service> serviceSet = new HashSet<>();
//            if (courseDto.getServices() != null || courseDto.getServices().isEmpty()){
//                for (ServiceDto itemS: courseDto.getServices()
//                ) {
//                    if (null != itemS){
//                        com.swp.sbeauty.entity.Service service = null;
//                        if (itemS.getId() != null){
//                            Optional<com.swp.sbeauty.entity.Service> optionalService = serviceRepository.findById(itemS.getId());
//                            if (optionalService.isPresent()){
//                                service = optionalService.get();
//                            }
//                            if (null != service){
//                                serviceSet.add(service);
//                            }
//                        }
//                    }
//                }
//                course.setServices(serviceSet);
//            }else {
//                Set<Service> serviceAll =(Set<Service>) serviceRepository.findAll();
//                for (Service item: serviceAll
//                ) {
//                    serviceSet.add(item);
//                }
//                course.setServices(serviceSet);
//            }
//
//            course = courseRepository.save(course);
//            return new CourseDto(course);
//        }
        return null;
    }

    @Override
    public Boolean remove(Long id) {
        return null;
    }

}
