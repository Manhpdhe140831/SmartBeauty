package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.CustomerDto;
import com.swp.sbeauty.entity.Customer;
import com.swp.sbeauty.repository.CustomerRepository;
import com.swp.sbeauty.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@Transactional
@Slf4j
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Override
    public CustomerDto getById(Long id) {
        if (id != null) {
            Customer entity = customerRepository.findById(id).orElse(null);
            if (entity != null) {
                return new CustomerDto(entity);
            }
        }
        return null;
    }

    @Override
    public String validateCustomer(String name, String email, String phone) {
        String result = "";
        if(customerRepository.existsByname(name)){
            result += "Name already exists in data, ";
        }
        if(customerRepository.existsByPhone(phone)){
            result += "Phone already exists in data, ";
        }
        if(customerRepository.existsByEmail(email)){
            result += "Email already exists in data, ";
        }
        return result;
    }

    @Override
    public Boolean saveCustomer(String name, String phone, String email, String gender, String dateOfBirth, String address) {
        try {

            Customer customer = new Customer();
            customer.setName(name);
            customer.setPhone(phone);
            customer.setEmail(email);
            customer.setGender(gender);
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            Date dob = df.parse(dateOfBirth);
            customer.setDateOfBirth(dob);
            customer.setAddress(address);
            customerRepository.save(customer);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
