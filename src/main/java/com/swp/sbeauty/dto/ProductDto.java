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
    private String name;
    private double price;
    private String description;
    private String image;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date discountStart;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date discountEnd;
    private double discountPercent;
    private long supplier;
    private String unit;
    private int dose;




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

    public ProductDto(Long id, String name, Double price, String description, String image, Date discountStart, Date discountEnd, double discountPercent, String unit, int dose, long supplier) {
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
}

