package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.ResponseDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.dto.UserResponse;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Users;
import com.swp.sbeauty.repository.UserRepository;
import com.swp.sbeauty.security.jwt.JwtResponse;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.UserService;
import com.swp.sbeauty.validation.ValidInputDto;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

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

    @PostMapping("/user/save")
    public ResponseEntity<?> saveUser(@RequestParam(value = "name") String name,
                                      @RequestParam(value = "email") String email,
                                      @RequestParam(value = "phone") String phone,
                                      @RequestParam(value = "dateOfBirth") String dateOfBirth,
                                      @RequestParam(value = "gender") String gender,
                                      @RequestParam(value = "address") String address,
                                      @RequestParam(value = "password") String password,
                                      @RequestHeader("Authorization") String authHeader) {
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        String roleCheck = temp.get("role").toString();
        Integer idcheck = Integer.parseInt(temp.get("id").toString());
        String check = userService.validateUser(email, phone);
        if (check == "") {
            Boolean result = userService.saveUser(name, email, phone, dateOfBirth, gender, address, password, roleCheck, idcheck);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping ("/user/update")
    public ResponseEntity<?> updateUser(@RequestParam(value = "id") Long id,
                                              @RequestParam(value = "name", required = false) String name,
                                              @RequestParam(value = "email", required = false) String email,
                                              @RequestParam(value = "phone", required = false) String phone,
                                              @RequestParam(value = "dateOfBirth", required = false) String dateOfBirth,
                                              @RequestParam(value = "gender", required = false) String gender,
                                              @RequestParam(value = "address", required = false) String address){
        String check = userService.validateUser(email, phone);
        if(check == ""){
            Boolean result = userService.updateUser(id, name, email, phone, dateOfBirth, gender, address);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }

    }
    @GetMapping(value = "user/getById")
    public ResponseEntity<UserDto> getById(@RequestParam(value = "id",required = false) Long id) {
        UserDto result = userService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    @GetMapping(value = "user/getAllManager")
    public ResponseEntity<List<UserDto>> getByRole() {
        List<UserDto> result = userService.getAllManager();
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
    /*@GetMapping("/user")
    private APIResponse<Page<UserDto>> getAllUserByRoleName(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "roleId", required = false, defaultValue = "0") int roleId
            , @RequestHeader("Authorization") String authHeader){
        Page<UserDto> getAllUser;
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        String role = temp.get("role").toString();

        if((Integer)roleId == 0){
            getAllUser = userService.getAllUsers(page,pageSize);
        }
        else {
            getAllUser = userService.getAllUsersPagination(page,pageSize,roleId);
        }
        return new APIResponse<>(getAllUser.getSize(),getAllUser);
    }*/

    @GetMapping("/user/getAll")
    private APIResponse<Page<UserDto>> getAllUserByAdmin(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestHeader("Authorization") String authHeader){
        Page<UserDto> getAllUser;
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        String role = temp.get("role").toString();
        Integer idcheck = Integer.parseInt(temp.get("id").toString());
        if (role.equalsIgnoreCase("admin")){
            getAllUser = userService.getAllUsersByAdmin(page -1,pageSize);
        }else if(role.equalsIgnoreCase("manager")){
            getAllUser = userService.getAllUsersByManager(idcheck, page -1,pageSize);
        }else{
            getAllUser = userService.getAllUsers(page -1,pageSize);
        }
        return new APIResponse<>(getAllUser.getSize(),getAllUser);
    }

    @GetMapping(value = "/user/getByBranch")
    public ResponseEntity<List<UserDto>> getUsersByBranch(@RequestParam("branchId") String branchId){
        List<UserDto> list = userService.getUsersByBranch(branchId);
        return new ResponseEntity<>(list, (list != null) ? HttpStatus.OK : HttpStatus.NO_CONTENT);
    }
    @GetMapping("/user")
    private ResponseEntity<?> getAllUserByAuthor(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestHeader("Authorization") String authHeader){
        Page<UserDto> getAllUser;
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        String role = temp.get("role").toString();
        Integer idcheck = Integer.parseInt(temp.get("id").toString());
        if (role.equalsIgnoreCase("admin")){
            UserResponse userResponse = userService.getAllUser(page-1,pageSize);
            return new ResponseEntity<>(userResponse,HttpStatus.OK);
        }else if(role.equalsIgnoreCase("manager")){
            UserResponse userResponse = userService.getUserByManager(idcheck,page-1,pageSize);
            return new ResponseEntity<>(userResponse,HttpStatus.OK);
        }else{
            getAllUser = userService.getAllUsers(page ,pageSize);
            return new ResponseEntity<>(userRepository,HttpStatus.OK);
        }

    }



}