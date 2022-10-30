package com.swp.sbeauty.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Entity
@Data
@NoArgsConstructor@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Users {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="name")
    private String name;
    @Column(name="email")
    private String email;
    @Column(name="phone")
    private String phone;
    @Column(name="dateOfBirth")
    private Date dateOfBirth;
    @Column(name="gender")
    private String gender;
    @Column(name="address")
    private String address;
    @Column(name="password")
    private String password;
    @Column(name="urlImage")
    private String urlImage;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();







    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    Set<Branch> branches = new HashSet<>();

}

