package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.CustomerService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/customer/getById")
    public ResponseEntity<CustomerDto> getCustomerById(@RequestParam(value = "id",required = false) Long id) {
        CustomerDto result = customerService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/customer/create", headers="Content-Type=multipart/form-data")
    public ResponseEntity<?> saveCustomer(@RequestParam(value = "name") String name,
                                          @RequestParam(value = "phone") String phone,
                                          @RequestParam(value = "email") String email,
                                          @RequestParam(value = "gender") String gender,
                                          @RequestParam(value = "dateOfBirth") String dateOfBith,
                                          @RequestParam(value = "address") String address){
        String check = customerService.validateCustomer(name, email, phone);
        if(check == ""){
            Boolean result = customerService.saveCustomer(name, phone, email, gender, dateOfBith,address);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping(value = "/customer/update", headers="Content-Type=multipart/form-data")
    public ResponseEntity<?> updateSupplier(@RequestParam(value = "id") Long id,
                                            @RequestParam(value = "name", required = false) String name,
                                            @RequestParam(value = "phone",required = false) String phone,
                                            @RequestParam(value = "email",required = false) String email,
                                            @RequestParam(value = "gender",required = false) String gender,
                                            @RequestParam(value = "dateOfBirth",required = false) String dateOfBith,
                                            @RequestParam(value = "address",required = false) String address) {
        String check = customerService.validateCustomer(name, email, phone);
        if (check == "") {
            Boolean result = customerService.updateCustomer(id,name, phone, email, gender, dateOfBith, address);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/customer")
    private ResponseEntity<?> getCustomerPagination(@RequestHeader("Authorization") String authHeader,
                                                    @RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false) String name
            , @RequestParam(value = "phone", required = false) String phone
    ){
        if(authHeader != null) {
            Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
            String id = temp.get("id").toString();
            Long idCheck = Long.parseLong(id);
            Pageable p = PageRequest.of(page, pageSize);
            if ( name == null && phone == null) {
                CustomerResponseDto customerResponseDto = customerService.getAllCustomer(idCheck,page - 1, pageSize);
                return new ResponseEntity<>(customerResponseDto, HttpStatus.OK);

            } else {
                CustomerResponseDto customerResponseDto = customerService.getCustomerAndSearch(idCheck,name,phone,page - 1, pageSize);
                return new ResponseEntity<>(customerResponseDto, HttpStatus.OK);
            }
        }else {
            return new ResponseEntity<>(new ResponseDto<>(404, "Not logged in"), HttpStatus.BAD_REQUEST);
        }

    }



}
