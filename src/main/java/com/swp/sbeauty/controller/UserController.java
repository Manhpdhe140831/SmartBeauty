package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.ResponseDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.User;
import com.swp.sbeauty.repository.UserRepository;
import com.swp.sbeauty.security.jwt.JwtResponse;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.security.services.UserDetailsImpl;
import com.swp.sbeauty.service.UserService;
import com.swp.sbeauty.validation.ValidInputDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    ValidInputDto valid = new ValidInputDto();

    @GetMapping("/user/list")
    public ResponseEntity<List<UserDto>> getUsers(){
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/user/save")
    public ResponseEntity<?> saveUser(@RequestBody UserDto userDto){
        String check = userService.validateUser(userDto);
        if(check ==""){
            Boolean result = userService.saveUser(userDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping ("/user/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable Long id){
        UserDto result = userService.updateUser(userDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping(value = "user/{id}")
    public ResponseEntity<UserDto> getById(@PathVariable Long id) {
        UserDto result = userService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @GetMapping(value = "user/getByRole/{id}")
    public ResponseEntity<List<User>> getByRole(@PathVariable Long id) {
        List<User> result = userService.getByRole(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/auth/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody UserDto loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        return ResponseEntity.ok(new JwtResponse(jwt));
    }
    /*@GetMapping("/user")
    private APIResponse<Page<User>> getAllUserByRoleName(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "roleName", required = false) String roleName
    ){
        Page<User> getAllUser;
        if(roleName  == "" ||roleName == null){
            getAllUser = userService.getAllUsers(page -1,pageSize);
        }
        else {
            getAllUser = userService.getAllUsersPagination(page -1,pageSize,roleName);
        }
        return new APIResponse<>(getAllUser.getSize(),getAllUser);
    }*/
    @GetMapping("/user")
    private APIResponse<Page<User>> getAllUserByRoleName(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "roleId", required = false, defaultValue = "0") int roleId
    ){
        Page<User> getAllUser;
        if((Integer)roleId == 0){
            getAllUser = userService.getAllUsers(page -1,pageSize);
        }
        else {
            getAllUser = userService.getAllUsersPagination(page -1,pageSize,roleId);
        }
        return new APIResponse<>(getAllUser.getSize(),getAllUser);
    }
    //abc
//
//    @PostMapping("/role/save")
//    public ResponseEntity<RoleDto> saveUser(@RequestBody RoleDto roleDto){
//        RoleDto result = userService.saveRole(roleDto);
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }
//
//    @PostMapping("/role/add-to-user")
//    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form){
//        Boolean result = userService.addRoleToUser(form.getRoleId(), form.getUserId());
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }



}

