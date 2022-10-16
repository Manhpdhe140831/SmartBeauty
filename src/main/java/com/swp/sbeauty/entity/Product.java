package com.swp.sbeauty.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private double importPrice;
    private double salePrice;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date EXP;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date MFG;
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplerID")
    private Supplier supplier;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}
