package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.repository.SupplierRepository;
import com.swp.sbeauty.service.SupplierService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service @Transactional @Slf4j
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;
    @Override
    public List<SupplierDto> getSupplier() {
        List<Supplier> list = supplierRepository.findAll();
        List<SupplierDto> result = new ArrayList<>();
        for (Supplier supplier :list){
            result.add(new SupplierDto(supplier));
        }
        return result;
    }

    @Override
    public SupplierDto saveSupplier(SupplierDto supplierDto) {
        return null;
    }

    @Override
    public SupplierDto updateSupplier(SupplierDto supplierDto, Long id) {
        return null;
    }
}
