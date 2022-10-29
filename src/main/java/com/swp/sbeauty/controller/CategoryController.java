package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.CategoryDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @PostMapping("/category/save")
    public ResponseEntity<CategoryDto> saveCategory(@RequestBody CategoryDto categoryDto){
        CategoryDto result = categoryService.saveCategory(categoryDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/category/updateCategory")
    public ResponseEntity<CategoryDto> updateCategory(@RequestBody CategoryDto categoryDto, @RequestParam(value = "id",required = false) Long id){
        CategoryDto result = categoryService.updateCategory(categoryDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/category/getallCategory")
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
    }
}
