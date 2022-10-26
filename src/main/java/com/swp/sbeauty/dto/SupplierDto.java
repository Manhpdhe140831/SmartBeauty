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

    private Long id;
    @NotEmpty
    @Size(min = 5, message = "supplier code should have at least 5 characters")
    private String supplierCode;
    @NotEmpty
    @Size(min = 10, message = "tax code should have at least 10 characters")
    private String taxCode;
    private String description;
    @NotEmpty
    @Pattern(regexp="(^$|[0-9]{10,11})", message = "phone number must consist of 10-11 digits")
    private String phone;
    @Email
    private String email;
    private String address;
    private String supplierImage;

    public SupplierDto() {
    }

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
