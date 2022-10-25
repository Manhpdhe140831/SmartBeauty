package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class ProductDto {
    private Long id;
    private String productCode;
    private String productName;
    private Double productPrice;
    private Date productBeginDiscount;
    private Date productEndDiscount;
    private double discountPercent;
    private String productImage;
    private int quantity;
    private String unit;
    private String description;
    private SupplierDto supplier;
    private CategoryDto category;
    private Set<BranchDto> branch;
    public ProductDto(){}

    public ProductDto(Product product){
        if(product != null){
            this.setId(product.getId());
            this.setProductCode(product.getProductCode());
            this.setProductName(product.getProductName());
            this.setProductPrice(product.getProductPrice());
            this.setProductBeginDiscount(product.getProductBeginDiscount());
            this.setProductEndDiscount(product.getProductEndDiscount());
            this.setProductImage(product.getProductImage());
            this.setQuantity(product.getQuantity());
            this.setUnit(product.getUnit());
            this.setDescription(product.getDescription());
            if(product.getSupplier() != null){
                supplier = new SupplierDto(product.getSupplier());
            }
            if(product.getCategory() != null){
                category = new CategoryDto(product.getCategory());
            }
            if(product.getBranches()!=null){
                this.branch = new HashSet<>();
                for(Branch branch1 : product.getBranches()){
                    this.branch.add(new BranchDto(branch1));
                }
            }
        }
    }
}
