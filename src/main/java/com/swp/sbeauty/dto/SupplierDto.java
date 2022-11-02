package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Supplier;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class SupplierDto {

    private long id;
    private String name;

    private String taxCode;
    private String description;
    private String phone;
    @Email
    private String email;
    private String address;

    public SupplierDto() {
    }

    public SupplierDto(Supplier supplier) {
        if (supplier != null) {
            this.setId(supplier.getId());
            this.setName(supplier.getName());
            this.setTaxCode(supplier.getTaxCode());
            this.setDescription(supplier.getDescription());
            this.setPhone(supplier.getPhone());
            this.setEmail(supplier.getEmail());
            this.setAddress(supplier.getAddress());

        }


    }
}
