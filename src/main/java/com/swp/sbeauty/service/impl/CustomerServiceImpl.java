package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.CustomerDto;
import com.swp.sbeauty.dto.CustomerResponseDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.dto.SupplierResponseDto;
import com.swp.sbeauty.entity.Customer;
import com.swp.sbeauty.entity.Slot;
import com.swp.sbeauty.entity.Supplier;
import com.swp.sbeauty.entity.mapping.Customer_Branch_Mapping;
import com.swp.sbeauty.repository.CustomerRepository;
import com.swp.sbeauty.repository.mappingRepo.Customer_Branch_Mapping_Repo;
import com.swp.sbeauty.repository.mappingRepo.Service_Branch_Mapping_Repo;
import com.swp.sbeauty.repository.mappingRepo.User_Branch_Mapping_Repo;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.CustomerService;
import io.jsonwebtoken.Claims;
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

    @Autowired
    User_Branch_Mapping_Repo user_branch_mapping_repo;

    @Autowired
    JwtUtils jwtUtils;

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
    public String validateCustomer(String phone) {
        String result = "";
        if (customerRepository.existsByPhone(phone)) {
            result += "Phone already exists in data, ";
        }
        return result;
    }

    @Override
    public Boolean saveCustomer(CustomerDto customerDto, String authHeader) {
        try {

            Customer customer = new Customer();

                if (customerDto.getName() != null) {
                    customer.setName(customerDto.getName() );
                }
                if (customerDto.getPhone() != null) {
                    customer.setPhone(customerDto.getPhone());
                }
            customer.setEmail(customerDto.getEmail());
            customer.setGender(customerDto.getGender());
            customer.setDateOfBirth(customerDto.getDateOfBirth());
            customer.setAddress(customerDto.getAddress());
            customer = customerRepository.save(customer);
            Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
            Long idStaff = Long.parseLong(temp.get("id").toString());
            Long idBranch =  user_branch_mapping_repo.idBranch(idStaff);
            customer_branch_mapping_repo.save(new Customer_Branch_Mapping(customer.getId(), idBranch));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean updateCustomer(CustomerDto customerDto) {
        try {

            Customer customer = customerRepository.getCustomerById(customerDto.getId());
            if (customer != null) {
                if (customerDto.getName() != null) {
                    customer.setName(customerDto.getName() );
                }
                if (customerDto.getPhone() != null) {
                    customer.setPhone(customerDto.getPhone());
                }
                if (customerDto.getEmail() != null) {
                    customer.setEmail(customerDto.getEmail());
                }
                if (customerDto.getGender() != null) {
                    customer.setGender(customerDto.getGender());
                }
                if (customerDto.getDateOfBirth() != null) {
                    customer.setDateOfBirth(customerDto.getDateOfBirth());
                }
                if (customerDto.getAddress() != null) {
                    customer.setAddress(customerDto.getAddress());
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
    public CustomerResponseDto getAllCustomer(int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        CustomerResponseDto customerResponseDto = new CustomerResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        //Long idBranch = customer_branch_mapping_repo.idBranch(idCheck);
        //Page<Customer> page = customerRepository.getAllCustomer(idBranch, pageable);
        Page<Customer> page = customerRepository.getAllCustomer(pageable);
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
    public CustomerResponseDto getCustomerAndSearch( String name, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        //Long idBranch = customer_branch_mapping_repo.idBranch(idCheck);
        Page<Customer> page = customerRepository.searchListWithField(name, pageable);
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
