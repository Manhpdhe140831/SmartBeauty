package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.service.ProductService;
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
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/product/getById")
    public ResponseEntity<ProductDto> getProductById( @RequestParam(value = "id",required = false) Long id) {
        ProductDto result = productService.getProductById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/product/save")
    public ResponseEntity<ProductDto> saveProduct(@Valid @RequestBody ProductDto productDto){
        ProductDto result = productService.saveProduct(productDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/product/updateProduct")
    public ResponseEntity<ProductDto> updateProduct(@Valid @RequestBody ProductDto productDto,  @RequestParam(value = "id",required = false) Long id){
        ProductDto result = productService.updateProduct(productDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/product/getAllProduct")
    private APIResponse<Page<Product>> getProductWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "productCode", required = false) String productCode
            , @RequestParam(value = "productName", required = false) String productName){
        Page<Product> productsWithPagination;
        if(productCode =="" ||productCode == null && productName =="" ||productName == null){
            productsWithPagination = productService.getAllProductPagination(page-1,pageSize);
        }
        else {
            productsWithPagination = productService.findProductPaginationAndSearch(productCode,productName,page -1,pageSize);
        }
        return new APIResponse<>(productsWithPagination.getSize(),productsWithPagination);
    }
}
