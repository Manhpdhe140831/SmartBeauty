package com.swp.sbeauty.service.impl;


import com.swp.sbeauty.dto.*;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import com.swp.sbeauty.entity.Branch;
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
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.ServletContext;
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
    @Autowired
    ServletContext application;

    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

    @Override
    public Boolean saveUser(MultipartFile image, String name, String email, String phone, String dateOfBirth, String gender, String address, String password, String roleAuth, Integer idCheck) {
        try {
            Users user = new Users();
            user.setName(name);
            user.setEmail(email);
            user.setPhone(phone);
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            Date dob = df.parse(dateOfBirth);
            user.setDateOfBirth(dob);
            user.setGender(gender);
            user.setAddress(address);
            user.setPassword(encoder.encode(password));

            if(image != null){
                Path staticPath = Paths.get("static");
                Path imagePath = Paths.get("images");
                if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                    Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
                }
                Path file = CURRENT_FOLDER.resolve(staticPath)
                        .resolve(imagePath).resolve(image.getOriginalFilename());
                try (OutputStream os = Files.newOutputStream(file)) {
                    os.write(image.getBytes());
                }
                user.setUrlImage(imagePath.resolve(image.getOriginalFilename()).toString());
            }

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
        } catch (Exception e){
            return false;
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

    @Override
    public Boolean updateUser(Long id, String name, String email, String phone, String dateOfBirth, String gender, String address) {
        try{
            Users user = null;
            if(id !=null){
                Optional<Users> optional =userRepository.findById(id);
                if(optional.isPresent()){
                    user = optional.get();
                }
            }
            if(user != null){
                if(name!=null){
                    user.setName(name);
                }
                if(email!=null){
                    user.setEmail(email);
                }
                if(phone!=null){
                    user.setPhone(phone);
                }
                if(dateOfBirth!=null){
                    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                    Date dob = df.parse(dateOfBirth);
                    user.setDateOfBirth(dob);
                }
                if(gender!=null){
                    user.setGender(gender);
                }
                if(address!=null){
                    user.setAddress(address);
                }
                userRepository.save(user);
                return true;
            } else {
                return false;
            }
        } catch (Exception e){
            return false;
        }
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
    public String validateUser(String email, String phone) {
        String result = "";
        if(userRepository.existsByEmail(email)){
            result += "Email already exists in data, ";
        }
        if(userRepository.existsByPhone(phone)){
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
        List<UserDto> dtos = page
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
        List<UserDto> pageResult = new ArrayList<>(dtos);
        userResponse.setData(pageResult);
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
        /*List<UserDto> userDtos = new ArrayList<>();
        for (Users users1 : users){
            UserDto userDto = new UserDto();
            userDto = mapper.map(users1,UserDto.class);
            userDtos.add(userDto);
        }*/
        List<UserDto> dtos = page
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
        List<UserDto> pageResult = new ArrayList<>(dtos);
        userResponse.setData(pageResult);
        userResponse.setTotalElement(page.getTotalElements());
        userResponse.setTotalPage(page.getTotalPages());
        userResponse.setPageIndex(pageNo+1);
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
