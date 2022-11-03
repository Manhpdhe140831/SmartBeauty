package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.dto.ServiceResponseDto;
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

import java.util.Date;
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

//           if(name != null){
//        service.setName(name);
//    }
//        if (discountStart != null) {
//        service.setDiscountStart(discountStart);
//    }
//            if (discountEnd != null){
//        service.setDiscountEnd(discountEnd);
//    }
//            if (discountPercent != null){
//        service.setDiscountPercent(discountPercent);
//    }
//            if (price != null){
//        service.setPrice(price);
//    }
//            if (description != null){
//        service.setDescription(description);
//    }
//            if (image != null){
//        service.setImage(image);
//    }
    @Override
    public Boolean save(String name, Date discountStart, Date discountEnd, Double discountPercent, Double price, String description,Long duration ,String image, List<Service_Product_MappingDto> service_product_mappingDtos) {
                Service service = new Service();
                service.setName(name);
                service.setDiscountStart(discountStart);
                service.setDiscountEnd(discountEnd);
                service.setDiscountPercent(discountPercent);
                service.setPrice(price);
                service.setDescription(description);
                service.setDuration(duration);
                service.setImage(image);

            if (service_product_mappingDtos == null){
                repository.save(service);
            }else {
                repository.save(service);
                Service_Product_MappingDto service_product_mappingDto = new Service_Product_MappingDto();


                for (Service_Product_MappingDto itemS : service_product_mappingDtos
                ) {
                    service_product_mappingDto = new Service_Product_MappingDto(itemS.getProductDto(), itemS.getUsage());
                    service_product_mapping_repository.save(new Service_Product_mapping(service.getId(), service_product_mappingDto.getProductDto().getId(), service_product_mappingDto.getUsage()));

                }
            }


        return true;
    }




    @Override
    public ServiceDto getServiceById(Long id) {
        if (id != null){
            Service service = null;
           Optional<Service> optional = repository.findById(id);
            if (optional.isPresent()){
                service = optional.get();
            }

            List<Service_Product_mapping> productsRaw = service_product_mapping_repository.listProducts(id);
            List<Service_Product_MappingDto> products = new ArrayList<>();
            ProductDto productDto = null;
            Long usage = 0l;
            for(Service_Product_mapping a : productsRaw){

                Product product = null;
                    Optional<Product> optional1 = productRepository.findById(a.getProduct_id());
                    if (optional.isPresent()){
                        product = optional1.get();
                        productDto = new ProductDto(product);
                        usage = service_product_mapping_repository.getUsage(id, a.getProduct_id());
                        products.add(new Service_Product_MappingDto(productDto, usage));
                    }
            }

            ServiceDto serviceDto = new ServiceDto(service, products);

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


//         List<Product> listProduct = new ArrayList<>();
//         Long usage = 0l;
       List<ServiceDto> listServiceDtos = new ArrayList<>();
//        ServiceDto serviceDto = new ServiceDto();
//        Service_Product_MappingDto service_product_mappingDto  = new Service_Product_MappingDto();
//        List<Service_Product_MappingDto> service_product_mappingDtoList = new ArrayList<>();
//        for (Service itemS: services
//             ) {
//            listProduct = service_product_mapping_repository.getProductByService(itemS.getId());
//
//            for (Product p: listProduct
//                 ) {
//                usage = service_product_mapping_repository.getUsage(itemS.getId(), p.getId());
//
//                service_product_mappingDto = new Service_Product_MappingDto(new ProductDto(p), usage);
//                service_product_mappingDtoList.add(service_product_mappingDto);
//            }
//            serviceDto = new ServiceDto(itemS, service_product_mappingDtoList);
//            listServiceDtos.add(serviceDto);
//        }
        serviceResponseDto.setData(listServiceDtos);
        serviceResponseDto.setTotalPage(page.getTotalPages());
        serviceResponseDto.setTotalElement(page.getTotalElements());
        serviceResponseDto.setPageIndex(pageNo);
        return serviceResponseDto;
    }


}


