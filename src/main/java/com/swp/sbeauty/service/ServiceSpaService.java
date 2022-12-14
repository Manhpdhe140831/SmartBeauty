package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ServiceCourseBuyedDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.dto.ServiceResponseDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.dto.mappingDto.Service_Product_MappingDto;
import com.swp.sbeauty.entity.Service;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

public interface ServiceSpaService {

    Boolean save(String name, String discountStart, String discountEnd, Double discountPercent, Double price, String description, Long duration  , MultipartFile image, String products);

    ServiceDto getServiceById(Long id);

    ServiceResponseDto getListServicePaginationAndSearch(String name, int pageNo, int pageSize);

    ServiceResponseDto getAll(int pageNo, int pageSize);

    String validateService(String name, String discountStart, String discountEnd, Double discountPercent);

    ServiceCourseBuyedDto findProductCourseService(String keyword, Long idCustomer);
    String update(Long id, String name, String discountStart, String discountEnd, Double discountPercent, Double price, String description, Long duration, MultipartFile image, String products);

    Boolean delete(Long id);
}
