package com.swp.sbeauty.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Product;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class ProductDto {
    private Long id;
    @NotEmpty
    @Size(min = 5, message = "product code should have at least 5 characters")
    private String productCode;
    @NotEmpty
    @Size(min = 3, message = "product name should have at least 3 characters")
    private String productName;
    private Double productPrice;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date productBeginDiscount;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date productEndDiscount;
    private double discountPercent;
    private String productImage;
    private int quantity;
    @NotEmpty
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

//        if(product != null){
//            this.setId(product.getId());
//            this.setName(product.getName());
//            this.setImportPrice(product.getImportPrice());
//            this.setSalePrice(product.getSalePrice());
//            this.setEXP(product.getEXP());
//            this.setMFG(product.getMFG());
//            this.setDescription(product.getDescription());
//            if(product.getSupplier() != null){
//                supplier = new SupplierDto(product.getSupplier());
//            }
//            if(product.getCategory() != null){
//                category = new CategoryDto(product.getCategory());
//            }
//        }

    }

}

