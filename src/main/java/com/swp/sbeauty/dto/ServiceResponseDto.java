package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;

@Data
public class ServiceResponseDto {
    List<ServiceDto> data;
    int totalPage;
    int pageIndex;
    Long totalElement;
}
