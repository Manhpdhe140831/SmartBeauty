package com.swp.sbeauty.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class BillResponseDto {
    List<BillDto> data;
    int totalPage;
    int pageIndex;
    long totalElement;
}
