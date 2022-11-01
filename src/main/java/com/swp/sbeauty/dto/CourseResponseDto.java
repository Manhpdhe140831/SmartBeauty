package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;

@Data
public class CourseResponseDto {
    List<CourseDto> courseDto;
    int totalPage;
    int pageIndex;
    Long totalElement;
}
