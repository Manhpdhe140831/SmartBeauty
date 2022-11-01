package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;

@Data
public class ServiceResponseDto {
    List<ServiceDto> serviceDto;
    int totalPage;
    int pageIndex;
    Long totalElement;
}
