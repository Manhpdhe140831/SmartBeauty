package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getCategory();
    CategoryDto saveCategory(CategoryDto categoryDto);
    CategoryDto updateCategory(CategoryDto categoryDto, Long id);
}
