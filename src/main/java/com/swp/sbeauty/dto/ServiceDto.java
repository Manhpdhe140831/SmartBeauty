package com.swp.sbeauty.dto;

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
    private String code;
    private String name;
    private Date discountStart;
    private Date discountEnd;
    private Double discountPercent;
    private double price;
    private String description;
    private long duration;
    private String image;

    private List<ProductDto> product;
    private Long usage;



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDiscountStart() {
        return discountStart;
    }

    public void setDiscountStart(Date discountStart) {
        this.discountStart = discountStart;
    }

    public Date getDiscountEnd() {
        return discountEnd;
    }

    public void setDiscountEnd(Date discountEnd) {
        this.discountEnd = discountEnd;
    }

    public Double getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(Double discountPercent) {
        this.discountPercent = discountPercent;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<ProductDto> getProduct() {
        return product;
    }

    public void setProduct(List<ProductDto> product) {
        this.product = product;
    }

    public Long getUsage() {
        return usage;
    }

    public void setUsage(Long usage) {
        this.usage = usage;
    }

    public ServiceDto(long id, String code, String name, Date discountStart, Date discountEnd, Double discountPercent, double price, String description, long duration, String image, List<ProductDto> product, Long usage) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.discountStart = discountStart;
        this.discountEnd = discountEnd;
        this.discountPercent = discountPercent;
        this.price = price;
        this.description = description;
        this.duration = duration;
        this.image = image;
        this.product = product;
        this.usage = usage;
    }

    public ServiceDto(Service service, Long usage, List<ProductDto> listProduct) {

        if (null != service) {
            this.setId(service.getId());
            this.setCode(service.getCode());
            this.setName(service.getName());
            this.setDiscountStart(service.getDiscountStart());
            this.setDiscountEnd(service.getDiscountEnd());
            this.setPrice(service.getPrice());
            this.setDescription(service.getDescription());
            this.setDuration(service.getDuration());
            this.setImage(service.getImage());

        }
        this.setProduct(listProduct);
        this.setUsage(usage);

    }
}

