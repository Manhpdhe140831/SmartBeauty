package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.ProductRepository;
import com.swp.sbeauty.repository.ServiceRepository;
import com.swp.sbeauty.service.ServiceSpaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@org.springframework.stereotype.Service
public class ServiceSpaServiceImpl implements ServiceSpaService {

    @Autowired
    ServiceRepository repository;
    @Autowired
    BranchRepository branchRepository;

    @Autowired
    ProductRepository productRepository;


    @Override
    public Page<ServiceDto> getListServiceSpa(int offset, int pageSize) {
        Page<Service> services = repository.findAll(PageRequest.of(offset, pageSize));
        Page<ServiceDto> result = services.map(service -> new ServiceDto(service));
        return result;
    }

    @Override
    public boolean deleteServiceSpa(Long id) {
        return false;
    }

    @Override
    public ServiceDto createService(ServiceDto serviceDto) {
//        if (null != serviceDto){
//            Service service = new Service();
//            service.setCodeService(serviceDto.getCodeService());
//            service.setNameService(serviceDto.getNameService());
//            service.setPriceService(serviceDto.getPriceService());
//            service.setStartDiscount(serviceDto.getStartDiscount());
//            service.setEndDiscount(serviceDto.getEndDiscount());
//            service.setDiscountPercent(serviceDto.getDiscountPercent());
//            service.setDescription(serviceDto.getDescription());
//            service.setMinutesNumber(serviceDto.getMinutesNumber());
//            service.setImageService(serviceDto.getImageService());
//            Set<Branch> branchSet = new HashSet<>();
//            if (serviceDto.getBranch() != null || serviceDto.getBranch().isEmpty()){
//                for (BranchDto itemB: serviceDto.getBranch()
//                     ) {
//                    if (null != itemB){
//                        Branch branch = null;
//                        if (itemB.getId() != null){
//                            Optional<Branch> optionalBranch = branchRepository.findById(itemB.getId());
//                            if (optionalBranch.isPresent()){
//                                branch = optionalBranch.get();
//                            }
//                            if (null != branch){
//                                branchSet.add(branch);
//                            }
//                        }
//                    }
//                }
//                service.setBranch(branchSet);
//            }else {
//               Set<Branch> branchAll =(Set<Branch>) branchRepository.findAll();
//                for (Branch item: branchAll
//                     ) {
//                    branchSet.add(item);
//                }
//                service.setBranch(branchSet);
//            }
//
//            Set<Product> productSet = new HashSet<>();
//            if (serviceDto.getProduct() != null || serviceDto.getProduct().isEmpty()){
//                for (ProductDto itemP: serviceDto.getProduct()
//                ) {
//                    if (null != itemP){
//                        Product product = null;
//                        if (itemP.getId() != null){
//                            Optional<Product> optionalProduct = productRepository.findById(itemP.getId());
//                            if (optionalProduct.isPresent()){
//                                product = optionalProduct.get();
//                            }
//                            if (null != product){
//                                productSet.add(product);
//                            }
//                        }
//                    }
//                }
//                service.setProduct(productSet);
//            }else {
//                Set<Product> productAll =(Set<Product>) productRepository.findAll();
//                for (Product product: productAll
//                ) {
//                    productSet.add(product);
//                }
//                service.setProduct(productSet);
//            }
//
//            service = repository.save(service);
//            return new ServiceDto(service);
//
//        }

        return null;
    }



}


