package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Users;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {
    List<UserDto> getUsers();


    Boolean saveUser(UserDto userDto);

    UserDto updateUser(UserDto userDto, Long id);


    UserDto getById(Long id);

    List<Users> getByRole(Long id);

    String validateUser(UserDto userDto);
    Page<UserDto> getAllUsersPagination(int offset, int pageSize, int roleId);
    Page<UserDto> getAllUsers(int offset, int pageSize);
}
