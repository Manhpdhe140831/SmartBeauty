package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;
@Data
public class ProductResponseDto {
    List<ProductDto> productDtoList;
    int totalPage;
    int pageIndex;
    long totalElement;
}
