package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping("/supplier/getbyid")
    public ResponseEntity<SupplierDto> getSupplierById(@RequestParam(value = "id",required = false) Long id) {
        SupplierDto result = supplierService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/supplier/save")
    public ResponseEntity<SupplierDto> saveSupplier(@Valid @RequestBody SupplierDto supplierDto){
        SupplierDto result = supplierService.saveSupplier(supplierDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/supplier/updatecategory")
    public ResponseEntity<SupplierDto> updateSupplier(@Valid @RequestBody SupplierDto supplierDto, @RequestParam(value = "id",required = false) Long id){
        SupplierDto result = supplierService.updateSupplier(supplierDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/supplier/getallsupplier")
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
    }
}
