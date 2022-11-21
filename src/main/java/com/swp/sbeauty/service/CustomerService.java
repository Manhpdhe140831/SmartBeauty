package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CustomerDto;
import com.swp.sbeauty.dto.CustomerResponseDto;
import com.swp.sbeauty.dto.SupplierResponseDto;
import com.swp.sbeauty.entity.Customer;
import java.util.List;
public interface CustomerService {
    CustomerDto getById(Long id);

    String validateCustomer(String name, String email, String phone);
    Boolean saveCustomer(String name, String phone,String email,String gender,String dateOfBirth, String address);
    Boolean updateCustomer(Long id,String name, String phone,String email,String gender,String dateOfBirth, String address);
    CustomerResponseDto getAllCustomer(Long idCheck,int pageNo, int pageSize);
    CustomerResponseDto getCustomerAndSearch(Long idCheck,String name, String phone, int pageNo, int pageSize);

    List<CustomerDto> getCustomerByKeyword (Long idCheck, String keyword);
}
