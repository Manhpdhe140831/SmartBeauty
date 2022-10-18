package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.SpaBed;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SpaBedDto {
    private Long id;
    private String status;
    private BranchDto branch;

    public SpaBedDto(){}

    public SpaBedDto(SpaBed spaBed){
        if(spaBed != null){
            this.setId(spaBed.getId());
            this.setStatus(spaBed.getStatus());
            if(spaBed.getBranch() != null){
                branch = new BranchDto(spaBed.getBranch());
            }
        }
    }
}
