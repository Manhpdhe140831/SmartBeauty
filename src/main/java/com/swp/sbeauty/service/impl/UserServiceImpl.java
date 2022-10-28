package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.ResponseDto;
import com.swp.sbeauty.dto.RoleDto;
import com.swp.sbeauty.dto.UserDto;

import java.util.*;

import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.User;
import com.swp.sbeauty.repository.RoleRepository;
import com.swp.sbeauty.repository.UserRepository;
import com.swp.sbeauty.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service @Transactional @Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;

    @Override
    public Boolean saveUser(UserDto userDto) {
        if(userDto != null){
            User user = new User();
            user.setName(userDto.getName());
            user.setEmail(userDto.getEmail());
            user.setMobile(userDto.getMobile());
            user.setDateOfBirth(userDto.getDateOfBirth());
            user.setGender(userDto.getGender());
            user.setAddress(userDto.getAddress());
            user.setPassword(encoder.encode(userDto.getPassword()));
            user.setUrlImage(userDto.getUrlImage());
            Set<Role> roles = new HashSet<>();
            if(userDto.getRole()!=null){
                Role role = null;
                Optional<Role> optional =roleRepository.findByName(userDto.getRole());
                if(optional.isPresent()){
                    role = optional.get();
                }
                if(role!=null){
                    roles.add(role);
                }
            }
            if(roles!=null){
                user.setRoles(roles);
            }
            user = userRepository.save(user);
            if(user != null){
                return true;
            }
        }
        return false;
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
                user.setEmail(userDto.getEmail());
                user.setMobile(userDto.getMobile());
                user.setDateOfBirth(userDto.getDateOfBirth());
                user.setGender(userDto.getGender());
                user.setAddress(userDto.getAddress());
                user.setPassword(encoder.encode(userDto.getPassword()));
                user.setUrlImage(user.getUrlImage());
                Set<Role> roles = new HashSet<>();
                if(user.getRoles()!=null && user.getRoles().size()>0){
                    for (RoleDto roleDto : userDto.getRoles()){
                        if(roleDto!=null){
                            Role role = null;
                            if(roleDto.getId()!=null){
                                Optional<Role> optional =roleRepository.findById(roleDto.getId());
                                if(optional.isPresent()){
                                    role = optional.get();
                                }
                                if(role!=null){
                                    roles.add(role);
                                }
                            }
                        }
                    }
                    user.setRoles(roles);
                }
                user = userRepository.save(user);
                return new UserDto(user);
            } else {
                return null;
            }
        }
        return null;
    }

    @Override
    public UserDto getById(Long id) {
        if (id != null) {
            User entity = userRepository.findById(id).orElse(null);
            if (entity != null) {
                return new UserDto(entity);
            }
        }
        return null;
    }

    @Override
    public List<User> getByRole(Long id) {
        if(id!=null){
            List<User> result = userRepository.findUserByRoleId(id);
            if(result != null){
                return result;
            }
        }
        return null;
    }

    @Override
    public String validateUser(UserDto userDto) {
        String result = "";
        if(userRepository.existsByEmail(userDto.getEmail())){
            result += "Email already exists in data, ";
        }
        if(userRepository.existsByMobile(userDto.getMobile())){
            result += "Mobile already exists in data";
        }
        return result;
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

