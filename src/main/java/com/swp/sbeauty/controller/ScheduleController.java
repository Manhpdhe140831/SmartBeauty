package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.ResponseDto;
import com.swp.sbeauty.dto.ScheduleDto;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.ScheduleService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ScheduleController {

    @Autowired
    ScheduleService scheduleService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/schedule/updateStatus")
    public ResponseEntity<?> updateCount(@RequestBody ScheduleDto scheduleDto){
        boolean check = scheduleService.updateCount(scheduleDto);
        if (check == true) {
            return new ResponseEntity<>(check, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ResponseDto<>(400, "Liệu trình đã sử dụng hết"), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/schedule/create")
    public ResponseEntity<?> saveSchedule(@RequestBody ScheduleDto scheduleDto,
                                          @RequestHeader("Authorization") String authHeader){
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        if(temp!=null){
            Long idSale = Long.parseLong(temp.get("id").toString());
            Date expir = temp.getExpiration();
            if(expir.before(new Date())){
                return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
            }else {
                boolean result = scheduleService.save(scheduleDto, idSale);
                if (result == true) {
                    return new ResponseEntity<>(result, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(new ResponseDto<>(400, "khog them duoc"), HttpStatus.BAD_REQUEST);
                }
            }
        } else {
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
        }

    }

    @GetMapping("/schedule/getById")
    public ResponseEntity<?> getScheduleById(@RequestParam("id") Long id){
        ScheduleDto scheduleDto = scheduleService.getScheduleById(id);
        return new ResponseEntity<>(scheduleDto, HttpStatus.OK);
    }

    @GetMapping("/schedule")
    public ResponseEntity<?> getAllSchedule(@RequestParam(value = "date", required = false) String date,
                                            @RequestHeader("Authorization") String authHeader){
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        if(temp!=null){
            Long idSale = Long.parseLong(temp.get("id").toString());
            Date expir = temp.getExpiration();
            if(expir.before(new Date())){
                return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
            } else {
                List<ScheduleDto> result = scheduleService.getAllByDate(date, idSale);
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("schedule/update")
    public ResponseEntity<?> updateSchedule(@RequestParam("id") Long id, @RequestBody ScheduleDto scheduleDto){
        boolean result = scheduleService.update(id, scheduleDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
