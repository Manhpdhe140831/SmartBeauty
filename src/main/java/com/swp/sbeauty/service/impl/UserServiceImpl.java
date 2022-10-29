package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.RoleDto;
import com.swp.sbeauty.dto.UserDto;

import java.util.*;

import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.Users;
import com.swp.sbeauty.repository.RoleRepository;
import com.swp.sbeauty.repository.UserRepository;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.stream.Collectors;

@Service @Transactional @Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;
    @Override
    public Boolean saveUser(UserDto userDto,String roleAuth) {
        if(userDto != null){
            Users user = new Users();
            user.setName(userDto.getName());
            user.setEmail(userDto.getEmail());
            user.setMobile(userDto.getMobile());
            user.setDateOfBirth(userDto.getDateOfBirth());
            user.setGender(userDto.getGender());
            user.setAddress(userDto.getAddress());
            user.setPassword(encoder.encode(userDto.getPassword()));
            user.setUrlImage(userDto.getUrlImage());
            if(roleAuth.equal("admin")) {
// if admin then create user with role manager
            }else if(roleAuth.equal("manager")){
                //if manager then create user with role staff
            }
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
            Users user = null;
            if(id !=null){
                Optional<Users> optional =userRepository.findById(id);
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
            Users entity = userRepository.findById(id).orElse(null);
            if (entity != null) {
                return new UserDto(entity);
            }
        }
        return null;
    }

    @Override
    public List<Users> getByRole(Long id) {
        if(id!=null){
            List<Users> result = userRepository.findUserByRoleId(id);
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

    @Override
    public Page<UserDto> getAllUsersPagination(int offset, int pageSize, int roleId) {
        Page<Users> users = userRepository.getUserByRoleId(roleId,PageRequest.of(offset,pageSize));
        ModelMapper mapper = new ModelMapper();
        List<UserDto> dtos = users
                .stream()
                .map(user -> mapper.map(user, UserDto.class))
                .collect(Collectors.toList());
        dtos.stream().forEach(f->
                {
                f.setPassword("");
                f.setRole(f.getRoles().stream().collect(Collectors.toList()).get(0).getName());
                    f.setRoles(null);
                }
        );
        Page<UserDto> pageResult = new PageImpl<>(dtos);
        return pageResult;
    }

    @Override
    public Page<UserDto> getAllUsers(int offset, int pageSize) {
        Page<Users> users = userRepository.findAll(PageRequest.of(offset,pageSize));

        ModelMapper mapper = new ModelMapper();
        List<UserDto> listUser = new ArrayList<>();
        mapper.map(users, listUser);
        Page<UserDto> pageResult = new PageImpl<>(listUser);
        return pageResult;
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
        List<Users> list = userRepository.findAll();
        List<UserDto> result =new ArrayList<>();
        for(Users user : list){
            result.add(new UserDto(user));
        }
        return result;
    }


}

