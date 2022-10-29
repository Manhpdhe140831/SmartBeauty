package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.SpaBedDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.service.SpaBedService;
import com.swp.sbeauty.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/bed/list")
    public ResponseEntity<List<SpaBedDto>> getUsers(){
        return ResponseEntity.ok().body(spaBedService.getBeds());
    }

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
}
