package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.ScheduleDto;
import com.swp.sbeauty.entity.Bill_Course_History;
import com.swp.sbeauty.entity.Schedule;
import com.swp.sbeauty.entity.mapping.Customer_Course_Mapping;
import com.swp.sbeauty.repository.ScheduleRepository;
import com.swp.sbeauty.repository.mappingRepo.Customer_Course_Mapping_Repository;
import com.swp.sbeauty.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    ScheduleRepository scheduleRepository;
    @Autowired
    Customer_Course_Mapping_Repository customer_course_mapping_repository;

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
}
