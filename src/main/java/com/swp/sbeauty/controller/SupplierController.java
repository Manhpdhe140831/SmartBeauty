package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<SupplierDto> saveSupplier(@RequestBody SupplierDto supplierDto){
        SupplierDto result = supplierService.saveSupplier(supplierDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/supplier/update/{id}")
    public ResponseEntity<SupplierDto> updateSupplier(@RequestBody SupplierDto supplierDto, @PathVariable Long id){
        SupplierDto result = supplierService.updateSupplier(supplierDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
