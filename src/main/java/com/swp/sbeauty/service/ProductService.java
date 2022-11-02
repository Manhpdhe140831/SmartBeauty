package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Supplier;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;

public interface ProductService {
    List<ProductDto> getProducts();

    ProductDto getProductById(Long id);


    ProductResponseDto getProductAndSearchByName(String name, int pageNo, int pageSize);
    ProductResponseDto getAllProduct(int pageNo,int pageSize);
    String validateProduct(String name);
    Boolean saveProduct(String name, Double price, String description, String image, Date discountStart, Date discountEnd, Double discountPercent , Long supplier, String unit, Integer dose);
    Boolean updateProduct(Long id,String name, Double price, String description, String image, String discountStart, String discountEnd, Double discountPercent , Long supplier, String unit, Integer dose);
    Date parseDate(String strDate);
}
