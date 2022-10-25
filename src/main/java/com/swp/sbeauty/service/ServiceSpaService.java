package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.ServiceDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Set;

public interface ServiceSpaService {

    Page<ServiceDto> getListServiceSpa(int offset, int page);

    boolean deleteServiceSpa(Long id);

    ServiceDto createService(ServiceDto serviceDto);




}
