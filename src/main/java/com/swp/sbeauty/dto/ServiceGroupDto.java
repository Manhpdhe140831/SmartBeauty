package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.ServiceGroup;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ServiceGroupDto {
    private long id;
    private String name;

    public ServiceGroupDto(ServiceGroup serviceGroup){
        this.setId(serviceGroup.getId());
        this.setName(serviceGroup.getName());
    }
}
