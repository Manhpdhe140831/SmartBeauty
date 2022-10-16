package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.SupplierDto;

import java.util.List;

public interface SupplierService {
    List<SupplierDto> getSupplier();
    SupplierDto saveSupplier(SupplierDto supplierDto);

    SupplierDto updateSupplier(SupplierDto supplierDto, Long id);
}
