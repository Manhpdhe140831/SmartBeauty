package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
public class ProductDto {
    private Long id;
    private String name;
    private Double importPrice;
    private Double salePrice;
    private Date EXP;
    private Date MFG;
    private String description;
    private SupplierDto supplier;
    private CategoryDto category;

    public ProductDto(){}

    public ProductDto(Product product){
        if(product != null){
            this.setId(product.getId());
            this.setName(product.getName());
            this.setImportPrice(product.getImportPrice());
            this.setSalePrice(product.getSalePrice());
            this.setEXP(product.getEXP());
            this.setMFG(product.getMFG());
            this.setDescription(product.getDescription());
            if(product.getSupplier() != null){
                supplier = new SupplierDto(product.getSupplier());
            }
            if(product.getCategory() != null){
                category = new CategoryDto(product.getCategory());
            }
        }
    }
}
