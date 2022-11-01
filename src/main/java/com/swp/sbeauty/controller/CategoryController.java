package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/category/getById")
    public ResponseEntity<CategoryDto> getCategoryById(@RequestParam(value = "id",required = false) Long id) {
        CategoryDto result = categoryService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/category/save", headers="Content-Type=multipart/form-data")
    public ResponseEntity<?> saveCategory(@RequestParam(value = "name") String name){
        String check = categoryService.validateCategory(name);
        if(check == ""){
            Boolean result = categoryService.saveCategory(name);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }

    }
    @PutMapping ("/category/update")
    public ResponseEntity<CategoryDto> updateCategory(@RequestBody CategoryDto categoryDto, @RequestParam(value = "id",required = false) Long id){
        CategoryDto result = categoryService.updateCategory(categoryDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    /*@GetMapping("/category/getAllCategory")
    private APIResponse<Page<Category>> getCategoryWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false,defaultValue = "") String name){
        Page<Category> categoriesWithPagination;
        if(name  == "" ||name == null){
            categoriesWithPagination = categoryService.getAllCategoryPagination(page -1,pageSize);
        }
        else {
            categoriesWithPagination = categoryService.findCategoryPaginationAndSearch(page -1,pageSize,name);
        }
        return new APIResponse<>(categoriesWithPagination.getSize(),categoriesWithPagination);
    }*/
    @GetMapping("/category")
    private ResponseEntity<?> getCategoryPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false,defaultValue = "") String name){
        Pageable p = PageRequest.of(page,pageSize);
        if(name  == "" ||name == null){
            CategoryResponseDto categoryResponseDto = categoryService.getAllCategory(page -1,pageSize);
            return new ResponseEntity<>(categoryResponseDto,HttpStatus.OK);
        }
        else {
            CategoryResponseDto categoryResponseDto = categoryService.getCategoryAndSearch(name,page -1,pageSize);
            return new ResponseEntity<>(categoryResponseDto,HttpStatus.OK);
        }
    }
}
