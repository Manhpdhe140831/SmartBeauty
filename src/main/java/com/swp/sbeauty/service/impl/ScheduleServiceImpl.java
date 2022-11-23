package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.*;
import com.swp.sbeauty.entity.mapping.Bed_Slot_Mapping;
import com.swp.sbeauty.entity.mapping.Customer_Course_Mapping;
import com.swp.sbeauty.entity.mapping.User_Slot_Mapping;
import com.swp.sbeauty.repository.*;
import com.swp.sbeauty.repository.mappingRepo.*;
import com.swp.sbeauty.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


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
    @Autowired
    Bill_Course_History_Repository bill_course_history_repository;
    @Autowired
    Bill_Service_History_Repository bill_service_history_repository;
    @Autowired
    User_Slot_Mapping_Repository user_slot_mapping_repository;

    @Autowired
    Bed_Slot_Mapping_Repository bed_slot_mapping_repository;

    @Override
    public boolean updateCount(ScheduleDto scheduleDto) {
        if (scheduleDto.getStatus().equalsIgnoreCase("completed")) {
            Customer_Course_Mapping customer_course_mapping = customer_course_mapping_repository.findById(scheduleDto.getCourse().getId()).orElse(null);
            if (customer_course_mapping != null) {
                Integer count = customer_course_mapping.getCount();
                String customerCourseStatus = customer_course_mapping.getStatus();
                Bill_Course_History bill_course_history = scheduleRepository.getBill_Course_HistoriesBySchedule(customer_course_mapping.getId());
                if (count < bill_course_history.getTimeOfUse()) {
                    if (customerCourseStatus.equalsIgnoreCase("using")||customerCourseStatus.equalsIgnoreCase("not yet")) {
                        count++;
                        if (count == bill_course_history.getTimeOfUse()) {
                            customer_course_mapping.setStatus("completed");
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
        String status = "not yet";
        schedule.setDate(scheduleDto.getDate());
        schedule.setSlotId(scheduleDto.getSlotId());
        schedule.setBedId(scheduleDto.getBedId());
        schedule.setSaleStaffId(scheduleDto.getSaleStaffId());
        schedule.setTechnicalStaffId(scheduleDto.getTechStaffId());
        schedule.setCustomerId(scheduleDto.getCustomerId());

        schedule.setStatus(status);
        schedule.setNote(scheduleDto.getNote());
        com.swp.sbeauty.entity.Service service = serviceRepository.getServiceById(scheduleDto.getServiceId());
        Bill_Service_History bill_service_history = new Bill_Service_History();
        if (service != null) {
            bill_service_history.setServiceId(service.getId());
            bill_service_history.setName(service.getName());
            bill_service_history.setDiscountStart(service.getDiscountStart());
            bill_service_history.setDiscountEnd(service.getDiscountEnd());
            bill_service_history.setDiscountPercent(service.getDiscountPercent());
            bill_service_history.setPrice(service.getPrice());
            bill_service_history.setDescription(service.getDescription());
            bill_service_history.setDuration(service.getDuration());
            bill_service_history.setImage(service.getImage());
            bill_service_history = bill_service_history_repository.save(bill_service_history);
            Long serviceId = bill_service_history.getId();
            schedule.setServiceId(serviceId);

       }
        Customer_Course_Mapping customer_course_mapping_check = scheduleRepository.getCustomerCourseBySchedule(scheduleDto.getCustomerId(), scheduleDto.getCourseId());

        if (scheduleDto.getCourseId() != null){
        if (customer_course_mapping_check == null){
            Course course = courseRepository.getCourseById(scheduleDto.getCourseId());
            Bill_Course_History bill_course_history = new Bill_Course_History();
            bill_course_history.setCourse_id(course.getId());
            bill_course_history.setCode(course.getCode());
            bill_course_history.setName(course.getName());
            bill_course_history.setPrice(course.getPrice());
            bill_course_history.setDuration(course.getDuration());
            bill_course_history.setTimeOfUse(course.getTimeOfUse());
            bill_course_history.setDiscountStart(course.getDiscountStart());
            bill_course_history.setDiscountEnd(course.getDiscountEnd());
            bill_course_history.setDiscountPercent(course.getDiscountPercent());
            bill_course_history.setImage(course.getImage());
            bill_course_history.setDescription(course.getDescription());
            bill_course_history = bill_course_history_repository.save(bill_course_history);
            Long courseHistory = bill_course_history.getId();
            schedule.setCourseId(courseHistory);

        }else if (customer_course_mapping_check != null) {
            Customer_Course_Mapping customer_course_mapping = scheduleRepository.getCustomerCourseBySchedule(scheduleDto.getCustomerId(), scheduleDto.getCourseId());
            if (customer_course_mapping != null) {
                schedule.setCourseHistoryId(customer_course_mapping.getId());
            }
        }

        }else{
           schedule.setCourseHistoryId(null);
           schedule.setCourseId(null);
        }



        if (null != schedule){
            schedule = scheduleRepository.save(schedule);
            user_slot_mapping_repository.save(new User_Slot_Mapping(schedule.getTechnicalStaffId(), schedule.getSlotId(), schedule.getDate()));
            bed_slot_mapping_repository.save(new Bed_Slot_Mapping(schedule.getBedId(), schedule.getSlotId(), schedule.getDate()));
            if (schedule.getServiceId() != null){
                Bill_Service_History bill_service_history1 = bill_service_history_repository.findById(schedule.getServiceId()).orElse(null);
                bill_service_history1.setScheduleId(schedule.getId());
                bill_service_history_repository.save(bill_service_history1);
            }
            if (schedule.getCourseId() != null){
                Bill_Course_History bill_course_history = bill_course_history_repository.getBill_Course_HistoriesById(schedule.getCourseId());
                bill_course_history.setScheduleId(schedule.getId());
                bill_course_history_repository.save(bill_course_history);
            }
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
            Integer count = customer_course_mapping.getCount() + 1;

            Course course = courseRepository.findById(customer_course_mapping.getCourse_id()).orElse(null);
            courseDto = new CourseDto(customer_course_mapping.getId(), course.getCode(), course.getName(), course.getPrice(), course.getDuration(), course.getTimeOfUse(), course.getDiscountStart(), course.getDiscountEnd(), course.getDiscountPercent(), course.getImage(),course.getDescription(), count);


        }
        if (courseId != null){


            Bill_Course_History bill_course_history = bill_course_history_repository.getBill_Course_HistoriesById(courseId);

            courseDto = new CourseDto(bill_course_history.getId(), bill_course_history.getCode(), bill_course_history.getName(), bill_course_history.getPrice(), bill_course_history.getDuration(), bill_course_history.getTimeOfUse(), bill_course_history.getDiscountStart(), bill_course_history.getDiscountEnd(), bill_course_history.getDiscountPercent(), bill_course_history.getImage(), bill_course_history.getDescription());
        }
        ServiceDto serviceDto = null;
            if (schedule.getServiceId() != null){
                Bill_Service_History bill_service_history = bill_service_history_repository.findById(schedule.getServiceId()).orElse(null);
                if (bill_service_history != null){
                    serviceDto = new ServiceDto(bill_service_history.getId(), bill_service_history.getName(), bill_service_history.getDiscountStart(), bill_service_history.getDiscountEnd() , bill_service_history.getDiscountPercent(), bill_service_history.getPrice(), bill_service_history.getDescription(), bill_service_history.getDuration(), bill_service_history.getImage());

                }
            }
        ScheduleDto scheduleDto = new ScheduleDto(idSchedule, date, slotDto, bedDto, saleStaffDto, techStaffDto, customerDto, courseDto, serviceDto, status, note);
        if (scheduleDto != null){
            return scheduleDto;
        }else{
            return null;
        }
    }

    @Override
    public boolean update(Long id, ScheduleDto scheduleDto) {
        Schedule schedule = scheduleRepository.findById(id).orElse(null);
       User_Slot_Mapping user_slot_mapping = user_slot_mapping_repository.getUser_Slot_MappingBySchedule(schedule.getTechnicalStaffId(), schedule.getSlotId(), schedule.getDate());
       Bed_Slot_Mapping bed_slot_mapping = bed_slot_mapping_repository.getBed_Slot_MappingBySchedule(schedule.getBedId(), schedule.getSlotId(), schedule.getDate());
       user_slot_mapping_repository.delete(user_slot_mapping);
       bed_slot_mapping_repository.delete(bed_slot_mapping);
        String status = "not yet";
        schedule.setDate(scheduleDto.getDate());

        schedule.setSlotId(scheduleDto.getSlotId());
        schedule.setBedId(scheduleDto.getBedId());
        schedule.setSaleStaffId(scheduleDto.getSaleStaffId());
        schedule.setTechnicalStaffId(scheduleDto.getTechStaffId());
        schedule.setCustomerId(scheduleDto.getCustomerId());

        schedule.setStatus(status);
        schedule.setNote(scheduleDto.getNote());

        com.swp.sbeauty.entity.Service service = serviceRepository.getServiceById(scheduleDto.getService().getId());
        Bill_Service_History bill_service_history = bill_service_history_repository.findById(schedule.getServiceId()).orElse(null);
        bill_service_history.setServiceId(service.getId());
        bill_service_history.setName(service.getName());
        bill_service_history.setDiscountStart(service.getDiscountStart());
        bill_service_history.setDiscountEnd(service.getDiscountEnd());
        bill_service_history.setDiscountPercent(service.getDiscountPercent());
        bill_service_history.setPrice(service.getPrice());
        bill_service_history.setDescription(service.getDescription());
        bill_service_history.setDuration(service.getDuration());
        bill_service_history.setImage(service.getImage());
        bill_service_history = bill_service_history_repository.save(bill_service_history);


        if (scheduleDto.getCourse() != null){
            String statusCourse = scheduleDto.getCourse().getStatus();
            if ("not yet".equalsIgnoreCase(statusCourse)){
                Course course = courseRepository.getCourseById(scheduleDto.getCourse().getId());
                Bill_Course_History bill_course_history = bill_course_history_repository.getBill_Course_HistoriesById(schedule.getCourseId());
                bill_course_history.setCourse_id(course.getId());
                bill_course_history.setCode(course.getCode());
                bill_course_history.setName(course.getName());
                bill_course_history.setPrice(course.getPrice());
                bill_course_history.setDuration(course.getDuration());
                bill_course_history.setTimeOfUse(course.getTimeOfUse());
                bill_course_history.setDiscountStart(course.getDiscountStart());
                bill_course_history.setDiscountEnd(course.getDiscountEnd());
                bill_course_history.setDiscountPercent(course.getDiscountPercent());
                bill_course_history.setImage(course.getImage());
                bill_course_history.setDescription(course.getDescription());
                bill_course_history = bill_course_history_repository.save(bill_course_history);

            }else if ("using".equalsIgnoreCase(statusCourse)) {
                Customer_Course_Mapping customer_course_mapping = customer_course_mapping_repository.findById(scheduleDto.getCourse().getId()).orElse(null);
                if (customer_course_mapping != null) {
                    schedule.setCourseHistoryId(customer_course_mapping.getId());
                }
            }

        }else{
            schedule.setCourseHistoryId(null);
            schedule.setCourseId(null);
        }
        if (null != schedule){
            schedule = scheduleRepository.save(schedule);
            user_slot_mapping_repository.save(new User_Slot_Mapping(schedule.getTechnicalStaffId(), schedule.getSlotId(), schedule.getDate()));
            bed_slot_mapping_repository.save(new Bed_Slot_Mapping(schedule.getBedId(), schedule.getSlotId(), schedule.getDate()));
            return true;
        }else{
            return false;
        }

    }

    @Override
    public List<ScheduleDto> getAllByDate(String dateRes) {
        List<ScheduleDto> result = new ArrayList<>();
        List<Schedule> list = new ArrayList<>();
        if (dateRes != null){
            list = scheduleRepository.getAllByDate(dateRes);
        }if (dateRes == null){
            list = scheduleRepository.findAll();
        }
        for (Schedule itemS:list
             ) {

            Long scheduleId = itemS.getId();
            String date = itemS.getDate();
            SlotDto slot = new SlotDto(slotRepository.findById(itemS.getSlotId()).orElse(null));
            SpaBedDto bed = new SpaBedDto(bedRepository.findById(itemS.getBedId()).orElse(null));
            UserDto saleStaff = new UserDto(userRepository.findById(itemS.getSaleStaffId()).orElse(null));
            UserDto techStaff = new UserDto(userRepository.findById(itemS.getTechnicalStaffId()).orElse(null));
            CustomerDto customer = new CustomerDto(customerRepository.findById(itemS.getCustomerId()).orElse(null));
            String status = itemS.getStatus();
            String note = itemS.getNote();
            Long courseId = itemS.getCourseId();
            Long customerCourseHistory = itemS.getCourseHistoryId();


            CourseDto courseDto = null;
            if (customerCourseHistory != null){
                Customer_Course_Mapping customer_course_mapping = customer_course_mapping_repository.findById(itemS.getCourseHistoryId()).orElse(null);
                Integer count = customer_course_mapping.getCount() + 1;

                Course course = courseRepository.findById(customer_course_mapping.getCourse_id()).orElse(null);
                courseDto = new CourseDto(customer_course_mapping.getId(), course.getCode(), course.getName(), course.getPrice(), course.getDuration(), course.getTimeOfUse(), course.getDiscountStart(), course.getDiscountEnd(), course.getDiscountPercent(), course.getImage(),course.getDescription(), count);


            }
            if (courseId != null){


                Bill_Course_History bill_course_history = bill_course_history_repository.getBill_Course_HistoriesById(courseId);

                courseDto = new CourseDto(bill_course_history.getId(), bill_course_history.getCode(), bill_course_history.getName(), bill_course_history.getPrice(), bill_course_history.getDuration(), bill_course_history.getTimeOfUse(), bill_course_history.getDiscountStart(), bill_course_history.getDiscountEnd(), bill_course_history.getDiscountPercent(), bill_course_history.getImage(), bill_course_history.getDescription());
            }
            ServiceDto serviceDto = null;
            if (itemS.getServiceId() != null){
                Bill_Service_History bill_service_history = bill_service_history_repository.findById(itemS.getServiceId()).orElse(null);
                if (bill_service_history != null){
                    serviceDto = new ServiceDto(bill_service_history.getId(), bill_service_history.getName(), bill_service_history.getDiscountStart(), bill_service_history.getDiscountEnd() , bill_service_history.getDiscountPercent(), bill_service_history.getPrice(), bill_service_history.getDescription(), bill_service_history.getDuration(), bill_service_history.getImage());

                }
            }
            ScheduleDto scheduleDto = new ScheduleDto(scheduleId, date, slot, bed, saleStaff, techStaff, customer, courseDto, serviceDto, status, note);
            result.add(scheduleDto);
        }
        return result;
        
    }


}
