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
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="name")
    private String name;
    @Column(name="email")
    private String email;
    @Column(name="mobile")
    private String mobile;
    @Column(name="dateOfBirth")
    private Date dateOfBirth;
    @Column(name="gender")
    private String gender;
    @Column(name="address")
    private String address;
    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

}