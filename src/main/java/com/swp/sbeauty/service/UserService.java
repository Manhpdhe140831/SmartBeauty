package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    List<UserDto> getUsers();


//    Boolean saveUser(UserDto userDto,String roleAuth);
Boolean saveUser(UserDto userDto);

    UserDto updateUser(UserDto userDto, Long id);


    UserDto getById(Long id);

    List<Users> getByRole(Long id);

    String validateUser(UserDto userDto);
    Page<UserDto> getAllUsersPagination(int offset, int pageSize, int roleId);
    Page<UserDto> getAllUsers(int offset, int pageSize);

    Page<UserDto> getAllUsersByAdmin(int offset, int pageSize);
    Boolean saveUser(UserDto userDto,String roleAuth);
    Page<UserDto> getAllUsersByManager(int offset, int pageSize);

}
