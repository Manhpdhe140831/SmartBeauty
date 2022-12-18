package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.SpaBed;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SpaBedDto {
    private Long id;
    private String name;

    private String description;
    private BranchDto branch;

    public SpaBedDto(){}

    public SpaBedDto(SpaBed spaBed){
        if(spaBed != null){
            this.setId(spaBed.getId());
            this.setName(spaBed.getName());
            this.setDescription(spaBed.getDescription());
        }
    }

    public SpaBedDto(Long id, String name, BranchDto branch, String description) {
        this.id = id;
        this.name = name;
        this.branch = branch;
        this.description = description;
    }

    public SpaBedDto(String name, BranchDto branch) {
        this.name = name;
        this.branch = branch;
    }

}
