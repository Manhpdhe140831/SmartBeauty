package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;
@Data
public class CategoryResponseDto {
    List<CategoryDto> data;
    int totalPage;
    int pageIndex;
    long totalElement;

}
