package com.swp.sbeauty.controller;

import com.itextpdf.layout.Document;
import com.swp.sbeauty.dto.BillDto;
import com.swp.sbeauty.dto.BillResponseDto;
import com.swp.sbeauty.dto.CustomerResponseDto;
import com.swp.sbeauty.dto.ResponseDto;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.BillService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BillController {
    @Autowired
    private BillService billService;
    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/bill")
    public ResponseEntity<?> getAllBill(@RequestHeader("Authorization") String authHeader,
                                        @RequestParam(value = "page", required = false, defaultValue = "1") int page
            , @RequestParam(value = "pageSize", required = false) int pageSize
            , @RequestParam(value = "name", required = false) String name) {
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        if (temp != null) {
            String id = temp.get("id").toString();
            Date expir = temp.getExpiration();
            if (expir.before(new Date())) {
                return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
            } else {
                Long idCheck = Long.parseLong(id);
                if(name == null) {
                    Pageable p = PageRequest.of(page, pageSize);
                    BillResponseDto billResponseDto = billService.getBills(idCheck, page - 1, pageSize);
                    return new ResponseEntity<>(billResponseDto, HttpStatus.OK);
                }else {
                    BillResponseDto billResponseDto = billService.getBillAndSearch(idCheck,name, page - 1, pageSize);
                    return new ResponseEntity<>(billResponseDto, HttpStatus.OK);
                }
            }
        } else {
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/bill/getById")
    public ResponseEntity<BillDto> getBillById(@RequestParam("id") Long id) {
        BillDto result = billService.getBillById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/bill/create")
    public ResponseEntity<?> save(@RequestBody BillDto billDto,
                                  @RequestHeader("Authorization") String authHeader) {
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        if(temp!=null){
            Date expir = temp.getExpiration();
            if (expir.before(new Date())) {
                return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
            } else {
                Boolean result = billService.saveBill(billDto, authHeader);
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
        }else {
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/bill/update")
    public ResponseEntity<?> update(@RequestBody BillDto billDto,
                                    @RequestHeader("Authorization") String authHeader) {
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        if(temp!=null){
            Date expir = temp.getExpiration();
            if (expir.before(new Date())) {
                return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
            } else {
                Boolean result = billService.updateBill(billDto, authHeader);
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/bill/searchBillByCustomer")
    public ResponseEntity<?> searchByCustomer(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page
            , @RequestParam(value = "pageSize", required = false) int pageSize
            , @RequestParam("id") Long id
    ) {
        Pageable p = PageRequest.of(page, pageSize);
        BillResponseDto billResponseDto = billService.getBillsByCustomer(page - 1, pageSize, id);
        return new ResponseEntity<>(billResponseDto, HttpStatus.OK);

    }

    @GetMapping("bill/pdf")
    public void exportToPdf(HttpServletResponse response, @RequestParam("id") Long id) throws IOException {
        response.setContentType("application/pdf");
        String headerKey = "Content-Disposition";
        String idText = id.toString();
        String headerValue = "attachment; filename=invoice_"+idText+".pdf";
        response.setHeader(headerKey, headerValue);
        billService.generator(response, id);
    }

    @GetMapping(value = "bill/export", produces =
            MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> downloadFile(@RequestParam("id") Long id) throws IOException{
        ByteArrayInputStream bis = billService.generatorPDF(id);
        HttpHeaders headers = new HttpHeaders();
        String idText = id.toString();
        headers.add("Content-Disposition", "inline;filename=invoice_"+idText+".pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(bis));
    }

}
