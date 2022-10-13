package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getUsers();


    UserDto saveUser(UserDto userDto);

    UserDto updateUser(UserDto userDto, Long id);


}
