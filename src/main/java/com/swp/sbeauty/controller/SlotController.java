package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.CustomerDto;
import com.swp.sbeauty.dto.ResponseDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.dto.SlotDto;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.SlotService;
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
public class SlotController {
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    SlotService service;
    @GetMapping("/slot")
    private ResponseEntity<?> getAllSlot(@RequestHeader("Authorization") String authHeader){
        if(authHeader != null){
            Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
            String id = temp.get("id").toString();
            Date expir = temp.getExpiration();
            if(expir.before(new Date())){
                return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
            } else {
                Long idCheck = Long.parseLong(id);
                List<SlotDto> list = service.getAllSlot(idCheck);
                return new ResponseEntity<>(list, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new ResponseDto<>(404, "Not logged in"), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/slot/create")
    public ResponseEntity<?> saveSlot(@RequestHeader("Authorization") String authHeader,
                                          @RequestBody SlotDto slotDto) {
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        Date expir = temp.getExpiration();
        if (expir.before(new Date())) {
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
        } else {
            Boolean result = service.saveSlot(slotDto, authHeader);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }


}
