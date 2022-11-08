package com.swp.sbeauty.service.impl;


import com.swp.sbeauty.dto.*;

import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
import org.joda.time.DateTime;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    public Boolean saveUser(MultipartFile image, String name, String email, String phone, String dateOfBirth, String gender, String address, String password, Long role, String roleAuth, Integer idCheck) {
        try {
            Users user = new Users();
            user.setName(name);
            user.setEmail(email);
            user.setPhone(phone);
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            Date dob = df.parse(dateOfBirth);
            Date birthDate = new DateTime(dateOfBirth).toDate();
            user.setDateOfBirth(birthDate);
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
                Role roleRaw = null;
                Optional<Role> optional = roleRepository.findByName("manager");
                if (optional.isPresent()) {
                    roleRaw = optional.get();
                }
                if (roleRaw != null) {
                    roles.add(roleRaw);
                }
                user.setRoles(roles);
                userRepository.save(user);
                return true;
            } else if (roleAuth.equalsIgnoreCase("manager")) {
                Integer idBranch = branchRepository.getIdBranchByManager(idCheck);
                if(idBranch == null){
                    return false;
                } else {
                    Role roleRaw = null;
                    Optional<Role> optional = roleRepository.findById(role);
                    if (optional.isPresent()) {
                        roleRaw = optional.get();
                    }
                    if (roleRaw != null) {
                        roles.add(roleRaw);
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
    public Boolean updateUser(Long id, MultipartFile image, String name, String email, String phone, String dateOfBirth, String gender, String address) {
        try{
            Users user = null;
            if(id !=null){
                Optional<Users> optional =userRepository.findById(id);
                if(optional.isPresent()){
                    user = optional.get();
                }
            }
            if(user != null){
                if(image != null){
                    user.setUrlImage(user.getUrlImage());
                }
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
                    Date birthDate = new DateTime(dateOfBirth).toDate();
                    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                    Date dob = df.parse(dateOfBirth);
                    user.setDateOfBirth(birthDate);
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
    public List<UserDto> getStaffFree(Long idCheck) {
        if(idCheck!=null){
            Long idBranch = user_branch_mapping_repo.idBranch(idCheck);
            List<Users> list = userRepository.getStaffFree(idBranch);
            List<UserDto> listDto = new ArrayList<>();
            if(list!=null){
                for(Users user : list){
                    listDto.add(new UserDto(user));
                }
            }
            return listDto;
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
    public List<UserDto> getUsers() {
        List<Users> list = userRepository.findAll();
        List<UserDto> result =new ArrayList<>();
        for(Users users : list){
            result.add(new UserDto(users));
        }
        return result;
    }
}
