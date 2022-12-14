package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Branch;

import com.swp.sbeauty.entity.Users;

import com.swp.sbeauty.entity.Users;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
public class BranchDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String logo;
    private UserDto manager;

    public BranchDto(){}

    public BranchDto(Long id, String name, UserDto manager, String phone, String address , String email, String logo){
        this.id = id;
        this.name = name;
        this.manager = manager;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.logo = logo;

    }

    public BranchDto(Long id, String name, String phone, String address, String logo){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.logo = logo;
    }



    public BranchDto(Branch branch){
        if(branch != null){
            this.setId(branch.getId());
            this.setName(branch.getName());
            this.setPhone(branch.getPhone());
            this.setAddress(branch.getAddress());
            this.setLogo(branch.getLogo());

        }



    }
}
