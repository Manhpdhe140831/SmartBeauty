package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;

@Data
public class BranchResponseDto {
    List<BranchDto> branchDtos;
    int totalPage;
    int pageIndex;
    long totalElement;
}
