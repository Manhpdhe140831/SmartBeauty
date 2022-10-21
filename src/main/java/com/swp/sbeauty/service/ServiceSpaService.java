package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ServiceDto;

import java.util.List;

public interface ServiceSpaService {

    List<ServiceDto> getAll();
    ServiceDto updateService(ServiceDto serviceDto, Long id);
    ServiceDto addService(ServiceDto serviceDto);
    Boolean removeService(Long id);
    List<ServiceDto> searchServiceByServiceGroupId(Long id);
}
