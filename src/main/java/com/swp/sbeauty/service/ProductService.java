package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    List<ProductDto> getProducts();

    ProductDto getProductById(Long id);
    ProductDto saveProduct(ProductDto productDto);

    ProductDto updateProduct(ProductDto productDto, Long id);
    Page<Product> findProductsPaginationAndSort(int offset, int pageSize, String field, String direction);
}
