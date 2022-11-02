package com.swp.sbeauty.entity.mapping;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Product_Supplier_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long id_product;
    private long id_supplier;

    public Product_Supplier_Mapping() {
    }

    public Product_Supplier_Mapping(long id_product, long id_supplier) {
        this.id_product = id_product;
        this.id_supplier = id_supplier;
    }
}
