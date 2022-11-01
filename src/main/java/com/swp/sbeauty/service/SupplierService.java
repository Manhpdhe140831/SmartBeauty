package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Supplier;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SupplierService {
    List<SupplierDto> getSupplier();
    SupplierDto getById(Long id);
    Boolean saveSupplier(String name, String taxCode,String description,String phone,String email, String address);

    SupplierDto updateSupplier(SupplierDto supplierDto, Long id);
    Page<Supplier> getAllSupplierPagination(int offset,int pageSize);
    Page<Supplier> getSupplierPaginationAndSearch(String name,String address,String phone,int offset,int pageSize);
    String validateSupplier(String name, String email, String address);
    SupplierResponseDto getSupplierAndSearch(String name, String address, String phone, int pageNo, int pageSize);
    SupplierResponseDto getAllSupplier(int pageNo,int pageSize);
    Boolean updateSupplier(Long id, String name, String taxCode,String description,String phone,String email, String address);
}
