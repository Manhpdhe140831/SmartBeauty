package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.service.SupplierService;
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
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @GetMapping("/supplier/getById")
    public ResponseEntity<SupplierDto> getSupplierById(@RequestParam(value = "id",required = false) Long id) {
        SupplierDto result = supplierService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/supplier/save")
    public ResponseEntity<?> saveSupplier(@Valid @RequestBody SupplierDto supplierDto){
        String check = supplierService.validateUser(supplierDto);
        if(check == ""){
            SupplierDto result = supplierService.saveSupplier(supplierDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }

    }
    @PutMapping ("/supplier/updateSupplier")
    public ResponseEntity<?> updateSupplier(@Valid @RequestBody SupplierDto supplierDto, @RequestParam(value = "id",required = false) Long id){
        String check = supplierService.validateUser(supplierDto);
        if(check == "") {
            SupplierDto result = supplierService.updateSupplier(supplierDto, id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }
    }
    /*@GetMapping("/supplier/getAllSupplier")
    private APIResponse<Page<Supplier>> getBranchWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false, defaultValue = "") String name
            , @RequestParam(value = "address", required = false,defaultValue = "") String address
            , @RequestParam(value = "phone", required = false,defaultValue = "") String phone
    ){
        Page<Supplier> suppliersWithPagination;
        if(name  == "" && address == "" && phone == ""){
            suppliersWithPagination = supplierService.getAllSupplierPagination(page -1,pageSize);
        }
        else {
            suppliersWithPagination = supplierService.getSupplierPaginationAndSearch(name,address,phone,page -1,pageSize);
        }
        return new APIResponse<>(suppliersWithPagination.getSize(),suppliersWithPagination);
    }*/
    @GetMapping("/supplier")
    private ResponseEntity<?> getSupplierPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false, defaultValue = "") String name
            , @RequestParam(value = "address", required = false,defaultValue = "") String address
            , @RequestParam(value = "phone", required = false,defaultValue = "") String phone
    ){
        Pageable p = PageRequest.of(page,pageSize);
        if(name  == "" && address == "" && phone == ""){
            SupplierResponseDto supplierResponseDto = supplierService.getAllSupplier(page-1,pageSize);
            return new ResponseEntity<>(supplierResponseDto,HttpStatus.OK);

        }
        else {
            SupplierResponseDto supplierResponseDto = supplierService.getSupplierAndSearch(name,address,phone,page-1,pageSize);
            return new ResponseEntity<>(supplierResponseDto,HttpStatus.OK);
        }

    }
}
