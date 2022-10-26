package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Supplier;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SupplierService {
    List<SupplierDto> getSupplier();
    SupplierDto saveSupplier(SupplierDto supplierDto);

    SupplierDto updateSupplier(SupplierDto supplierDto, Long id);
    Page<Supplier> findSupplierPaginationAndSort(int offset, int pageSize, String field, String direction);
}
