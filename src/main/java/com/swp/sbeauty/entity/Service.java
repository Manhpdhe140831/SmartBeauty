package com.swp.sbeauty.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String codeService;
    private String nameService;
    private Date startDiscount;
    private Date endDiscount;
    private Double discountPercent;
    private double priceService;
    private String description;
    private long minutesNumber;
    private String imageService;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "service_branch",
            joinColumns = @JoinColumn(name = "service_id"),
            inverseJoinColumns = @JoinColumn(name = "branch_id"))
    private Set<Branch> branch = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "service_product",
            joinColumns = @JoinColumn(name = "service_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<Product> product = new HashSet<>();



}
