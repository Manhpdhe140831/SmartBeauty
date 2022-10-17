package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Category;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDto {
    private Long id;
    private String name;

    public CategoryDto(){}

    public CategoryDto(Category category){
        if(category != null){
            this.setId(category.getId());
            this.setName(category.getName());
        }
    }
}
