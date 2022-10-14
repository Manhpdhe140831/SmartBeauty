package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Branch;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BranchDto {
    private Long id;
    private String name;
    private String phone;
    private String email;

    public BranchDto(){}

    public BranchDto(Branch branch){
        if(branch != null){
            this.setId(branch.getId());
            this.setName(branch.getName());
            this.setPhone(branch.getPhone());
            this.setEmail(branch.getEmail());
        }
    }
}
