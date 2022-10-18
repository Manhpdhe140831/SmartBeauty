package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {
    @Autowired
    private ProductService productService;
    @GetMapping("/product/list")
    public ResponseEntity<List<ProductDto>> getProducts(){
        return ResponseEntity.ok().body(productService.getProducts());
    }

    @PostMapping("/product/save")
    public ResponseEntity<ProductDto> saveProduct(@RequestBody ProductDto productDto){
        ProductDto result = productService.saveProduct(productDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/product/update")
    public ResponseEntity<ProductDto> updateProduct(@RequestBody ProductDto productDto, @PathVariable Long id){
        ProductDto result = productService.updateProduct(productDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
