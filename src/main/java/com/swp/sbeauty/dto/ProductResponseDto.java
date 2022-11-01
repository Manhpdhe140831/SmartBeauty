package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;
@Data
public class ProductResponseDto {
    List<ProductDto> data;
    int totalPage;
    int pageIndex;
    long totalElement;
}
