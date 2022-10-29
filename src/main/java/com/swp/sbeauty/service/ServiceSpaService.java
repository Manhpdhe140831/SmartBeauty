package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ServiceDto;
import org.springframework.data.domain.Page;

public interface ServiceSpaService {

    Page<ServiceDto> getListServiceSpa(int offset, int page);

    boolean deleteServiceSpa(Long id);

    ServiceDto createService(ServiceDto serviceDto);







}
