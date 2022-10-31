package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Service;
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
//    @GetMapping(value = "/service/{offset}/{pageSize}")
//    public ResponseEntity<Page<Service>> getAllService(@PathVariable int offset, @PathVariable int pageSize){
//        Page<Service> pageService = service.getListServiceSpa(offset, pageSize);
//        return new ResponseEntity<>(pageService, HttpStatus.OK);
//    }
//    @GetMapping(value = "/service/getbyid")
//    public ResponseEntity<ServiceDto> getServiceById(@RequestParam("id") Long id){
//        ServiceDto serviceDto = service.getServiceById(id);
//        return new ResponseEntity<>(serviceDto, HttpStatus.OK);
//    }

    @GetMapping(value = "/service/getallservice")

    private APIResponse<Page<Service>> getServiceWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false, defaultValue = "") String name
            ){
        Page<Service> servicePage;
        if (name==""){
            servicePage = service.getListServiceSpaWithPagination(page-1, pageSize);
        }else {
            servicePage = service.getListServicePaginationAndSearch(name, page-1, pageSize);
        }
        return new APIResponse<>(servicePage.getSize(), servicePage);
    }
    @GetMapping(value = "/service/getservice")
    public ResponseEntity<ServiceDto> getServiceById(@RequestParam("id") Long id){
        ServiceDto serviceDto = service.getServiceById(id);
        return new ResponseEntity<>(serviceDto, HttpStatus.OK);
    }




}
