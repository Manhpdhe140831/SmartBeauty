package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    @GetMapping("/branch/paging")
    private APIResponse<List<Branch>> getAllBranch(){
        List<Branch> allBranchs = branchService.findAllBranchs();
        return new APIResponse<>(allBranchs.size(),allBranchs);
    }
    @GetMapping("/branch/{field}")
    private APIResponse<List<Branch>> getBranchWithSort(@PathVariable String field){
        List<Branch> allBranchs = branchService.findBranchsWithSorting(field);
        return new APIResponse<>(allBranchs.size(),allBranchs);
    }


    @GetMapping("/branch/pagination/page={offset}")
    private APIResponse<Page<Branch>> getBranchWithPagination(@PathVariable int offset){
        int pageSize =2;
        Page<Branch> branchesWithPagination = branchService.findBranchsWithPaginnation(offset,pageSize);
        return new APIResponse<>(branchesWithPagination.getSize(),branchesWithPagination);
    }

    @GetMapping("/branch/paging/page={offset}/{field}")
    private APIResponse<Page<Branch>> getBranchWithPaginationAndSort(@PathVariable int offset,@PathVariable String field){
        int pageSize =2;
        Page<Branch> branchesWithPagination = branchService.findBranchsWithPaginnationAnSort(offset,pageSize,field);
        return new APIResponse<>(branchesWithPagination.getSize(),branchesWithPagination);
    }
    @PostMapping("/branch/save")
    public ResponseEntity<BranchDto> saveBranch(@RequestBody BranchDto branchDto){
        BranchDto result = branchService.saveBranch(branchDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/branch/update/{id}")
    public ResponseEntity<BranchDto> updateBranch(@RequestBody BranchDto branchDto, @PathVariable Long id){
        BranchDto result = branchService.updateBranch(branchDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
