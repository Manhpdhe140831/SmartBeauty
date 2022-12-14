package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.service.ProductService;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/product/getById")
    public ResponseEntity<ProductDto> getProductById(@RequestParam(value = "id", required = false) Long id) {
        ProductDto result = productService.getProductById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/product")
    private ResponseEntity<?> getAllProductAndSearchByName(@RequestParam(value = "page", required = false, defaultValue = "1") int page
            , @RequestParam(value = "pageSize", required = false) int pageSize
            , @RequestParam(value = "name", required = false) String name) {
        if (name == null) {
            ProductResponseDto productResponseDto = productService.getAllProduct(page - 1, pageSize);
            return new ResponseEntity<>(productResponseDto, HttpStatus.OK);
        } else {
            ProductResponseDto productResponseDto = productService.getProductAndSearchByName(name, page - 1, pageSize);
            return new ResponseEntity<>(productResponseDto, HttpStatus.OK);
        }
    }

    @PostMapping(value = "/product/create", headers = "Content-Type=multipart/form-data")
    public ResponseEntity<?> saveProduct(@RequestParam(value = "name") String name,
                                         @RequestParam(value = "price") Double price,
                                         @RequestParam(value = "description", required = false) String description,
                                         @RequestParam(value = "image", required = false) MultipartFile image,
                                         @RequestParam(value = "discountStart", required = false) String discountStart,
                                         @RequestParam(value = "discountEnd", required = false) String discountEnd,
                                         @RequestParam(value = "discountPercent", required = false) Double discountPercent,
                                         @RequestParam(value = "supplier") Long supplier,
                                         @RequestParam(value = "unit") String unit,
                                         @RequestParam(value = "dose") Integer dose) {
        String check = productService.validateProduct(name, discountStart, discountEnd, discountPercent);
        if (check == "") {
            Boolean result = productService.saveProduct(name, price, description, image, discountStart, discountEnd, discountPercent, supplier, unit, dose);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/product/update")
    public ResponseEntity<?> updateProduct(@RequestParam(value = "id") Long id,
                                           @RequestParam(value = "name", required = false) String name,
                                           @RequestParam(value = "price", required = false) Double price,
                                           @RequestParam(value = "description", required = false) String description,
                                           @RequestParam(value = "image", required = false) MultipartFile image,
                                           @RequestParam(value = "discountStart", required = false) String discountStart,
                                           @RequestParam(value = "discountEnd", required = false) String discountEnd,
                                           @RequestParam(value = "discountPercent", required = false) Double discountPercent,
                                           @RequestParam(value = "supplier", required = false) Long supplier,
                                           @RequestParam(value = "unit", required = false) String unit,
                                           @RequestParam(value = "dose", required = false) Integer dose) {

        String result = productService.updateProduct(id, name, price, description, image, discountStart, discountEnd, discountPercent, supplier, unit, dose);
        if (result == null) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, result), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/product/delete")
    private ResponseEntity<?> deleteCourse(@RequestParam("id") Long id){
        Boolean result = productService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
