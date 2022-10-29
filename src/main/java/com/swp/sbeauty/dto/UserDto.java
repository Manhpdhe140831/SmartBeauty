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
    private String mobile;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dateOfBirth;
    private String gender;
    private String address;
    private String password;
    private String urlImage;
    private String role;
    private Set<RoleDto> roles;

    public UserDto(){}

    public UserDto(Users user){
        if(user != null){
            this.setId(user.getId());
            this.setName(user.getName());
            this.setEmail(user.getEmail());
            this.setMobile(user.getMobile());
            this.setDateOfBirth(user.getDateOfBirth());
            this.setGender(user.getGender());
            this.setAddress(user.getAddress());
            this.role = user.getRoles().stream().findFirst().get().getName();
        }
    }
}

