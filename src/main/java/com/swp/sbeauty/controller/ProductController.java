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
    @GetMapping("/product/list")
    public ResponseEntity<List<ProductDto>> getProducts(){
        return ResponseEntity.ok().body(productService.getProducts());
    }
    @GetMapping("/product/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        ProductDto result = productService.getProductById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/product/save")
    public ResponseEntity<ProductDto> saveProduct(@Valid @RequestBody ProductDto productDto){
        ProductDto result = productService.saveProduct(productDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/product/update/{id}")
    public ResponseEntity<ProductDto> updateProduct(@Valid @RequestBody ProductDto productDto, @PathVariable Long id){
        ProductDto result = productService.updateProduct(productDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/product")
    private APIResponse<Page<Product>> getSupplierWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "sort", required = false,defaultValue = "productName") String sort
            , @RequestParam(value = "value", required = false) String value
            , @RequestParam(value = "direction",defaultValue = "asc",required = false) String direction){
        Page<Product> productsWithPagination;
        if(value  == "" ||value == null){
            productsWithPagination = productService.findProductPaginationAndSort(page -1,pageSize,sort,direction);
        }
        else {
            productsWithPagination = productService.findProductPaginationAndSearch(page -1,pageSize,sort,direction,value);
        }
        return new APIResponse<>(productsWithPagination.getSize(),productsWithPagination);
    }
}
