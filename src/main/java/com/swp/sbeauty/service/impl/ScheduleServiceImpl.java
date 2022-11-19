package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.*;
import com.swp.sbeauty.entity.mapping.Customer_Course_Mapping;
import com.swp.sbeauty.repository.*;
import com.swp.sbeauty.repository.mappingRepo.Customer_Course_Mapping_Repository;
import com.swp.sbeauty.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    ScheduleRepository scheduleRepository;
    @Autowired
    Customer_Course_Mapping_Repository customer_course_mapping_repository;
    @Autowired
    SpaBedRepository bedRepository;
    @Autowired
    SlotRepository slotRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CourseRepository courseRepository;
    @Autowired
    ServiceRepository serviceRepository;

    @Override
    public boolean updateCount(ScheduleDto scheduleDto) {

//        Long id = scheduleDto.getId();
//        Schedule schedule = scheduleRepository.findById(id).orElse(null);
        if (scheduleDto.getStatus().equalsIgnoreCase("dahoanthanh")) {
            Customer_Course_Mapping customer_course_mapping = customer_course_mapping_repository.findById(scheduleDto.getCourse().getId()).orElse(null);
            if (customer_course_mapping != null) {
                Integer count = customer_course_mapping.getCount();
                String customerCourseStatus = customer_course_mapping.getStatus();
                Bill_Course_History bill_course_history = scheduleRepository.getBill_Course_HistoriesBySchedule(customer_course_mapping.getId());
                if (count < bill_course_history.getTimeOfUse()) {
                    if (customerCourseStatus.equalsIgnoreCase("dangsudung")||customerCourseStatus.equalsIgnoreCase("chuasudung")) {
                        count++;
                        if (count == bill_course_history.getTimeOfUse()) {
                            customer_course_mapping.setStatus("dahoanthanh");
                            customer_course_mapping.setCount(count);
                            customer_course_mapping_repository.save(customer_course_mapping);
                            return true;
                        } else {
                            customer_course_mapping.setCount(count);
                            Customer_Course_Mapping customer_course_mapping1 = customer_course_mapping;
                            customer_course_mapping_repository.save(customer_course_mapping1);
                            return true;
                        }
                    }
                }

            }
            return false;
        }
        return false;
    }

    @Override
    public boolean save(ScheduleDto scheduleDto) {
        Schedule schedule = new Schedule();
        String status = "khachchuaden";
        schedule.setDate(scheduleDto.getDate());
        schedule.setSlotId(scheduleDto.getSlot().getId());
        schedule.setBedId(scheduleDto.getBed().getId());
        schedule.setSaleStaffId(scheduleDto.getSale_staff().getId());
        schedule.setTechnicalStaffId(scheduleDto.getTech_staff().getId());
        schedule.setCustomerId(scheduleDto.getCustomer().getId());
        schedule.setStatus(status);
        schedule.setNote(scheduleDto.getNote());
        Customer_Course_Mapping customer_course_mapping = customer_course_mapping_repository.findById(scheduleDto.getCourse().getId()).orElse(null);
        String customerCourseStatus = customer_course_mapping.getStatus();
        if ("chuasudung".equalsIgnoreCase(customerCourseStatus)){
            schedule.setCourseId(scheduleDto.getCourse().getId());
        }else if ("dangsudung".equalsIgnoreCase(customerCourseStatus)){
            schedule.setCourseHistoryId(scheduleDto.getCourse().getId());
        }else{
           schedule.setCourseHistoryId(null);
           schedule.setCourseId(null);
        }
        if (null != schedule){
            scheduleRepository.save(schedule);
            return true;
        }else{
            return false;
        }

    }

    @Override
   public ScheduleDto getScheduleById(Long id) {
        Schedule schedule = scheduleRepository.findById(id).orElse(null);
        Long idSchedule = schedule.getId();
        String date = schedule.getDate();
        Slot slot = slotRepository.findById(schedule.getSlotId()).orElse(null);
        SlotDto slotDto = new SlotDto(slot);
        SpaBed bed = bedRepository.findById(schedule.getBedId()).orElse(null);
        SpaBedDto bedDto = new SpaBedDto(bed);
        Users saleStaff = userRepository.findById(schedule.getSaleStaffId()).orElse(null);
        UserDto saleStaffDto = new UserDto(saleStaff);
        Users techStaff = userRepository.findById(schedule.getTechnicalStaffId()).orElse(null);
        UserDto techStaffDto = new UserDto(techStaff);
        Customer customer = customerRepository.findById(schedule.getCustomerId()).orElse(null);
        CustomerDto customerDto = new CustomerDto(customer);
        String status = schedule.getStatus();
        String note = schedule.getNote();
        Long courseId = schedule.getCourseId();
        Long customerCourseHistory = schedule.getCourseHistoryId();
        CourseDto courseDto = null;
        if (customerCourseHistory != null){
            Customer_Course_Mapping customer_course_mapping = customer_course_mapping_repository.findById(schedule.getCourseHistoryId()).orElse(null);
            Course course = courseRepository.findById(customer_course_mapping.getCourse_id()).orElse(null);
            courseDto = new CourseDto(course);
        }
        if (courseId != null){
            // temp
            Customer_Course_Mapping customer_course_mapping = customer_course_mapping_repository.findById(schedule.getCourseId()).orElse(null);
            Course course = courseRepository.findById(customer_course_mapping.getCourse_id()).orElse(null);
            courseDto = new CourseDto(course);
        }
        com.swp.sbeauty.entity.Service service = serviceRepository.findById(schedule.getServiceId()).orElse(null);
        ServiceDto serviceDto = null;
        if (service != null){
            serviceDto = new ServiceDto(service);
        }


        ScheduleDto scheduleDto = new ScheduleDto(idSchedule, date, slotDto, bedDto, saleStaffDto, techStaffDto, customerDto, courseDto, serviceDto, status, note);
        if (scheduleDto != null){
            return scheduleDto;
        }else{
            return null;
        }

    }
}
