package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CategoryDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Supplier;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getCategory();
    CategoryDto getById(Long id);
    CategoryDto saveCategory(CategoryDto categoryDto);
    CategoryDto updateCategory(CategoryDto categoryDto, Long id);
    Page<Category> findCategoryPaginationAndSort(int offset, int pageSize, String field, String direction);
}
