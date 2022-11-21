package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.CustomerDto;
import com.swp.sbeauty.dto.CustomerResponseDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.dto.SupplierResponseDto;
import com.swp.sbeauty.entity.Customer;
import com.swp.sbeauty.entity.Slot;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.repository.CustomerRepository;
import com.swp.sbeauty.repository.mappingRepo.Customer_Branch_Mapping_Repo;
import com.swp.sbeauty.repository.mappingRepo.Service_Branch_Mapping_Repo;
import com.swp.sbeauty.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private Customer_Branch_Mapping_Repo customer_branch_mapping_repo;
    @Autowired
    Service_Branch_Mapping_Repo service_branch_mapping_repo;

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
        if (customerRepository.existsByname(name)) {
            result += "Name already exists in data, ";
        }
        if (customerRepository.existsByPhone(phone)) {
            result += "Phone already exists in data, ";
        }
        if (customerRepository.existsByEmail(email)) {
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
            //DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            //Date dob = df.parse(dateOfBirth);
            customer.setDateOfBirth(dateOfBirth);
            customer.setAddress(address);
            customerRepository.save(customer);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean updateCustomer(Long id, String name, String phone, String email, String gender, String dateOfBirth, String address) {
        try {

            Customer customer = customerRepository.getCustomerById(id);
            if (customer != null) {
                if (name != null) {
                    customer.setName(name);
                }
                if (phone != null) {
                    customer.setPhone(phone);
                }
                if (email != null) {
                    customer.setEmail(email);
                }
                if (gender != null) {
                    customer.setGender(gender);
                }
                if (dateOfBirth != null) {
                    //DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                    //Date dob = df.parse(dateOfBirth);
                    customer.setDateOfBirth(dateOfBirth);
                }
                if (address != null) {
                    customer.setAddress(address);
                }
                customerRepository.save(customer);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    @Override
    public CustomerResponseDto getAllCustomer(Long idCheck, int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        CustomerResponseDto customerResponseDto = new CustomerResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Long idBranch = customer_branch_mapping_repo.idBranch(idCheck);
        Page<Customer> page = customerRepository.getAllCustomer(idBranch, pageable);
        List<Customer> customers = page.getContent();
        List<CustomerDto> customerDtos = new ArrayList<>();
        for (Customer customer : customers) {
            CustomerDto customerDto = new CustomerDto();
            customerDto = mapper.map(customer, CustomerDto.class);
            customerDtos.add(customerDto);
        }
        customerResponseDto.setData(customerDtos);
        customerResponseDto.setTotalElement(page.getTotalElements());
        customerResponseDto.setTotalPage(page.getTotalPages());
        customerResponseDto.setPageIndex(pageNo + 1);
        return customerResponseDto;

    }

    @Override
    public CustomerResponseDto getCustomerAndSearch(Long idCheck, String name, String phone, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Long idBranch = customer_branch_mapping_repo.idBranch(idCheck);
        Page<Customer> page = customerRepository.searchListWithField(idBranch, name, phone, pageable);
        ModelMapper mapper = new ModelMapper();
        CustomerResponseDto customerResponseDto = new CustomerResponseDto();
        List<Customer> customers = page.getContent();
        List<CustomerDto> customerDtos = new ArrayList<>();
        for (Customer customer : customers) {
            CustomerDto customerDto = new CustomerDto();
            customerDto = mapper.map(customer, CustomerDto.class);
            customerDtos.add(customerDto);
        }
        /*List<CustomerDto> dtos = page
                .stream()
                .map(customer -> mapper.map(customer,CustomerDto.class))
                .collect(Collectors.toList());
        List<CustomerDto> pageResult = new ArrayList<>(dtos);*/
        customerResponseDto.setData(customerDtos);
        customerResponseDto.setTotalElement(page.getTotalElements());
        customerResponseDto.setTotalPage(page.getTotalPages());
        customerResponseDto.setPageIndex(pageNo + 1);
        return customerResponseDto;

    }

    @Override
    public List<CustomerDto> getCustomerByKeyword(Long idCheck, String keyword) {
        if (idCheck == null) {
            return null;
        } else {
            Long idBranch = service_branch_mapping_repo.idBranch(idCheck);
            List<Customer> customers = customerRepository.getCustomerByKeyword(idBranch, keyword);
            List<CustomerDto> customerDtos = new ArrayList<>();
            for (Customer customer : customers) {
                customerDtos.add(new CustomerDto(customer));
            }
            return customerDtos;
        }
    }
}
