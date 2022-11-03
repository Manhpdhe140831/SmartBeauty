package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.CustomerDto;
import com.swp.sbeauty.dto.ResponseDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/customer/getById")
    public ResponseEntity<CustomerDto> getCustomerById(@RequestParam(value = "id",required = false) Long id) {
        CustomerDto result = customerService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/customer/create", headers="Content-Type=multipart/form-data")
    public ResponseEntity<?> saveSupplier(@RequestParam(value = "name") String name,
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

}
