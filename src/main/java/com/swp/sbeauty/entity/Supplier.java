package com.swp.sbeauty.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String supplierCode;
    private String taxCode;
    private String description;
    private String phone;
    private String email;
    private String address;
    private String supplierImage;
}
