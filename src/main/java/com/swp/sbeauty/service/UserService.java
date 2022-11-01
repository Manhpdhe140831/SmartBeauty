package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.dto.UserResponse;
import com.swp.sbeauty.entity.Users;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;

public interface UserService {
    List<UserDto> getUsers();







    UserDto getById(Long id);

    List<Users> getByRole(Long id);

    String validateUser(String email, String phone);

    Page<UserDto> getAllUsersPagination(int offset, int pageSize, int roleId);
    Page<UserDto> getAllUsers(int offset, int pageSize);

    Page<UserDto> getAllUsersByAdmin(int offset, int pageSize);

    Page<UserDto> getAllUsersByManager(Integer idCheck ,int offset, int pageSize);


    void saveUserToBranch(UserDto userDto, String roleCheck, Integer idcheck);



    List<UserDto> getUsersByBranch(String id);


    List<UserDto> getAllManager();
    UserResponse getUserByManager(Integer idCheck, int pageNo, int pageSize);
    UserResponse getAllUser(int pageNo, int pageSize);

    Boolean saveUser(String name, String email, String phone, String dateOfBirth, String gender, String address, String password, String roleCheck, Integer idcheck);

    Boolean updateUser(Long id, String name, String email, String phone, String dateOfBirth, String gender, String address);
}
