package com.swp.sbeauty.dto;


import com.swp.sbeauty.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleDto {
    private Long id;
    private String name;
    public RoleDto(){

    }
    public RoleDto(Role role){
        this.setId(role.getId());
        this.setName(role.getName());
    }
}
