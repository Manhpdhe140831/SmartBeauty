package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;

@Data
public class SupplierResponseDto {
    List<SupplierDto> data;
    int totalPage;
    int pageIndex;
    long totalElement;
}
