package com.swp.sbeauty.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.Users;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    @JsonFormat(pattern="yyyy-MM-dd")
    private String dateOfBirth;
    private String gender;
    private String address;
    private String password;
    private String image;

    private String role;
    private Set<RoleDto> roles;
    private Set<Role> roleSet;


    public UserDto(){}

    public UserDto(Users user){
        if(user != null){
            this.setId(user.getId());
            this.setName(user.getName());
            this.setEmail(user.getEmail());
            this.setPhone(user.getPhone());
            this.setDateOfBirth(user.getDateOfBirth());
            this.setGender(user.getGender());
            this.setAddress(user.getAddress());
            this.setImage(user.getUrlImage());
            this.role = user.getRoles().stream().findFirst().get().getName();
        }
    }
    public UserDto(Long id, String name, String email, String phone, String dateOfBirth,String gender, String address, String urlImage,Set<Role> roles ){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.address = address;
        this.image = urlImage;
        this.roleSet = roles;

    }
}

