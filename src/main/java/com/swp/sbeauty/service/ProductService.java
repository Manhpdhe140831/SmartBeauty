package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface ProductService {
    List<ProductDto> getProducts();

    ProductDto getProductById(Long id);

    ProductResponseDto getProductAndSearchByName(String name, int pageNo, int pageSize);

    ProductResponseDto getAllProduct(int pageNo,int pageSize);

    String updateProduct(Long id,String name, Double price, String description, MultipartFile image  , String discountStart, String discountEnd, Double discountPercent , Long supplier, String unit, Integer dose);

    Boolean saveProduct(String name, Double price, String description, MultipartFile image, String discountStart, String discountEnd, Double discountPercent, Long supplier, String unit, Integer dose);

    String validateProduct(String name, String discountStart, String discountEnd, Double discountPercent);
}
