package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;
@Data
public class SpaBedResponseDto {
    List<SpaBedDto> spaBedDtoList;
    int totalPage;
    int pageIndex;
    long totalElement;
}
