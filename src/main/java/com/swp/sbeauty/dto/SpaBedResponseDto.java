package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;
@Data
public class SpaBedResponseDto {
    List<SpaBedDto> data;
    int totalPage;
    int pageIndex;
    long totalElement;
}
