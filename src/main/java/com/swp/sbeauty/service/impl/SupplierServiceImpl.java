package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.entity.User;
import com.swp.sbeauty.repository.SupplierRepository;
import com.swp.sbeauty.service.SupplierService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service @Transactional @Slf4j
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;
    @Override
    public List<SupplierDto> getSupplier() {
        List<Supplier> list = supplierRepository.findAll();
        List<SupplierDto> result =new ArrayList<>();
        for(Supplier supplier : list){
            result.add(new SupplierDto(supplier));
        }
        return result;
    }

    @Override
    public SupplierDto getById(Long id) {
        if (id != null) {
            Supplier entity = supplierRepository.findById(id).orElse(null);
            if (entity != null) {
                return new SupplierDto(entity);
            }
        }
        return null;
    }

    @Override
    public SupplierDto saveSupplier(SupplierDto supplierDto) {
        try{
            if(supplierDto != null){
                Supplier supplier = new Supplier();
                supplier.setSupplierCode(supplierDto.getSupplierCode());
                supplier.setTaxCode(supplierDto.getTaxCode());
                supplier.setDescription(supplierDto.getDescription());
                supplier.setPhone(supplierDto.getPhone());
                supplier.setEmail(supplierDto.getEmail());
                supplier.setAddress(supplierDto.getAddress());
                supplier.setSupplierImage(supplierDto.getSupplierImage());
                supplier = supplierRepository.save(supplier);
                if(supplier != null){
                    return new SupplierDto(supplier);
                }
            }
        }catch (Exception e){
            throw e;
        }
        return null;
    }

    @Override
    public SupplierDto updateSupplier(SupplierDto supplierDto, Long id) {
        try{
            if(supplierDto !=null){
                Supplier supplier = null;
                if(id !=null){
                    Optional<Supplier> optional =supplierRepository.findById(id);
                    if(optional.isPresent()){
                        supplier = optional.get();
                    }
                }
                if(supplier != null){
                    supplier.setSupplierCode(supplierDto.getSupplierCode());
                    supplier.setTaxCode(supplierDto.getTaxCode());
                    supplier.setDescription(supplierDto.getDescription());
                    supplier.setPhone(supplierDto.getPhone());
                    supplier.setEmail(supplierDto.getEmail());
                    supplier.setAddress(supplierDto.getAddress());
                    supplier.setSupplierImage(supplierDto.getSupplierImage());
                    supplier = supplierRepository.save(supplier);
                    return new SupplierDto(supplier);
                } else {
                    return null;
                }
            }
        }catch (Exception e){
            throw e;
        }


        return null;
    }

    @Override
    public Page<Supplier> findSupplierPaginationAndSort(int offset, int pageSize, String field, String direction) {
        Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(field).ascending() : Sort.by(field).descending();
        Page<Supplier> suppliers =supplierRepository.findAll(PageRequest.of(offset,pageSize,sort));
        return suppliers;
    }

    @Override
    public Page<Supplier> findSupplierPaginationAndSearch(int offset, int pageSize, String field, String direction, String value) {
        Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(field).ascending() : Sort.by(field).descending();
        Page<Supplier> suppliers =supplierRepository.searchListWithField(value,PageRequest.of(offset,pageSize,sort));
        return suppliers;
    }


//    @Autowired
//    private SupplierRepository supplierRepository;
//    @Override
//    public List<SupplierDto> getSupplier() {
//        List<Supplier> list = supplierRepository.findAll();
//        List<SupplierDto> result = new ArrayList<>();
//        for (Supplier supplier :list){
//            result.add(new SupplierDto(supplier));
//        }
//        return result;
//    }
//
//    @Override
//    public SupplierDto saveSupplier(SupplierDto supplierDto) {
//        if(supplierDto != null){
//            Supplier supplier = new Supplier();
//            supplier.setName(supplierDto.getName());
//            supplier.setPhone(supplierDto.getPhone());
//            supplier.setEmail(supplierDto.getEmail());
//            supplier.setCertificateImageURL(supplierDto.getCertificateImageURL());
//            supplier.setCountry(supplierDto.getCountry());
//            supplier.setCity(supplierDto.getCity());
//            supplier.setDistrict(supplierDto.getDistrict());
//            supplier.setStreet(supplierDto.getStreet());
//            supplier = supplierRepository.save(supplier);
//            if(supplier != null){
//                return new SupplierDto(supplier);
//            }
//        }
//        return null;
//    }
//
//    @Override
//    public SupplierDto updateSupplier(SupplierDto supplierDto, Long id) {
//        if(supplierDto !=null){
//            Supplier supplier = null;
//            if(id !=null){
//                Optional<Supplier> optional =supplierRepository.findById(id);
//                if(optional.isPresent()){
//                    supplier = optional.get();
//                }
//            }
//            if(supplier != null){
//                supplier.setName(supplierDto.getName());
//                supplier.setPhone(supplierDto.getPhone());
//                supplier.setEmail(supplierDto.getEmail());
//                supplier.setCertificateImageURL(supplierDto.getCertificateImageURL());
//                supplier.setCountry(supplierDto.getCountry());
//                supplier.setCity(supplierDto.getCity());
//                supplier.setDistrict(supplierDto.getDistrict());
//                supplier.setStreet(supplierDto.getStreet());
//                supplier = supplierRepository.save(supplier);
//                return new SupplierDto(supplier);
//            } else {
//                return null;
//            }
//        }
//        return null;
//    }
}
