package com.swp.sbeauty.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserResponse {
    List<UserDto> data;
    int totalPage;
    int pageIndex;
    Long totalElement;
}
