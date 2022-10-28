package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {
    List<UserDto> getUsers();


    Boolean saveUser(UserDto userDto);

    UserDto updateUser(UserDto userDto, Long id);


    UserDto getById(Long id);

    List<User> getByRole(Long id);

    String validateUser(UserDto userDto);
    Page<User> getAllUsersPagination(int offset, int pageSize,int roleId);
    Page<User> getAllUsers(int offset, int pageSize);
}
