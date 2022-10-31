package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.BranchResponseDto;
import com.swp.sbeauty.dto.ResponseDto;
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
    @GetMapping("/branch")
    private ResponseEntity<?> getBranchPagination(@RequestParam(value = "page",required = false,defaultValue = "0") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false, defaultValue = "") String name
            , @RequestParam(value = "address", required = false,defaultValue = "") String address
            , @RequestParam(value = "phone", required = false,defaultValue = "") String phone
    ){
        Pageable p = PageRequest.of(page,pageSize);
        if(name  == "" && address == "" && phone == ""){
            BranchResponseDto branchResponseDto = branchService.getAllBranch(page-1,pageSize);
            return new ResponseEntity<>(branchResponseDto,HttpStatus.OK);

        }
        else {
            BranchResponseDto branchResponseDto = branchService.getBranchAndSearch(name,address,phone,page-1,pageSize);
            return new ResponseEntity<>(branchResponseDto,HttpStatus.OK);
        }

    }



    @PostMapping(value = "/branch/save", headers="Content-Type=multipart/form-data")
    public ResponseEntity<?> saveBranch(@RequestParam(value = "name") String name,
                                        @RequestParam(value = "email") String email,
                                        @RequestParam(value = "phone") String phone,
                                        @RequestParam(value = "address") String address,
                                        @RequestParam(value = "manager") Long manager){
        String check = branchService.validateBranch(name, email, phone);
        if(check == ""){
            Boolean result = branchService.saveBranch(name, email, phone, address, manager);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }

    }


//    @PutMapping ("/branch/updateBranch")
//    public ResponseEntity<?> updateBranch(@RequestBody BranchDto branchDto, @RequestParam(value = "id",required = false) Long id){
//        String check = branchService.validateBranch(branchDto);
//        if(check == ""){
//            BranchDto result = branchService.updateBranch(branchDto, id);
//            return new ResponseEntity<>(result, HttpStatus.OK);
//        }else {
//            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
//        }
//
//    }
}
