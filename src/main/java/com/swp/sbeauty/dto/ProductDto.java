package com.swp.sbeauty.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.swp.sbeauty.entity.Bill_Product_history;
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
    private String name;
    private Double price;
    private String description;
    private String image;
    private String discountStart;
    private String discountEnd;
    private Double discountPercent;
    private Long supplierId;
    private String unit;
    private Integer dose;
    private SupplierDto supplier;




    public ProductDto(){}

    public ProductDto(Product product){

        if(product != null){
            this.setId(product.getId());
            this.setName(product.getName());
            this.setPrice(product.getPrice());
            this.setDescription(product.getDescription());
            this.setImage(product.getImage());
            this.setDiscountStart(product.getDiscountStart());
            this.setDiscountEnd(product.getDiscountEnd());
            this.setDiscountPercent(product.getDiscountPercent());
            this.setUnit(product.getUnit());
            this.setDose(product.getDose());
        }


    }

    public ProductDto(Long id, String name, Double price, String description, String image, String discountStart, String discountEnd, Double discountPercent, String unit, Integer dose, Long supplierId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.discountStart = discountStart;
        this.discountEnd = discountEnd;
        this.discountPercent = discountPercent;
        this.unit = unit;
        this.dose = dose;
        this.supplierId = supplierId;
    }

    public ProductDto(Long id, String name, Double price, String description, String image, String discountStart, String discountEnd, Double discountPercent, String unit, Integer dose, SupplierDto supplier) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.discountStart = discountStart;
        this.discountEnd = discountEnd;
        this.discountPercent = discountPercent;
        this.unit = unit;
        this.dose = dose;
        this.supplier = supplier;
    }

    public ProductDto(Long id, String name, Double price, String description, String image, String discountStart, String discountEnd, Double discountPercent, String unit, Integer dose) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.discountStart = discountStart;
        this.discountEnd = discountEnd;
        this.discountPercent = discountPercent;
        this.unit = unit;
        this.dose = dose;
    }

    public ProductDto(Bill_Product_history history){
        if(history!=null){
            this.setId(history.getId());
            this.setName(history.getName());
            this.setPrice(history.getPrice());
            this.setDescription(history.getDescription());
            this.setImage(history.getImage());
            this.setDiscountStart(history.getDiscountStart());
            this.setDiscountEnd(history.getDiscountEnd());
            this.setDiscountPercent(history.getDiscountPercent());
            this.setUnit(history.getUnit());
            this.setDose(history.getDose());
        }
    }
}

