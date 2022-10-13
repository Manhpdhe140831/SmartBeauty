package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.UserDto;

import java.util.List;

import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.User;
import com.swp.sbeauty.repository.RoleRepository;
import com.swp.sbeauty.repository.UserRepository;
import com.swp.sbeauty.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service @Transactional @Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserDto saveUser(UserDto userDto) {
        if(userDto != null){
            User user = new User();
            user.setName(userDto.getName());
            user.setUsername(userDto.getUsername());
            user.setPassword(userDto.getPassword());
            if(userDto.getRole()!=null){
                Role role = null;
                Optional<Role> optional = roleRepository.findById(userDto.getRole().getId());
                if (optional.isPresent()) {
                    role = optional.get();
                }
                user.setRole(role);
            }
            user = userRepository.save(user);
            if(user != null){
                return new UserDto(user);
            }
        }
        return null;
    }

    @Override
    public UserDto updateUser(UserDto userDto, Long id) {
        if(userDto !=null){
            User user = null;
            if(id !=null){
                Optional<User> optional =userRepository.findById(id);
                if(optional.isPresent()){
                    user = optional.get();
                }
            }
            if(user != null){
                user.setName(userDto.getName());
                user.setUsername(userDto.getUsername());
                user.setPassword(userDto.getPassword());
                if(userDto.getRole()!=null){
                    Role role = null;
                    Optional<Role> optional = roleRepository.findById(userDto.getRole().getId());
                    if (optional.isPresent()) {
                        role = optional.get();
                    }
                    user.setRole(role);
                }
                user = userRepository.save(user);
                return new UserDto(user);
            } else {
                return null;
            }
        }
        return null;
    }

    //    @Override
//    public RoleDto saveRole(RoleDto roleDto) {
//        if(roleDto != null){
//            Role role = new Role();
//            role.setName(roleDto.getName());
//            role = roleRepository.save(role);
//            if(role!=null){
//                return new RoleDto(role);
//            }
//        }
//        return null;
//    }
//
//    @Override
//    public Boolean addRoleToUser(Long roleId, Long userId) {
//        if(roleId!=null && userId!=null){
//            User user = null;
//            Optional<User> optional = userRepository.findById(userId);
//            if(optional.isPresent()){
//                user = optional.get();
//            }
//            Role role = null;
//            Optional<Role> optional1 = roleRepository.findById(roleId);
//            if(optional.isPresent()){
//                role = optional1.get();
//            }
//            user.getRoles().add(role);
//            return true;
//        }
//        return false;
//    }
//
//    @Override
//    public UserDto getUser(String username) {
//        UserDto result = userRepository.findByUserName(username);
//        return result;
//    }
//
    @Override
    public List<UserDto> getUsers() {
        List<User> list = userRepository.findAll();
        List<UserDto> result =new ArrayList<>();
        for(User user : list){
            result.add(new UserDto(user));
        }
        return result;
    }


}

