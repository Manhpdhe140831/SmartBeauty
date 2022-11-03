package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.dto.ServiceResponseDto;
import com.swp.sbeauty.dto.mappingDto.Service_Product_MappingDto;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;

public interface ServiceSpaService {

    Page<Service> getListServiceSpaWithPagination(int offset, int page);

    boolean deleteServiceSpa(Long id);

//    private String name;
//    private Date discountStart;
//    private Date discountEnd;
//    private Double discountPercent;
//    private double price;
//    private String description;
//    private long duration;
//    private String image;
    Boolean save(String name,Date discountStart, Date discountEnd, Double discountPercent, Double price, String description,Long duration  ,String image, List<Service_Product_MappingDto> service_product_mappingDtos);
    ServiceDto getServiceById(Long id);
    ServiceResponseDto getListServicePaginationAndSearch(String name, int pageNo, int pageSize);

    public String validateService(ServiceDto serviceDto);

    public ServiceResponseDto getAll(int pageNo, int pageSize);






}
