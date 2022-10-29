package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.service.BranchService;
import com.swp.sbeauty.validation.ValidInputDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BranchController {
    @Autowired
    private BranchService branchService;

    ValidInputDto valid = new ValidInputDto();
    @GetMapping("/branch/getById")
    public ResponseEntity<BranchDto> getById(@RequestParam(value = "id",required = false) Long id) {
        BranchDto result = branchService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }


    @GetMapping("/branch/getAllbranch")
    private APIResponse<Page<Branch>> getBranchWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false, defaultValue = "") String name
            , @RequestParam(value = "address", required = false,defaultValue = "") String address
            , @RequestParam(value = "phone", required = false,defaultValue = "") String phone
            ){
        Page<Branch> branchesWithPagination;
        if(name  == "" && address == "" && phone == ""){
            branchesWithPagination = branchService.findBranchsPaginationAndSort(page -1,pageSize);
        }
        else {
            branchesWithPagination = branchService.findBranchsPaginationAndSearch(name,address,phone,page -1,pageSize);
        }
        return new APIResponse<>(branchesWithPagination.getSize(),branchesWithPagination);
    }



    @PostMapping("/branch/save")
    public ResponseEntity<BranchDto> saveBranch(@RequestBody BranchDto branchDto){
            BranchDto result = branchService.saveBranch(branchDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PutMapping ("/branch/updateBranch")
    public ResponseEntity<BranchDto> updateBranch(@RequestBody BranchDto branchDto, @RequestParam(value = "id",required = false) Long id){
            BranchDto result = branchService.updateBranch(branchDto, id);
            return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
