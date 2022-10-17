package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.CategoryDto;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.repository.CategoryRepository;
import com.swp.sbeauty.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service @Transactional @Slf4j
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> getCategory() {
        List<Category> list = categoryRepository.findAll();
        List<CategoryDto> result = new ArrayList<>();
        for(Category category : list){
            result.add(new CategoryDto(category));
        }
        return result;
    }

    @Override
    public CategoryDto saveCategory(CategoryDto categoryDto) {
        return null;
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Long id) {
        return null;
    }
}
