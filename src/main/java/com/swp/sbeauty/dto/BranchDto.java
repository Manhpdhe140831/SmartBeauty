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
    private String country;
    private String city;
    private String district;
    private String street;

    public BranchDto(){}

    public BranchDto(Branch branch){
        if(branch != null){
            this.setId(branch.getId());
            this.setName(branch.getName());
            this.setPhone(                                             branch.getPhone());
            this.setEmail(branch.getEmail());
            this.setCountry(branch.getCountry());
            this.setCity(branch.getCity());
            this.setDistrict(branch.getDistrict());
            this.setStreet(branch.getStreet());
        }
    }
}
