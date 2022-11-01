package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.BranchResponseDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.dto.SupplierResponseDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.repository.SupplierRepository;
import com.swp.sbeauty.service.SupplierService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public Boolean saveSupplier(String name, String taxCode, String description, String phone, String email, String address, String image) {
        Supplier supplier = new Supplier();
        supplier.setName(name);
        supplier.setTaxCode(taxCode);
        supplier.setDescription(description);
        supplier.setPhone(phone);
        supplier.setEmail(email);
        supplier.setAddress(address);
        supplier.setImage(image);
        supplierRepository.save(supplier);
        return true;
    }
    @Override
    public String validateSupplier(String name, String email,String phone) {
        String result = "";
        if(supplierRepository.existsByname(name)){
            result += "Name already exists in data, ";
        }
        if(supplierRepository.existsByPhone(phone)){
            result += "Phone already exists in data, ";
        }
        if(supplierRepository.existsByEmail(email)){
            result += "Email already exists in data, ";
        }
        return result;
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
                    supplier.setName(supplierDto.getName());
                    supplier.setTaxCode(supplierDto.getTaxCode());
                    supplier.setDescription(supplierDto.getDescription());
                    supplier.setPhone(supplierDto.getPhone());
                    supplier.setEmail(supplierDto.getEmail());
                    supplier.setAddress(supplierDto.getAddress());
                    supplier.setImage(supplierDto.getImage());
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


    @Override
    public SupplierResponseDto getSupplierAndSearch(String name, String address, String phone, int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        SupplierResponseDto supplierResponseDto = new SupplierResponseDto();
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<Supplier> page = supplierRepository.searchListWithField(name,address,phone,pageable);
        List<Supplier> suppliers = page.getContent();
        List<SupplierDto> supplierDtos = new ArrayList<>();
        for (Supplier supplier : suppliers){
            SupplierDto supplierDto = new SupplierDto();
            supplierDto = mapper.map(supplier,SupplierDto.class);
            supplierDtos.add(supplierDto);
        }
        supplierResponseDto.setSupplierDtoList(supplierDtos);
        supplierResponseDto.setTotalElement(page.getTotalElements());
        supplierResponseDto.setTotalPage(page.getTotalPages());
        supplierResponseDto.setPageIndex(pageNo+1);
        return supplierResponseDto;
    }

    @Override
    public SupplierResponseDto getAllSupplier(int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        SupplierResponseDto supplierResponseDto = new SupplierResponseDto();
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<Supplier> page = supplierRepository.findAll(pageable);
        List<Supplier> suppliers = page.getContent();
        List<SupplierDto> supplierDtos = new ArrayList<>();
        for (Supplier supplier : suppliers){
            SupplierDto supplierDto = new SupplierDto();
            supplierDto = mapper.map(supplier,SupplierDto.class);
            supplierDtos.add(supplierDto);
        }
        supplierResponseDto.setSupplierDtoList(supplierDtos);
        supplierResponseDto.setTotalElement(page.getTotalElements());
        supplierResponseDto.setTotalPage(page.getTotalPages());
        supplierResponseDto.setPageIndex(pageNo);
        return supplierResponseDto;
    }


}
