package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Branch;
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

    @GetMapping("/supplier/list")
    public ResponseEntity<List<SupplierDto>> getSupplier(){
        return ResponseEntity.ok().body(supplierService.getSupplier());
    }

    @PostMapping("/supplier/save")
    public ResponseEntity<SupplierDto> saveSupplier(@Valid @RequestBody SupplierDto supplierDto){
        SupplierDto result = supplierService.saveSupplier(supplierDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/supplier/update/{id}")
    public ResponseEntity<SupplierDto> updateSupplier(@Valid @RequestBody SupplierDto supplierDto, @PathVariable Long id){
        SupplierDto result = supplierService.updateSupplier(supplierDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/supplier")
    private APIResponse<Page<Supplier>> getSupplierWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "sort", required = false, defaultValue = "asc") String sort
            , @RequestParam(value = "direction") String direction){
        Page<Supplier> suppliersWithPagination = supplierService.findSupplierPaginationAndSort(page -1,pageSize,sort,direction);
        return new APIResponse<>(suppliersWithPagination.getSize(),suppliersWithPagination);
    }
}
