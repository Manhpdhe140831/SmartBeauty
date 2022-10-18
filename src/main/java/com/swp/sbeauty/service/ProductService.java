package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.UserDto;

import java.util.List;

public interface ProductService {
    List<ProductDto> getProducts();


    ProductDto saveProduct(ProductDto productDto);

    ProductDto updateProduct(ProductDto productDto, Long id);
}
