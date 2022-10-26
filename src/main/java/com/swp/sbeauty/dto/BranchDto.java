package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Branch;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class BranchDto {
    private Long id;
    @NotEmpty
    private String name;
    @NotEmpty
    @Pattern(regexp="(^$|[0-9]{10,11})", message = "phone number must consist of 10-11 digits")
    private String phone;
    @NotEmpty
    private String address;
    private String image;
    private UserDto users;

    public BranchDto(){}

    public BranchDto(Branch branch){
        if(branch != null){
            this.setId(branch.getId());
            this.setName(branch.getName());
            this.setPhone(branch.getPhone());
            this.setAddress(branch.getAddress());
            this.setImage(branch.getImage());
            if(branch.getUser() != null){
                users = new UserDto(branch.getUser());
            }
        }

    }
}
