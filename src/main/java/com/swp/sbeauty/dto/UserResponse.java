package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserResponse {
    List<UserDto> userResponseDtos;
    int totalPage;
    int pageIndex;
    Long totalElement;
}