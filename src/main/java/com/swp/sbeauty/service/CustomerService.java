package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CustomerDto;

public interface CustomerService {
    CustomerDto getById(Long id);

    String validateCustomer(String name, String email, String phone);
    Boolean saveCustomer(String name, String phone,String email,String gender,String dateOfBirth, String address);
}
