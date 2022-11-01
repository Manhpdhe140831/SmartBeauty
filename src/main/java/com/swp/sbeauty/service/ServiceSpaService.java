package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.dto.ServiceResponseDto;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.domain.Page;

public interface ServiceSpaService {

    Page<Service> getListServiceSpaWithPagination(int offset, int page);

    boolean deleteServiceSpa(Long id);

    ServiceDto save(ServiceDto serviceDto);
    ServiceDto getServiceById(Long id);
    ServiceResponseDto getListServicePaginationAndSearch(String name, int pageNo, int pageSize);

    public String validateService(ServiceDto serviceDto);

    public ServiceResponseDto getAll(int pageNo, int pageSize);






}
