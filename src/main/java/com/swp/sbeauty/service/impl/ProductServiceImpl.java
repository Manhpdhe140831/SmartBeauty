package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.User;
import com.swp.sbeauty.repository.CategoryRepository;
import com.swp.sbeauty.repository.ProductRepository;
import com.swp.sbeauty.repository.SupplierRepository;
import com.swp.sbeauty.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service @Transactional @Slf4j
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public List<ProductDto> getProducts() {
        List<Product> list = productRepository.findAll();
        List<ProductDto> result =new ArrayList<>();
        for(Product product : list){
            result.add(new ProductDto(product));
        }
        return result;
    }

    @Override
    public ProductDto saveProduct(ProductDto productDto) {
        return null;
    }

    @Override
    public ProductDto updateProduct(ProductDto productDto, Long id) {
        return null;
    }
}
