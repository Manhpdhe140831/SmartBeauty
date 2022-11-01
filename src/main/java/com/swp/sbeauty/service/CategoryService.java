package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CategoryDto;
import com.swp.sbeauty.dto.CategoryResponseDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.dto.SupplierResponseDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Supplier;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getCategory();
    CategoryDto getById(Long id);
    CategoryDto saveCategory(CategoryDto categoryDto);
    CategoryDto updateCategory(CategoryDto categoryDto, Long id);
    Page<Category> getAllCategoryPagination(int offset, int pageSize);
    Page<Category> findCategoryPaginationAndSearch(int offset,int pageSize,String name);
    CategoryResponseDto getCategoryAndSearch(String name, int pageNo, int pageSize);
    CategoryResponseDto getAllCategory(int pageNo,int pageSize);
    Boolean saveCategory(String name);
    String validateCategory(String name);
}
