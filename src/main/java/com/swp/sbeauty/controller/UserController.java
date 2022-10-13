package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/user/list")
    public ResponseEntity<List<UserDto>> getUsers(){
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/user/save")
    public ResponseEntity<UserDto> saveUser(@RequestBody UserDto userDto){
        UserDto result = userService.saveUser(userDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PutMapping ("/user/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable Long id){
        UserDto result = userService.updateUser(userDto, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
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

