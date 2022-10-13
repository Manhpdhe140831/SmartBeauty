package com.swp.sbeauty.dto;


import com.swp.sbeauty.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Long id;
    private String name;
    private String username;
    private String password;
    private RoleDto role;

    public UserDto(){}

    public UserDto(User user){
        if(user != null){
            this.setId(user.getId());
            this.setName(user.getName());
            this.setUsername(user.getUsername());
            this.setPassword(user.getPassword());
            if(user.getRole()!=null){
                role =new RoleDto(user.getRole());
            }
        }
    }
}

