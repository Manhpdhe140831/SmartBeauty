package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.entity.*;
import com.swp.sbeauty.repository.CategoryRepository;
import com.swp.sbeauty.repository.ProductRepository;
import com.swp.sbeauty.repository.SupplierRepository;
import com.swp.sbeauty.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
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

        if(productDto != null){
            Product product = new Product();
            product.setName(productDto.getName());
            product.setImportPrice(productDto.getImportPrice());
            product.setSalePrice(productDto.getSalePrice());
            product.setEXP((Date) productDto.getEXP());
            product.setMFG((Date) productDto.getMFG());
            product.setDescription(product.getDescription());
            if(productDto.getSupplier()!=null){
                Supplier supplier = null;
                Optional<Supplier> optional = supplierRepository.findById(productDto.getSupplier().getId());
                if (optional.isPresent()) {
                    supplier = optional.get();
                }
                product.setSupplier(supplier);
            }
            if(productDto.getCategory()!=null){
                Category category = null;
                Optional<Category> optional = categoryRepository.findById(productDto.getCategory().getId());
                if (optional.isPresent()) {
                    category = optional.get();
                }
                product.setCategory(category);
            }
            product = productRepository.save(product);
            if(product != null){
                return new ProductDto(product);
            }
        }
        return null;
    }

    @Override
    public ProductDto updateProduct(ProductDto productDto, Long id) {
        return null;
    }
}
