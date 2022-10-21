package com.swp.sbeauty.dto;


import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class UserDto {
    private Long id;
    private String name;
    private String username;
    private String password;
    private Set<RoleDto> roles;

    public UserDto(){}

    public UserDto(User user){
        if(user != null){
            this.setId(user.getId());
            this.setName(user.getName());
            this.setUsername(user.getUsername());
            this.setPassword(user.getPassword());
            if(user.getRoles()!=null){
                this.roles = new HashSet<>();
                for(Role role : user.getRoles()){
                    this.roles.add(new RoleDto(role));
                }
            }
//            if (entity.getPersonCertificate() != null) {
//                this.personCertificate = new HashSet<PersonCertificateDto>();
//                for (PersonCertificate history : entity.getPersonCertificate()) {
//                    this.personCertificate.add(new PersonCertificateDto(history));
//                }
//            }
        }
    }
}

