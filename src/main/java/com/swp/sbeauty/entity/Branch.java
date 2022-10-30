package com.swp.sbeauty.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String phone;
    private String address;
    private String image;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(  name = "branch_user",
            joinColumns = @JoinColumn(name = "branch_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<Users> users = new HashSet<>();




}
