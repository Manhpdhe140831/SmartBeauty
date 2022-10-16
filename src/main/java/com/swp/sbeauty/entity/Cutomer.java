package com.swp.sbeauty.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cutomer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String firstName;
    private String lastName;
    private int gender;
    private String phone;
    private String Email;
    private String country;
    private String City;
    private String District;
    private String street;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saleStaff_id")
    private User user;
}
