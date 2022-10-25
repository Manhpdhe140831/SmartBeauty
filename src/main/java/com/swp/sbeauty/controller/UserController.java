package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.security.jwt.JwtResponse;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.security.services.UserDetailsImpl;
import com.swp.sbeauty.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    JwtUtils jwtUtils;

    @GetMapping("/user/list")
    public ResponseEntity<List<UserDto>> getUsers(){
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/user/save")
    public ResponseEntity<UserDto> saveUser(@Valid @RequestBody UserDto userDto){
        UserDto result = userService.saveUser(userDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
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
    @PostMapping("/auth/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody UserDto loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(jwt);
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

