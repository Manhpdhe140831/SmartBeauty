package com.swp.sbeauty.dto;

import com.swp.sbeauty.dto.mappingDto.Service_Product_MappingDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Service;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
public class ServiceDto {
    private long id;
    private String name;
    private Date discountStart;
    private Date discountEnd;
    private Double discountPercent;
    private double price;
    private String description;
    private long duration;
    private String image;

    private List<Service_Product_MappingDto> products;


    public ServiceDto(long id, String code, String name, Date discountStart, Date discountEnd, Double discountPercent, double price, String description, long duration, String image, List<Service_Product_MappingDto> products) {
        this.id = id;
        this.name = name;
        this.discountStart = discountStart;
        this.discountEnd = discountEnd;
        this.discountPercent = discountPercent;
        this.price = price;
        this.description = description;
        this.duration = duration;
        this.image = image;
        this.products = products;
    }

    public ServiceDto(Service service,List<Service_Product_MappingDto> products) {

        if (null != service) {
            this.setId(service.getId());
            this.setName(service.getName());
            this.setDiscountStart(service.getDiscountStart());
            this.setDiscountEnd(service.getDiscountEnd());
            this.setPrice(service.getPrice());
            this.setDescription(service.getDescription());
            this.setDuration(service.getDuration());
            this.setImage(service.getImage());

        }
        this.setProducts(products);

    }
}

