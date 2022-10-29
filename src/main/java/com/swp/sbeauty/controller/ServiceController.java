package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.service.ServiceSpaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ServiceController {
    @Autowired
    private ServiceSpaService service;
    @GetMapping(value = "/service/{offset}/{pageSize}")
    public ResponseEntity<Page<ServiceDto>> getAllService(@PathVariable int offset, @PathVariable int pageSize){
        Page<ServiceDto> pageService = service.getListServiceSpa(offset, pageSize);
        return new ResponseEntity<>(pageService, HttpStatus.OK);
    }




}
