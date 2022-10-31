package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.*;

import java.util.*;

import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.User_Branch_Mapping;
import com.swp.sbeauty.entity.Users;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.RoleRepository;
import com.swp.sbeauty.repository.UserRepository;
import com.swp.sbeauty.repository.mappingRepo.User_Branch_Mapping_Repo;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.stream.Collectors;

@Service @Transactional @Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BranchRepository branchRepository;
    @Autowired
    private User_Branch_Mapping_Repo user_branch_mapping_repo;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;

    @Override
    public Boolean saveUser(UserDto userDto,String roleAuth, Integer idCheck) {
        if (userDto != null) {
            Users user = new Users();
            user.setName(userDto.getName());
            user.setEmail(userDto.getEmail());
            user.setPhone(userDto.getPhone());
            user.setDateOfBirth(userDto.getDateOfBirth());
            user.setGender(userDto.getGender());
            user.setAddress(userDto.getAddress());
            user.setPassword(encoder.encode(userDto.getPassword()));
            user.setUrlImage(userDto.getUrlImage());
            Set<Role> roles = new HashSet<>();
            if (roleAuth.equalsIgnoreCase("admin")) {
                Role role = null;
                Optional<Role> optional = roleRepository.findByName("manager");
                if (optional.isPresent()) {
                    role = optional.get();
                }
                if (role != null) {
                    roles.add(role);
                }
                user.setRoles(roles);
                userRepository.save(user);
                return true;
            } else if (roleAuth.equalsIgnoreCase("manager")) {
                Integer idBranch = branchRepository.getIdBranchByManager(idCheck);
                if(idBranch == null){
                    return false;
                } else {
                    Role role = null;
                    Optional<Role> optional = roleRepository.findByName("staff");
                    if (optional.isPresent()) {
                        role = optional.get();
                    }
                    if (role != null) {
                        roles.add(role);
                    }
                    user.setRoles(roles);
                    user = userRepository.save(user);
                    Integer idStaff = Integer.valueOf(user.getId().intValue());
                    User_Branch_Mapping user_branch_mapping = new User_Branch_Mapping(idStaff, idBranch);
                    user_branch_mapping_repo.save(user_branch_mapping);
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public void saveUserToBranch(UserDto userDto, String roleAuth, Integer idCheck) {
        if (roleAuth.equalsIgnoreCase("manager")){
            Integer idBranch = branchRepository.getIdBranchByManager(idCheck);
            Integer idStaff = userRepository.getIdUserByEmail(userDto.getEmail());
            User_Branch_Mapping user_branch_mapping = new User_Branch_Mapping(idBranch, idStaff);
            user_branch_mapping_repo.save(user_branch_mapping);
        }
    }

    @Override
    public Page<UserDto> getAllUsersByManager(Integer idCheck, int offset, int pageSize) {
        Integer idBranch = branchRepository.getIdBranchByManager(idCheck);
        Page<Users> users = userRepository.getAllUserByManager(idBranch,PageRequest.of(offset,pageSize));
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



    //    @Override
//    public Boolean saveUser(UserDto userDto,String roleAuth) {
//        if(userDto != null){
//            Users user = new Users();
//            user.setName(userDto.getName());
//            user.setEmail(userDto.getEmail());
//            user.setphone(userDto.getphone());
//            user.setDateOfBirth(userDto.getDateOfBirth());
//            user.setGender(userDto.getGender());
//            user.setAddress(userDto.getAddress());
//            user.setPassword(encoder.encode(userDto.getPassword()));
//            user.setUrlImage(userDto.getUrlImage());
//            if(roleAuth.equalsIgnoreCase("admin")) {
//// if admin then create user with role manager
//
//            }else if(roleAuth.equalsIgnoreCase("manager")){
//                //if manager then create user with role staff
//            }
//            Set<Role> roles = new HashSet<>();
//            if(userDto.getRole()!=null){
//                Role role = null;
//                Optional<Role> optional =roleRepository.findByName(userDto.getRole());
//                if(optional.isPresent()){
//                    role = optional.get();
//                }
//                if(role!=null){
//                    roles.add(role);
//                }
//            }
//            if(roles!=null){
//                user.setRoles(roles);
//            }
//            user = userRepository.save(user);
//            if(user != null){
//                return true;
//            }
//        }
//        return false;
//    }
@Override
public Boolean saveUser(UserDto userDto) {
    if(userDto != null){
        Users user = new Users();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());
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
                user.setPhone(userDto.getPhone());
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
        if(userRepository.existsByPhone(userDto.getPhone())){
            result += "phone already exists in data";
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
    public Page<UserDto> getAllUsersByAdmin(int offset, int pageSize) {

        Page<Users> users = userRepository.getAllUserByAdmin(PageRequest.of(offset,pageSize));
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




    public List<UserDto> getUsersByBranch(String id) {
        List<Users> list = userRepository.getListByBranch(Long.parseLong(id));
        List<UserDto> listDto = new ArrayList<>();
        for (Users itemU: list
             ) {
            listDto.add(new UserDto(itemU.getId(), itemU.getName(),itemU.getEmail(), itemU.getPhone(), itemU.getDateOfBirth(), itemU.getGender(), itemU.getAddress(), itemU.getUrlImage(), itemU.getRoles()));
        }

        return listDto;
    }

    @Override
    public List<UserDto> getAllManager() {
        List<Users> list = userRepository.getAllManager();
        List<UserDto> listDto = new ArrayList<>();
        for(Users users : list){
            listDto.add(new UserDto(users));
        }
        return listDto;
    }

    @Override
    public UserResponse getUserByManager(Integer idCheck, int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        UserResponse userResponse = new UserResponse();
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Integer idBranch = branchRepository.getIdBranchByManager(idCheck);
        Page<Users> page = userRepository.getAllUserByManager(idBranch,pageable);
        List<Users> users = page.getContent();
        /*List<UserResponseDto> userResponseDtos = new ArrayList<>();
        for (Users users1 : users){
            UserResponseDto userResponseDto = new UserResponseDto();
            userResponseDto = mapper.map(users1,UserResponseDto.class);
            userResponseDtos.add(userResponseDto);
        }*/
        List<UserResponseDto> dtos = users
                .stream()
                .map(user -> mapper.map(user, UserResponseDto.class))
                .collect(Collectors.toList());
        dtos.stream().forEach(f->
                {
                    f.setRole(f.getRoles().stream().collect(Collectors.toList()).get(0).getName());
                    f.setRoles(null);
                }
        );
        List<UserResponseDto> pageResult = new ArrayList<>(dtos);
        userResponse.setUserResponseDtos(pageResult);
        userResponse.setTotalElement(page.getTotalElements());
        userResponse.setTotalPage(page.getTotalPages());
        userResponse.setPageIndex(pageNo+1);
        return userResponse;
    }

    @Override
    public UserResponse getAllUser(int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        UserResponse userResponse = new UserResponse();
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<Users> page = userRepository.getAllUserByAdmin(pageable);
        List<Users> users = page.getContent();
        List<UserResponseDto> userResponseDtos = new ArrayList<>();
        for (Users users1 : users){
            UserResponseDto userResponseDto = new UserResponseDto();
            userResponseDto = mapper.map(users1,UserResponseDto.class);
            userResponseDtos.add(userResponseDto);
        }
        userResponse.setUserResponseDtos(userResponseDtos);
        userResponse.setTotalPage(page.getTotalPages());
        userResponse.setPageIndex(pageNo);
        return userResponse;
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
        for(Users users : list){
            result.add(new UserDto(users));
        }
        return result;
    }


}
