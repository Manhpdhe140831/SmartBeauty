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
    @PostMapping(value = "/supplier/create", headers="Content-Type=multipart/form-data")
    public ResponseEntity<?> saveSupplier(@RequestParam(value = "name") String name,
                                        @RequestParam(value = "taxCode") String taxCode,
                                        @RequestParam(value = "description") String description,
                                        @RequestParam(value = "phone") String phone,
                                        @RequestParam(value = "email") String email,
                                        @RequestParam(value = "address") String address){
        String check = supplierService.validateSupplier(name, email, phone);
        if(check == ""){
            Boolean result = supplierService.saveSupplier(name, taxCode, description, phone, email,address);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }

    }
    @PutMapping(value = "/supplier/update", headers="Content-Type=multipart/form-data")
    public ResponseEntity<?> updateSupplier(@RequestParam(value = "id") Long id,
                                            @RequestParam(value = "name", required = false) String name,
                                        @RequestParam(value = "taxCode",required = false) String taxCode,
                                        @RequestParam(value = "description",required = false) String description,
                                        @RequestParam(value = "phone",required = false) String phone,
                                        @RequestParam(value = "email",required = false) String email,
                                        @RequestParam(value = "address",required = false) String address) {
        String check = supplierService.validateSupplier(name, email, phone);
        if (check == "") {
            Boolean result = supplierService.updateSupplier(id,name, taxCode, description, phone, email, address);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }
    }

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
