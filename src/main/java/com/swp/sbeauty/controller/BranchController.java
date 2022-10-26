package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.BranchDto;
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



    @GetMapping("/branch")
    private APIResponse<Page<Branch>> getBranchWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "sort", required = false, defaultValue = "asc") String sort
            ,@RequestParam(value = "direction") String direction){
        Page<Branch> branchesWithPagination = branchService.findBranchsPaginationAndSort(page -1,pageSize,sort,direction);
        return new APIResponse<>(branchesWithPagination.getSize(),branchesWithPagination);
    }
    @GetMapping("/branch1")
    private APIResponse<Page<Branch>> getBranchWithPaginationAndSearch(@RequestParam(value = "page",required = false,defaultValue = "0") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name",required = false, defaultValue = "")  String name
            ,@RequestParam(value = "address", required = false) String address ){
        System.out.println(name);
        Pageable pageable= PageRequest.of(page,pageSize);
        Page<Branch> branches=branchService.findBranchsPaginationAndSearch(page,pageSize,name,address);
        return new APIResponse<>(branches.getSize(),branches);
    }


    @PostMapping("/branch/save")
    public ResponseEntity<BranchDto> saveBranch(@RequestBody BranchDto branchDto){
        String check = valid.validBranch(branchDto);
        if(check == ""){
            branchDto.setErrorMessage(null);
            BranchDto result = branchService.saveBranch(branchDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else {
            branchDto.setErrorMessage(check);
            return new ResponseEntity<>(branchDto,HttpStatus.BAD_REQUEST);
        }

    }


    @PutMapping ("/branch/update/{id}")
    public ResponseEntity<BranchDto> updateBranch(@RequestBody BranchDto branchDto, @PathVariable Long id){
        String check = valid.validBranch(branchDto);
        if(check == "") {
            branchDto.setErrorMessage(null);
            BranchDto result = branchService.updateBranch(branchDto, id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else {
            branchDto.setErrorMessage(check);
            return new ResponseEntity<>(branchDto,HttpStatus.BAD_REQUEST);

        }
    }
}
