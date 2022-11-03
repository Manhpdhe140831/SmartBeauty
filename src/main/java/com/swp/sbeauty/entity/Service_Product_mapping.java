package com.swp.sbeauty.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Service_Product_mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long service_id;
    private long product_id;
    private long productUsage;

    public Service_Product_mapping(Long productUsage){
        this.productUsage = productUsage;
    }

    public Service_Product_mapping(Long service_id, Long product_id, Long productUsage){
        this.setService_id(service_id);
        this.setProduct_id(product_id);
        this.setProductUsage(productUsage);
    }

}

