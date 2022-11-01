package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.SpaBed;
import com.swp.sbeauty.service.SpaBedService;
import com.swp.sbeauty.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SpaBedController {
    @Autowired
    private SpaBedService spaBedService;

    @PostMapping("/bed/save")
    public ResponseEntity<SpaBedDto> saveBed(@RequestBody SpaBedDto spaBedDto){
        SpaBedDto result = spaBedService.saveBed(spaBedDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/bed/updateSpaBed")
    public ResponseEntity<SpaBedDto> updateBed(@RequestBody SpaBedDto spaBedDto, @RequestParam(value = "id",required = false) Long id) {
        SpaBedDto result = spaBedService.updateBed(spaBedDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/bed/getById")
    public ResponseEntity<SpaBedDto> getSpaBedById(@RequestParam(value = "id",required = false) Long id) {
        SpaBedDto result = spaBedService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/bed/getAllBed")
    private APIResponse<Page<SpaBed>> getSpaBedWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false,defaultValue = "") String name){
        Page<SpaBed> spaBedsWithPagination;
        if(name  == "" ||name == null){
            spaBedsWithPagination = spaBedService.getAllSpaBedPagination(page -1,pageSize);
        }
        else {
            spaBedsWithPagination = spaBedService.findSpaBedPaginationAndSearch(page -1,pageSize,name);
        }
        return new APIResponse<>(spaBedsWithPagination.getSize(),spaBedsWithPagination);
    }

    @GetMapping("/bed")
    private ResponseEntity<?> getCategoryPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false,defaultValue = "") String name){
        Pageable p = PageRequest.of(page,pageSize);
        if(name  == "" ||name == null){
            SpaBedResponseDto spaBedResponseDto = spaBedService.getAllSpaBed(page -1,pageSize);
            return new ResponseEntity<>(spaBedResponseDto,HttpStatus.OK);
        }
        else {
            SpaBedResponseDto spaBedResponseDto = spaBedService.getSpaBedAndSearch(name,page -1,pageSize);
            return new ResponseEntity<>(spaBedResponseDto,HttpStatus.OK);
        }
    }

}
