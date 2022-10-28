package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.CategoryDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.repository.CategoryRepository;
import com.swp.sbeauty.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public CategoryDto getById(Long id) {
        if (id != null) {
            Category entity = categoryRepository.findById(id).orElse(null);
            if (entity != null) {
                return new CategoryDto(entity);
            }
        }
        return null;
    }

    @Override
    public CategoryDto saveCategory(CategoryDto categoryDto) {
        try{
            if(categoryDto != null){
                Category category = new Category();
                category.setName(categoryDto.getName());
                category = categoryRepository.save(category);
                if (category != null){
                    return new CategoryDto(category);
                }
            }
        }catch (Exception e){
            throw e;
        }
        return null;
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Long id) {
        try {
            if(categoryDto != null){
                Category category = null;
                if(id != null){
                    Optional<Category> optional = categoryRepository.findById(id);
                    if(optional.isPresent()){
                        category = optional.get();
                    }
                }
                if(category != null){
                    category.setName(categoryDto.getName());
                    category = categoryRepository.save(category);
                    return new CategoryDto(category);
                }else {
                    return null;
                }
            }
        }catch (Exception e){
            throw e;
        }

        return null;
    }

    @Override
    public Page<Category> findCategoryPaginationAndSort(int offset, int pageSize, String field, String direction) {
        Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(field).ascending() : Sort.by(field).descending();
        Page<Category> categories =categoryRepository.findAll(PageRequest.of(offset,pageSize,sort));
        return categories;
    }

    @Override
    public Page<Category> findCategoryPaginationAndSearch(int offset, int pageSize, String field, String direction, String value) {
        Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(field).ascending() : Sort.by(field).descending();
        Page<Category> categories =categoryRepository.searchListWithField(value,PageRequest.of(offset,pageSize,sort));
        return categories;
    }

}
