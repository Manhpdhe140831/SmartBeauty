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
public class User_Branch_Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long  id_user;
    private long id_branch;


    public User_Branch_Mapping(){}

    public User_Branch_Mapping(long id_user, long id_branch) {
        this.id_user = id_user;
        this.id_branch = id_branch;
    }
}
