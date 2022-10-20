package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ServiceGroupDto;

import java.util.List;

public interface ServiceGroupService {

    List<ServiceGroupDto> getAll();
    ServiceGroupDto updateServiceGroup(ServiceGroupDto serviceGroupDto, Long id);
    ServiceGroupDto saveServiceGroup(ServiceGroupDto serviceGroupDto);
    Boolean removeServiceGroup(Long id);
    List<ServiceGroupDto> searchServiceGroupByName(String serviceGroupName);
}
