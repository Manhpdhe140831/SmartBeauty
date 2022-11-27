package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.BillDto;
import com.swp.sbeauty.dto.BillResponseDto;
import com.swp.sbeauty.dto.ResponseDto;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.BillService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BillController {
    @Autowired
    private BillService billService;
    @Autowired
    JwtUtils jwtUtils;
    @GetMapping("/bill")
    public ResponseEntity<?> getAllBill(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize){
        BillResponseDto billResponseDto = billService.getBills(page - 1, pageSize);
        return new ResponseEntity<>(billResponseDto, HttpStatus.OK);
    }

    @GetMapping("/bill/getById")
    public ResponseEntity<BillDto> getBillById(@RequestParam("id") Long id){
        BillDto result = billService.getBillById(id);
        return new ResponseEntity<>(result, (result != null)?HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/bill/create")
    public ResponseEntity<?> save(@RequestBody BillDto billDto,
                                  @RequestHeader("Authorization") String authHeader){
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        Date expir = temp.getExpiration();
        if(expir.before(new Date())){
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
        }else {
            Boolean result = billService.saveBill(billDto, authHeader);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @PostMapping("/bill/update")
    public ResponseEntity<?> update(@RequestParam("id") Long id,
            @RequestBody BillDto billDto,
                                  @RequestHeader("Authorization") String authHeader                    ){
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        Date expir = temp.getExpiration();
        if(expir.before(new Date())){
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
        }else {
            Boolean result = billService.updateBill(id, billDto, authHeader);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @GetMapping("/bill/searchbillbycustomer")
    public ResponseEntity<?> searchByCustomer(
            @RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam("id") Long id
    ){
        Pageable p = PageRequest.of(page, pageSize);
        BillResponseDto billResponseDto = billService.getBillsByCustomer(page - 1, pageSize, id);
        return new ResponseEntity<>(billResponseDto, HttpStatus.OK);

    }
}
