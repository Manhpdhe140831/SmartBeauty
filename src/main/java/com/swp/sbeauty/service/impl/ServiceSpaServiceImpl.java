package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.ProductRepository;
import com.swp.sbeauty.repository.ServiceRepository;
import com.swp.sbeauty.repository.mappingRepo.Service_Product_Mapping_Repository;
import com.swp.sbeauty.service.ServiceSpaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public Page<Service> getListServicePaginationAndSearch(String name, int offset, int pageSize) {
        Page<Service> services = repository.getListServiceWithPaginationAndSearch(name, PageRequest.of(offset, pageSize));
        return services;
    }

    @Override
    public String validateService(ServiceDto serviceDto) {
        String result ="";
      return null;
    }


}


