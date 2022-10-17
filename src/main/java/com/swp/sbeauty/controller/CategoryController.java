package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.CategoryDto;
import com.swp.sbeauty.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/category/list")
    public ResponseEntity<List<CategoryDto>> getCategory(){
        return ResponseEntity.ok().body(categoryService.getCategory());
    }

    @PostMapping("/category/save")
    public ResponseEntity<CategoryDto> saveCategory(@RequestBody CategoryDto categoryDto){
        CategoryDto result = categoryService.saveCategory(categoryDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/category/update/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@RequestBody CategoryDto categoryDto, @PathVariable Long id){
        CategoryDto result = categoryService.updateCategory(categoryDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
