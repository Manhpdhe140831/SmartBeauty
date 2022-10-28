package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.repository.SupplierRepository;
import com.swp.sbeauty.service.SupplierService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public Page<Supplier> getAllSupplierPagination(int offset, int pageSize) {
        Page<Supplier> suppliers =supplierRepository.findAll(PageRequest.of(offset,pageSize));
        return suppliers;
    }

    @Override
    public Page<Supplier> getSupplierPaginationAndSearch(String name, String address, String phone, int offset, int pageSize) {
        Page<Supplier> suppliers =supplierRepository.searchListWithField(name,address,phone,PageRequest.of(offset,pageSize));
        return suppliers;
    }


}
