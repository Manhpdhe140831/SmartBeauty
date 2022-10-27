package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.User;

import java.util.List;

public interface UserService {
    List<UserDto> getUsers();


    Boolean saveUser(UserDto userDto);

    UserDto updateUser(UserDto userDto, Long id);


    UserDto getById(Long id);

    List<User> getByRole(Long id);
}
