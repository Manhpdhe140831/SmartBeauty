package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;
@Data
public class CustomerResponseDto {
    List<CustomerDto> data;
    int totalPage;
    int pageIndex;
    long totalElement;
}
