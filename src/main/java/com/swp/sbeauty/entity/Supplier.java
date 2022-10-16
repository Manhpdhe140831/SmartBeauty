package com.swp.sbeauty.entity;

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
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String phone;
    private String email;
    private String certificateImageURL;
    @Column(name = "certificateImage", columnDefinition = "BLOB")
    private byte[] certificateImageFile;
    private String country;
    private String city;
    private String district;
    private String street;

}
