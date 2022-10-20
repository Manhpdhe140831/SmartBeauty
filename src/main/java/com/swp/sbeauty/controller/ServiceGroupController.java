package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.ServiceGroupDto;
import com.swp.sbeauty.repository.ServiceGroupRepository;
import com.swp.sbeauty.service.ServiceGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ServiceGroupController {

    @Autowired
    private ServiceGroupService service;

    @GetMapping(value = "/servicegroup/list")
    public ResponseEntity<List<ServiceGroupDto>> getListServiceGroup(){
        List<ServiceGroupDto> list = service.getAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping(value="/servicegroup/search/{name}")
    public ResponseEntity<List<ServiceGroupDto>> searchByName(@PathVariable String name){
        List<ServiceGroupDto> list = service.searchServiceGroupByName(name);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping(value ="/servicegroup/add")
    public ResponseEntity<ServiceGroupDto> addServiceGroup(@RequestBody ServiceGroupDto serviceGroupDto){
        ServiceGroupDto serviceGroup = service.saveServiceGroup(serviceGroupDto);
        return new ResponseEntity<>(serviceGroup, HttpStatus.OK);
    }

    @PostMapping(value = "/servicegroup/update/{id}")
    public ResponseEntity<ServiceGroupDto> updateServiceGroup(@RequestBody ServiceGroupDto serviceGroupDto, @PathVariable Long id){
        ServiceGroupDto serviceGroup = service.updateServiceGroup(serviceGroupDto, id);
        return new ResponseEntity<>(serviceGroup, HttpStatus.OK);
    }

    @DeleteMapping(value = "/servicegroup/delete/{id}")
    public ResponseEntity<Boolean> removeServiceGroup(@PathVariable Long id){
        Boolean result = service.removeServiceGroup(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }





}
