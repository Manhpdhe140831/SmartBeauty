package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.entity.ServiceGroup;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@NoArgsConstructor
public class ServiceDto {
    private long id;
    private double price;
    private String description;
    private ServiceGroupDto serviceGroupDto;

    public  ServiceDto(Service service){
        this.setId(service.getId());
        this.setPrice(service.getPrice());
        this.setDescription(service.getDescription());
        if (null != service.getServiceGroup()){
            serviceGroupDto = new ServiceGroupDto(service.getServiceGroup());
        }

    }
}
