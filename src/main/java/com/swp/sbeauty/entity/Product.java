package com.swp.sbeauty.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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
    private double price;
    private String description;
    private String image;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date discountStart;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date discountEnd;
    private double discountPercent;
    private String unit;
    private int dose;

}


