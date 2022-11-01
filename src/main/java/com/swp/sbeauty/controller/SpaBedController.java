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

    @GetMapping("/bed/getById")
    public ResponseEntity<SpaBedDto> getSpaBedById(@RequestParam(value = "id",required = false) Long id) {
        SpaBedDto result = spaBedService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
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
    @PostMapping(value = "/bed/save", headers="Content-Type=multipart/form-data")
    public ResponseEntity<?> saveBed(@RequestParam(value = "name") String name,
                                        @RequestParam(value = "branch") Long branch){
        String check = spaBedService.validateSpaBed(name);
        if(check == ""){
            Boolean result = spaBedService.saveSpaBed(name, branch);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }

    }
    @PutMapping ("/bed/update")
    public ResponseEntity<?> updateBed(@RequestParam(value = "id") Long id,
                                          @RequestParam(value = "name", required = false) String name,
                                          @RequestParam(value = "branch", required = false) Long branch){
        String check = spaBedService.validateSpaBed(name);
        if(check == ""){
            Boolean result = spaBedService.updateSpaBed(id, name, branch);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }

    }

}
