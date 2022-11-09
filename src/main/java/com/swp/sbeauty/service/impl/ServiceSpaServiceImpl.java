package com.swp.sbeauty.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.dto.mappingDto.Service_Product_MappingDto;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.entity.Service_Product_mapping;
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

import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
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
    ServiceRepository serviceRepository;

    @Autowired
    Service_Product_Mapping_Repository service_product_mapping_repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Boolean save(String name, String discountStart, String discountEnd, Double discountPercent, Double price, String description,Long duration ,String image, String products) {
        try {
            Service service = new Service();
            service.setName(name);
            if (discountStart != null) {
                //DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                //Date startDate = df.parse(discountStart);
                service.setDiscountStart(discountStart);
            }
            if(discountEnd != null){
                //DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
               // Date endDate = df.parse(discountEnd);
                service.setDiscountEnd(discountEnd);
            }
            if(discountPercent!=null){
                service.setDiscountPercent(discountPercent);
            }
            service.setPrice(price);
            if(description!=null){
                service.setDescription(description);
            }
            service.setDuration(duration);
            if(image!=null){
                service.setImage(image);
            }
            service = serviceRepository.save(service);

            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
            List<Service_Product_MappingDto> mappingDto = mapper.readValue(products, new TypeReference<List<Service_Product_MappingDto>>() {});
            for(Service_Product_MappingDto mapping : mappingDto){
                service_product_mapping_repository.save(new Service_Product_mapping(service.getId(), mapping.getProductId(), mapping.getUsage()));
            }
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public ServiceDto getServiceById(Long id) {
        if (id != null){
            Service service = serviceRepository.getServiceById(id);
            List<Service_Product_mapping> listMapping = service_product_mapping_repository.getMappingByServiceId(id);
            List<Service_Product_MappingDto> list = new ArrayList<>();
            for(Service_Product_mapping mapping : listMapping){
                Product product = productRepository.getProductById(mapping.getProduct_id());
                list.add(new Service_Product_MappingDto(new ProductDto(product), mapping.getProductUsage()));
            }
            ServiceDto serviceDto = new ServiceDto(id, service.getName(), service.getDiscountStart(), service.getDiscountEnd(), service.getDiscountPercent(), service.getPrice(), service.getDescription(), service.getDuration(), service.getImage(), list);
            return serviceDto;
        }else {
            return null;
        }

    }

    @Override
    public ServiceResponseDto getListServicePaginationAndSearch(String name, int pageNo, int pageSize) {
        ServiceResponseDto serviceResponseDto = new ServiceResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Service> page = repository.getListServiceWithPaginationAndSearch(name, pageable);

        List<ServiceDto> serviceDtos = page
                .stream()
                .map(course -> mapper.map(course, ServiceDto.class))
                .collect(Collectors.toList());
        for(ServiceDto serviceDto : serviceDtos){
            List<Service_Product_mapping> listMapping = service_product_mapping_repository.getMappingByServiceId(serviceDto.getId());
            List<Service_Product_MappingDto> list = new ArrayList<>();
            for(Service_Product_mapping mapping : listMapping){
                Product product = productRepository.getProductById(mapping.getProduct_id());
                list.add(new Service_Product_MappingDto(new ProductDto(product), mapping.getProductUsage()));
            }
            serviceDto.setProducts(list);
        }

        serviceResponseDto.setData(serviceDtos);
        serviceResponseDto.setTotalElement(page.getTotalElements());
        serviceResponseDto.setTotalPage(page.getTotalPages());
        serviceResponseDto.setPageIndex(pageNo + 1);

        return serviceResponseDto;
    }

    @Override
    public ServiceResponseDto getAll(int pageNo, int pageSize) {
         ServiceResponseDto serviceResponseDto = new ServiceResponseDto();
         Pageable pageable = PageRequest.of(pageNo, pageSize);
         Page<Service> page = repository.findAll(pageable);

        List<ServiceDto> serviceDtos = page
                .stream()
                .map(course -> mapper.map(course, ServiceDto.class))
                .collect(Collectors.toList());
        for(ServiceDto serviceDto : serviceDtos){
            List<Service_Product_mapping> listMapping = service_product_mapping_repository.getMappingByServiceId(serviceDto.getId());
            List<Service_Product_MappingDto> list = new ArrayList<>();
            for(Service_Product_mapping mapping : listMapping){
                Product product = productRepository.getProductById(mapping.getProduct_id());
                list.add(new Service_Product_MappingDto(new ProductDto(product), mapping.getProductUsage()));
            }
            serviceDto.setProducts(list);
        }

        serviceResponseDto.setData(serviceDtos);
        serviceResponseDto.setTotalPage(page.getTotalPages());
        serviceResponseDto.setTotalElement(page.getTotalElements());
        serviceResponseDto.setPageIndex(pageNo);
        return serviceResponseDto;
    }

    @Override
    public String validateService(String name, String discountStart, String discountEnd, Double discountPercent) {
        String result = "";
        if(discountStart!=null || discountEnd!=null){
            if(discountPercent == null){
                result += "Discount percent cannot be null. ";
            }
        }
        if(serviceRepository.existsByName(name)){
            result += "Name already exists in data. ";
        }
        return result;
    }

    @Override
    public Boolean update(Long id, String name, String discountStart, String discountEnd, Double discountPercent, Double price, String description, Long duration, String image, String products) {
        try {
            Service service = serviceRepository.getServiceById(id);
            if(name!=null){
                service.setName(name);
            }
            if (discountStart != null) {
                //DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                //Date startDate = df.parse(discountStart);
                service.setDiscountStart(discountStart);
            }
            if(discountEnd != null){
                //DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                //Date endDate = df.parse(discountEnd);
                service.setDiscountEnd(discountEnd);
            }
            if(discountPercent!=null){
                service.setDiscountPercent(discountPercent);
            }
            if(price!=null){
                service.setPrice(price);
            }
            if(description!=null){
                service.setDescription(description);
            }
            if(duration!=null){
                service.setDuration(duration);
            }
            if(image!=null){
                service.setImage(image);
            }
            serviceRepository.save(service);
            List<Service_Product_mapping> listMapping = service_product_mapping_repository.getMappingByServiceId(id);
            for(Service_Product_mapping mapping : listMapping){
                service_product_mapping_repository.deleteById(mapping.getId());
            }
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
            List<Service_Product_MappingDto> mappingDto = mapper.readValue(products, new TypeReference<List<Service_Product_MappingDto>>() {});
            for(Service_Product_MappingDto mapping : mappingDto){
                service_product_mapping_repository.save(new Service_Product_mapping(id, mapping.getProductId(), mapping.getUsage()));
            }
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}


