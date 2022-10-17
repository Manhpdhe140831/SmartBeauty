package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Supplier;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplierDto {
        private Long id;
        private String name;
        private String phone;
        private String email;
        private String certificateImageURL;
        private String country;
        private String city;
        private String district;
        private String street;


    public SupplierDto(Supplier supplier){
        if(supplier != null){
            this.setId(supplier.getId());
            this.setName(supplier.getName());
            this.setPhone(supplier.getPhone());
            this.setEmail(supplier.getEmail());
            this.setCertificateImageURL(supplier.getCertificateImageURL());
            this.setCountry(supplier.getCountry());
            this.setCity(supplier.getCity());
            this.setDistrict(supplier.getDistrict());
            this.setStreet(supplier.getStreet());
        }
    }
}
