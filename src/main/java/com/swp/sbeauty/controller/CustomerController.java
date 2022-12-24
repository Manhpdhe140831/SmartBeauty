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

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/customer/getById")
    public ResponseEntity<CustomerDto> getCustomerById(@RequestParam(value = "id", required = false) Long id) {
        CustomerDto result = customerService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/customer/create")
    public ResponseEntity<?> saveCustomer(@RequestHeader("Authorization") String authHeader,
                                          @RequestBody CustomerDto customerDto) {
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        if (temp != null) {
            String check = customerService.validateCustomer(customerDto.getPhone());
            if (check == "") {
                Boolean result = customerService.saveCustomer(customerDto, authHeader);
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping(value = "/customer/update")
    public ResponseEntity<?> updateCustomer(
            @RequestBody CustomerDto customerDto) {
        String check = customerService.validateCustomer(customerDto.getPhone());
        if (check == "") {
            Boolean result = customerService.updateCustomer(customerDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/customer")
    private ResponseEntity<?> getCustomerPagination(@RequestHeader("Authorization") String authHeader,
                                                    @RequestParam(value = "page", required = false, defaultValue = "1") int page
            , @RequestParam(value = "pageSize", required = false) int pageSize
            , @RequestParam(value = "name", required = false) String name
    ) {

        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        if (temp != null) {
            String id = temp.get("id").toString();
            Date expir = temp.getExpiration();
            if (expir.before(new Date())) {
                return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
            } else {
                Long idCheck = Long.parseLong(id);
                if (name == null) {
                    CustomerResponseDto customerResponseDto = customerService.getAllCustomer(page - 1, pageSize);
                    return new ResponseEntity<>(customerResponseDto, HttpStatus.OK);
                } else {
                    CustomerResponseDto customerResponseDto = customerService.getCustomerAndSearch( name, page - 1, pageSize);
                    return new ResponseEntity<>(customerResponseDto, HttpStatus.OK);
                }
            }
        } else {
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/customer/search")
    private ResponseEntity<?> getAlCustomer(@RequestHeader("Authorization") String authHeader,
                                            @RequestParam(value = "keyword") String keyword) {

        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        if (temp != null) {
            String id = temp.get("id").toString();
            Date expir = temp.getExpiration();
            if (expir.before(new Date())) {
                return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
            } else {
                Long idCheck = Long.parseLong(id);
                List<CustomerDto> list = customerService.getCustomerByKeyword(idCheck, keyword);
                return new ResponseEntity<>(list, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/customer/delete")
    private ResponseEntity<?> deleteCustomer(@RequestParam("id") Long id){
        Boolean result = customerService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
