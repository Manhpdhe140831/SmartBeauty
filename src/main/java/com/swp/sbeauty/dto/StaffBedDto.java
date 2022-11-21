package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.SpaBed;
import lombok.Data;

import java.util.List;
@Data
public class StaffBedDto {
    List<UserDto> users;
    List<SpaBedDto> beds;

    public StaffBedDto() {
    }

    public StaffBedDto(List<UserDto> users, List<SpaBedDto> beds) {
        this.users = users;
        this.beds = beds;
    }
}
