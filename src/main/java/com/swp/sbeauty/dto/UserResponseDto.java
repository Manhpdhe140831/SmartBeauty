package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.Users;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private String mobile;
    private Date dateOfBirth;
    private String gender;
    private String address;
    private String urlImage;
    private String role;
    private Set<RoleDto> roles;

    public UserResponseDto(){}

    public UserResponseDto(Users user){
        if(user != null){
            this.setId(user.getId());
            this.setName(user.getName());
            this.setEmail(user.getEmail());
            this.setMobile(user.getMobile());
            this.setDateOfBirth(user.getDateOfBirth());
            this.setGender(user.getGender());
            this.setAddress(user.getAddress());
            if(user.getRoles()!=null){
                this.roles = new HashSet<>();
                for(Role role : user.getRoles()){
                    this.roles.add(new RoleDto(role));
                }
            }
        }
    }
}

