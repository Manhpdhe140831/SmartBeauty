package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Supplier;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SupplierService {
    List<SupplierDto> getSupplier();
    SupplierDto getById(Long id);
    SupplierDto saveSupplier(SupplierDto supplierDto);

    SupplierDto updateSupplier(SupplierDto supplierDto, Long id);
    Page<Supplier> getAllSupplierPagination(int offset,int pageSize);
    Page<Supplier> getSupplierPaginationAndSearch(String name,String address,String phone,int offset,int pageSize);
}
