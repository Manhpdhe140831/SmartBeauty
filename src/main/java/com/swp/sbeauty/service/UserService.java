package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.dto.UserResponse;
import com.swp.sbeauty.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface UserService {
    List<UserDto> getUsers();

    UserDto getById(Long id);

    String validateUser(String email, String phone);

    Page<UserDto> getAllUsers(int offset, int pageSize);

    Page<UserDto> getAllUsersByAdmin(int offset, int pageSize);

    Page<UserDto> getAllUsersByManager(Integer idCheck ,int offset, int pageSize);

    List<UserDto> getUsersByBranch(String id);

    List<UserDto> getAllManager();
    UserResponse getUserByManager(Integer idCheck, int pageNo, int pageSize);
    UserResponse getAllUser(int pageNo, int pageSize);

    Boolean saveUser(MultipartFile image, String name, String email, String phone, String dateOfBirth, String gender, String address, String password,Long role, String roleCheck, Integer idcheck);

    Boolean updateUser(Long id, MultipartFile image, String name, String email, String phone, String dateOfBirth, String gender, String address);

    List<UserDto> getStaffFree(Long idCheck, String date, Long slot);
}
