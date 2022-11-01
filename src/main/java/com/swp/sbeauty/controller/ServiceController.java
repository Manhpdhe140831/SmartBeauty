package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.dto.ServiceResponseDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.service.ServiceSpaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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


    @GetMapping(value = "/service/getallservice")

    private ResponseEntity<?> getServiceWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false, defaultValue = "") String name
            ){
        Pageable p = PageRequest.of(page, pageSize);
        ServiceResponseDto serviceResponseDto = null;
        if (name==""){
            serviceResponseDto = service.getAll(page -1, pageSize);
            return new ResponseEntity<>(serviceResponseDto,HttpStatus.OK);
        }else {
            serviceResponseDto = service.getListServicePaginationAndSearch(name, page-1, pageSize);
            return new ResponseEntity<>(serviceResponseDto, HttpStatus.OK);
        }

    }
    @GetMapping(value = "/service/getservice")
    public ResponseEntity<ServiceDto> getServiceById(@RequestParam("id") Long id){
        ServiceDto serviceDto = service.getServiceById(id);
        return new ResponseEntity<>(serviceDto, HttpStatus.OK);
    }




}
