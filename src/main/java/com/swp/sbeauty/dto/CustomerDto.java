package com.swp.sbeauty.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.swp.sbeauty.entity.Customer;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import java.util.Date;
@Getter
@Setter
public class CustomerDto {
    private Long id;
    private String name;
    private String phone;
    @Email
    private String email;
    private String gender;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dateOfBirth;
    private String address;

    public CustomerDto() {
    }

    public CustomerDto(String name, String phone, String email, String gender, Date dateOfBirth, String address) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
    }

    public CustomerDto(Long id, String name, String phone, String email, String gender, Date dateOfBirth, String address) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
    }
    public CustomerDto(Customer customer){
        if(customer != null){
            this.setId(customer.getId());
            this.setName(customer.getName());
            this.setPhone(customer.getPhone());
            this.setEmail(customer.getEmail());
            this.setGender(customer.getGender());
            this.setDateOfBirth(customer.getDateOfBirth());
            this.setAddress(customer.getAddress());
        }
    }

}
