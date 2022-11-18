package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.ScheduleDto;
import com.swp.sbeauty.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ScheduleController {

    @Autowired
    ScheduleService scheduleService;

    @PostMapping("/schedule/updatecount")
    public ResponseEntity<?> updateCount(@RequestBody ScheduleDto scheduleDto){
        boolean check = scheduleService.updateCount(scheduleDto);
        return new ResponseEntity<>(false, HttpStatus.OK);
    }


}
