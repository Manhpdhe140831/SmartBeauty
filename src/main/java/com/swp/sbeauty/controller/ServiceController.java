package com.swp.sbeauty.controller;

import com.swp.sbeauty.dto.ServiceDto;
import com.swp.sbeauty.dto.ServiceResponseDto;
import com.swp.sbeauty.dto.mappingDto.Service_Product_MappingDto;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.service.CourseService;
import com.swp.sbeauty.service.ServiceSpaService;
//import org.graalvm.compiler.replacements.nodes.UnaryMathIntrinsicNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ServiceController {
    @Autowired
    private ServiceSpaService service;
    @Autowired
    CourseService courseService;


    @GetMapping(value = "/service/getallservice")

    private ResponseEntity<?> getServiceWithPagination(@RequestParam(value = "page",required = false,defaultValue = "1") int page
            , @RequestParam(value = "pageSize",required = false) int pageSize
            , @RequestParam(value = "name", required = false, defaultValue = "") String name
            ){
        Pageable p = PageRequest.of(page, pageSize);

        if (name==""){
            ServiceResponseDto serviceResponseDto = new ServiceResponseDto();
            serviceResponseDto = service.getAll(page -1, pageSize);
            return new ResponseEntity<>(serviceResponseDto,HttpStatus.OK);
        }else {
            ServiceResponseDto serviceResponseDto = new ServiceResponseDto();
            serviceResponseDto = service.getListServicePaginationAndSearch(name, page-1, pageSize);
            return new ResponseEntity<>(serviceResponseDto, HttpStatus.OK);
        }
    }
    @GetMapping(value = "/service/getservice")
    public ResponseEntity<ServiceDto> getServiceById(@RequestParam("id") Long id
    ){
        ServiceDto serviceDto = service.getServiceById(id);
        return new ResponseEntity<>(serviceDto, HttpStatus.OK);
    }

    @PostMapping(value = "/service/create")
    public ResponseEntity<?> saveService(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "discountStart") String discountStart,
            @RequestParam(value = "discountEnd") String discountEnd,
            @RequestParam(value = "discountPercent") Double discountPercent,
            @RequestParam(value = "price") Double price,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "duration") Long duration,
            @RequestParam(value = "image") String image,
            @RequestParam(value = "listServiceProduct", required = false)List<Service_Product_MappingDto> listServiceProduct
            ) {

        Date dsDate = courseService.parseDate(discountStart);
        Date deDate = courseService.parseDate(discountEnd);
        Boolean check = service.save(name, dsDate, deDate, discountPercent, price, description, duration, image, listServiceProduct);
        return new ResponseEntity<>(check, HttpStatus.OK);

    }





}
