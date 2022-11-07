package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.BillDto;
import com.swp.sbeauty.dto.BillResponseDto;
import com.swp.sbeauty.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BillController {
    @Autowired
    private BillService billService;

    @GetMapping("/bill")
    public ResponseEntity<?> getAllBill(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize){
        Pageable p = PageRequest.of(page, pageSize);
        BillResponseDto billResponseDto = billService.getBills(page - 1, pageSize);
        return new ResponseEntity<>(billResponseDto, HttpStatus.OK);
    }

    @GetMapping("/bill/getbyid")
    public ResponseEntity<BillDto> getBillById(@RequestParam("id") Long id){
        BillDto result = billService.getBillById(id);
        return new ResponseEntity<>(result, (result != null)?HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/bill/create")
    public ResponseEntity<?> save(@RequestBody BillDto billDto){
        Boolean result = billService.saveBill(billDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
