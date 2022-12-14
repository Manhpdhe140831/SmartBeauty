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
    String validateSupplier(String name, String email, String phone);
    SupplierResponseDto getSupplierAndSearch(String name, String address, String phone, int pageNo, int pageSize);
    SupplierResponseDto getAllSupplier(int pageNo,int pageSize);
    Boolean updateSupplier(Long id, String name, String taxCode,String description,String phone,String email, String address);

    Boolean delete(Long id);
}
