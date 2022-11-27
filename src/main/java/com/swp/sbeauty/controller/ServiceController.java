package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.dto.mappingDto.Service_Product_MappingDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.repository.mappingRepo.Bill_Service_History_Repository;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.CourseService;
import com.swp.sbeauty.service.ServiceSpaService;
//import org.graalvm.compiler.replacements.nodes.UnaryMathIntrinsicNode;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ServiceController {
    @Autowired
    private ServiceSpaService service;
    @Autowired
    CourseService courseService;

    @Autowired
    JwtUtils jwtUtils;
    @GetMapping(value = "/service")
    private ResponseEntity<?> getServiceWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false) String name
            ){
        ServiceResponseDto serviceResponseDto = null;
        if (name==null){
            serviceResponseDto = service.getAll(page -1, pageSize);
            return new ResponseEntity<>(serviceResponseDto,HttpStatus.OK);
        }else {
            serviceResponseDto = service.getListServicePaginationAndSearch(name, page-1, pageSize);
            return new ResponseEntity<>(serviceResponseDto, HttpStatus.OK);
        }
    }

    @GetMapping(value = "/service/getById")
    public ResponseEntity<ServiceDto> getServiceById(@RequestParam("id") Long id
    ){
        ServiceDto serviceDto = service.getServiceById(id);
        return new ResponseEntity<>(serviceDto, HttpStatus.OK);
    }

    @PostMapping(value = "/service/create", headers="Content-Type=multipart/form-data")
    public ResponseEntity<?> saveService(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "discountStart", required = false) String discountStart,
            @RequestParam(value = "discountEnd", required = false) String discountEnd,
            @RequestParam(value = "discountPercent", required = false) Double discountPercent,
            @RequestParam(value = "price") Double price,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "duration") Long duration,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "products", required = false) String products
            ) {
        String check = service.validateService(name, discountStart, discountEnd, discountPercent);
        if(check == ""){
            Boolean result = service.save(name, discountStart, discountEnd, discountPercent, price, description, duration, image, products);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/service/update", headers="Content-Type=multipart/form-data")
    public ResponseEntity<?> updateService(@RequestParam(value = "id") Long id,
                                           @RequestParam(value = "name", required = false) String name,
                                           @RequestParam(value = "discountStart", required = false) String discountStart,
                                           @RequestParam(value = "discountEnd", required = false) String discountEnd,
                                           @RequestParam(value = "discountPercent", required = false) Double discountPercent,
                                           @RequestParam(value = "price", required = false) Double price,
                                           @RequestParam(value = "description", required = false) String description,
                                           @RequestParam(value = "duration", required = false) Long duration,
                                           @RequestParam(value = "image", required = false) MultipartFile image,
                                           @RequestParam(value = "products", required = false) String products) {
        String check = service.validateService(name, discountStart, discountEnd, discountPercent);
        if(check == ""){
            Boolean result = service.update(id, name, discountStart, discountEnd, discountPercent, price, description, duration, image, products);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/service/findServiceCourse")
    private ResponseEntity<?> getAllServiceCourse(  @RequestParam(value = "idCustomer") Long idCustomer,
                                                    @RequestParam(value = "keyword") String keyword){
            ServiceCourseBuyedDto list = service.findProductCourseService(keyword,idCustomer);
            return new ResponseEntity<>(list, HttpStatus.OK);

    }
}
