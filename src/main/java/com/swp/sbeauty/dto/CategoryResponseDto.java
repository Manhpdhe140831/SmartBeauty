package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;
@Data
public class CategoryResponseDto {
    List<CategoryDto> categoryDtoList;
    int totalPage;
    int pageIndex;
    long totalElement;

}
