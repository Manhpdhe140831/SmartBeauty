package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BranchController {
    @Autowired
    private BranchService branchService;

    @GetMapping("/branch/list")
    public ResponseEntity<List<BranchDto>> getBranch(){
        return ResponseEntity.ok().body(branchService.getBranch());
    }

    @PostMapping("/branch/save")
    public ResponseEntity<BranchDto> saveBranch(@RequestBody BranchDto branchDto){
        BranchDto result = branchService.saveBranch(branchDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/branch/update")
    public ResponseEntity<BranchDto> updateBranch(@RequestBody BranchDto branchDto, @PathVariable Long id){
        BranchDto result = branchService.updateBranch(branchDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
