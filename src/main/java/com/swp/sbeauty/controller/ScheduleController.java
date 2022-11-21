package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.ResponseDto;
import com.swp.sbeauty.dto.ScheduleDto;
import com.swp.sbeauty.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ScheduleController {

    @Autowired
    ScheduleService scheduleService;

    @PostMapping("/schedule/updatecount")
    public ResponseEntity<?> updateCount(@RequestBody ScheduleDto scheduleDto){
        boolean check = scheduleService.updateCount(scheduleDto);
        if (check == true) {
            return new ResponseEntity<>(check, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ResponseDto<>(400, "Liệu trình đã sử dụng hết"), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/schedule/create")
    public ResponseEntity<?> saveSchedule(@RequestBody ScheduleDto scheduleDto){
        boolean result = scheduleService.save(scheduleDto);
        if (result == true) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ResponseDto<>(400, "khog them duoc"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/schedule/getbyid")
    public ResponseEntity<?> getScheduleById(@RequestParam("id") Long id){
        ScheduleDto scheduleDto = scheduleService.getScheduleById(id);
        return new ResponseEntity<>(scheduleDto, HttpStatus.OK);
    }

    @GetMapping("/schedule")
    public ResponseEntity<?> getAllSchedule(){
        List<ScheduleDto> result = scheduleService.getAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("schedule/update")
    public ResponseEntity<?> updateSchedule(@RequestParam("id") Long id, @RequestBody ScheduleDto scheduleDto){
        boolean result = scheduleService.update(id, scheduleDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
