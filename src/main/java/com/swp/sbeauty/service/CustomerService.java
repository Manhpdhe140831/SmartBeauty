package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CustomerDto;
import com.swp.sbeauty.dto.CustomerResponseDto;
import com.swp.sbeauty.dto.SupplierResponseDto;

public interface CustomerService {
    CustomerDto getById(Long id);

    String validateCustomer(String name, String email, String phone);
    Boolean saveCustomer(String name, String phone,String email,String gender,String dateOfBirth, String address);
    Boolean updateCustomer(Long id,String name, String phone,String email,String gender,String dateOfBirth, String address);
    CustomerResponseDto getAllCustomer(int pageNo, int pageSize);
    CustomerResponseDto getCustomerAndSearch(String name, String address, String phone, int pageNo, int pageSize);
}
