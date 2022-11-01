package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.dto.ServiceResponseDto;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.ProductRepository;
import com.swp.sbeauty.repository.ServiceRepository;
import com.swp.sbeauty.repository.mappingRepo.Service_Product_Mapping_Repository;
import com.swp.sbeauty.service.ServiceSpaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServiceSpaServiceImpl implements ServiceSpaService {

    @Autowired
    ServiceRepository repository;
    @Autowired
    BranchRepository branchRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    Service_Product_Mapping_Repository service_product_mapping_repository;

    @Autowired
    private ModelMapper mapper;


    @Override
    public Page<Service> getListServiceSpaWithPagination(int offset, int pageSize) {
        Page<Service> services = repository.findAll(PageRequest.of(offset, pageSize));

        return services;
    }

    @Override
    public boolean deleteServiceSpa(Long id) {
        return false;
    }

    @Override
    public ServiceDto save(ServiceDto serviceDto) {

        try {
            if (serviceDto != null){
                Service service = new Service();

            }

        }catch (Exception e){
            throw e;
        }



        return null;
    }

    @Override
    public ServiceDto getServiceById(Long id) {
        if (id != null){
            Long usage = 0l;
            List<Product> list = productRepository.getAllProductByServiceId(id);
            List<ProductDto> listProduct = new ArrayList<>();

            for (Product itemP: list
                 ) {

                listProduct.add(new ProductDto(itemP));
               usage = service_product_mapping_repository.getUsageByProductId(itemP.getId());
            }
            Service service = null;
           Optional<Service> optional = repository.findById(id);
            if (optional.isPresent()){
                service = optional.get();
            }

            ServiceDto serviceDto = new ServiceDto(service, usage, listProduct);

            return serviceDto;



        }
        return null;
    }

    @Override
    public ServiceResponseDto getListServicePaginationAndSearch(String name, int pageNo, int pageSize) {
        ServiceResponseDto serviceResponseDto = new ServiceResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Service> page = repository.getListServiceWithPaginationAndSearch(name, pageable);
        List<Service> services = page.getContent();

        List<ServiceDto> serviceDto = page
                .stream()
                .map(service -> mapper.map(service, ServiceDto.class))
                .collect(Collectors.toList());

        List<ServiceDto> result = new ArrayList<>(serviceDto);
        serviceResponseDto.setData(result);
        serviceResponseDto.setTotalElement(page.getTotalElements());
        serviceResponseDto.setTotalPage(page.getTotalPages());
        serviceResponseDto.setPageIndex(pageNo + 1);

        return serviceResponseDto;
    }

    @Override
    public String validateService(ServiceDto serviceDto) {
        String result ="";
      return null;
    }

    @Override
    public ServiceResponseDto getAll(int pageNo, int pageSize) {
         ServiceResponseDto serviceResponseDto = new ServiceResponseDto();
         Pageable pageable = PageRequest.of(pageNo, pageSize);
         Page<Service> page = repository.findAll(pageable);
         List<Service> services = page.getContent();
         List<ServiceDto> serviceDtos = new ArrayList<>();
         List<ProductDto> productDtos = new ArrayList<>();
         List<Product> listProduct = new ArrayList<>();
        for (Service itemS: services
             ) {
            ServiceDto serviceDto= new ServiceDto();
            serviceDto = mapper.map(itemS, ServiceDto.class);
            serviceDtos.add(serviceDto);
        }

        serviceResponseDto.setData(serviceDtos);
        serviceResponseDto.setTotalPage(page.getTotalPages());
        serviceResponseDto.setTotalElement(page.getTotalElements());
        serviceResponseDto.setPageIndex(pageNo);
        return serviceResponseDto;
    }


}


