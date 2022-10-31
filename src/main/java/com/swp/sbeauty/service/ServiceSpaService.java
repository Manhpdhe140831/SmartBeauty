package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.domain.Page;

public interface ServiceSpaService {

    Page<Service> getListServiceSpaWithPagination(int offset, int page);

    boolean deleteServiceSpa(Long id);

    ServiceDto save(ServiceDto serviceDto);
    ServiceDto getServiceById(Long id);
    Page<Service> getListServicePaginationAndSearch(String name, int offset, int pageSize);

    public String validateService(ServiceDto serviceDto);






}
