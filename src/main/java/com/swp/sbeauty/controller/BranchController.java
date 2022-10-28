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
    @GetMapping("/branch/list")
    public ResponseEntity<List<BranchDto>> getBranch(){
        return ResponseEntity.ok().body(branchService.getBranch());
    }
    @GetMapping("/branch/{id}")
    public ResponseEntity<BranchDto> getById(@PathVariable Long id) {
        BranchDto result = branchService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/branch/paging")
    private APIResponse<List<Branch>> getAllBranch(){
        List<Branch> allBranchs = branchService.findAllBranchs();
        return new APIResponse<>(allBranchs.size(),allBranchs);
    }
    /*@GetMapping("/branch/{field}")
    private APIResponse<List<Branch>> getBranchWithSort(@PathVariable String field){
        List<Branch> allBranchs = branchService.findBranchsWithSorting(field);
        return new APIResponse<>(allBranchs.size(),allBranchs);
    }*/



    @GetMapping("/branch")
    private APIResponse<Page<Branch>> getBranchWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "value", required = false) String value
            ){
        Page<Branch> branchesWithPagination;
        if(value  == "" ||value == null){
            branchesWithPagination = branchService.findBranchsPaginationAndSort(page -1,pageSize);
        }
        else {
            branchesWithPagination = branchService.findBranchsPaginationAndSearch(page -1,pageSize,value);
        }
        return new APIResponse<>(branchesWithPagination.getSize(),branchesWithPagination);
    }



    @PostMapping("/branch/save")
    public ResponseEntity<BranchDto> saveBranch(@RequestBody BranchDto branchDto){
            BranchDto result = branchService.saveBranch(branchDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PutMapping ("/branch/update/id={id}")
    public ResponseEntity<BranchDto> updateBranch(@RequestBody BranchDto branchDto, @PathVariable Long id){
            BranchDto result = branchService.updateBranch(branchDto, id);
            return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
