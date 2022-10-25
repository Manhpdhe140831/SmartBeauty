package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Supplier;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplierDto {
    private Long id;
    private String supplierCode;
    private String taxCode;
    private String description;
    private String phone;
    private String email;
    private String address;
    private String supplierImage;
    public SupplierDto(){}
    public SupplierDto(Supplier supplier) {
        if (supplier != null) {
            this.setId(supplier.getId());
            this.setSupplierCode(supplier.getSupplierCode());
            this.setTaxCode(supplier.getTaxCode());
            this.setDescription(supplier.getDescription());
            this.setPhone(supplier.getPhone());
            this.setEmail(supplier.getEmail());
            this.setAddress(supplier.getAddress());
            this.setSupplierImage(supplier.getSupplierImage());

        }
    }
}
