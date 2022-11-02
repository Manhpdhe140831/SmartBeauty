package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.*;
import com.swp.sbeauty.entity.mapping.Product_Supplier_Mapping;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.CategoryRepository;
import com.swp.sbeauty.repository.ProductRepository;
import com.swp.sbeauty.repository.SupplierRepository;
import com.swp.sbeauty.repository.mappingRepo.Product_Supplier_Repository;
import com.swp.sbeauty.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service @Transactional @Slf4j
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private Product_Supplier_Repository product_supplier_repository;


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
    public ProductDto getProductById(Long id) {
        if (id != null) {
            Product entity = productRepository.findById(id).orElse(null);
            Long idSupplier = product_supplier_repository.getSupplierId(id);
            Supplier supplier = supplierRepository.getSupplierById(idSupplier);
            if (entity != null) {
                return new ProductDto(id, entity.getName(), entity.getPrice(), entity.getDescription(), entity.getImage(), entity.getDiscountStart(),entity.getDiscountEnd(),entity.getDiscountPercent(),entity.getUnit(),entity.getDose(),supplier.getId());
            }
        }
        return null;
    }





    @Override
    public ProductResponseDto getProductAndSearchByName(String name, int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        ProductResponseDto productResponseDto = new ProductResponseDto();
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<Product> page = productRepository.searchListWithField(name,pageable);
        List<Product> products = page.getContent();
        /*List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products){
            ProductDto productDto = new ProductDto();
            productDto = mapper.map(product,ProductDto.class);
            productDtos.add(productDto);
        }*/
        List<ProductDto> dtos = page
                .stream()
                .map(product -> mapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
        dtos.stream().forEach(f->
                {
                    Supplier supplier = supplierRepository.getSupplierFromProduct(f.getId());
                    f.setSupplier(supplier.getId());
                }
        );
        List<ProductDto> pageResult = new ArrayList<>(dtos);
        productResponseDto.setData(pageResult);
        productResponseDto.setTotalElement(page.getTotalElements());
        productResponseDto.setTotalPage(page.getTotalPages());
        productResponseDto.setPageIndex(pageNo+1);
        return productResponseDto;
    }

    @Override
    public ProductResponseDto getAllProduct(int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        ProductResponseDto productResponseDto = new ProductResponseDto();
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<Product> page = productRepository.findAll(pageable);
        List<Product> products = page.getContent();
        /*List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products){
            ProductDto productDto = new ProductDto();
            productDto = mapper.map(product,ProductDto.class);
            productDtos.add(productDto);
        }*/
        List<ProductDto> dtos = page
                .stream()
                .map(product -> mapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
        dtos.stream().forEach(f->
                {
                    Supplier supplier = supplierRepository.getSupplierFromProduct(f.getId());
                    f.setSupplier(supplier.getId());
                }
        );
        List<ProductDto> pageResult = new ArrayList<>(dtos);
        productResponseDto.setData(pageResult);
        productResponseDto.setTotalElement(page.getTotalElements());
        productResponseDto.setTotalPage(page.getTotalPages());
        productResponseDto.setPageIndex(pageNo+1);
        return productResponseDto;
    }

    @Override
    public String validateProduct(String name) {
        String result = "";
        if(productRepository.existsByName(name)){
            result += "Name already exists in data, ";
        }
        return result;
    }

    @Override
    public Boolean saveProduct(String name, double price, String description, String image, Date discountStart, Date discountEnd, double discountPercent, Long supplier, String unit, int dose) {
        try {
            Product product = new Product();
            product.setName(name);
            product.setPrice(price);
            product.setDescription(description);
            product.setImage(image);
            product.setDiscountStart(discountStart);
            product.setDiscountEnd(discountEnd);
            product.setDiscountPercent(discountPercent);
            product.setUnit(unit);
            product.setDose(dose);
            product = productRepository.save(product);
            Product_Supplier_Mapping product_supplier_mapping = new Product_Supplier_Mapping(product.getId(), supplier);
            product_supplier_repository.save(product_supplier_mapping);
            return true;
        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public Boolean updateProduct(Long id, String name, double price, String description, String image, Date discountStart, Date discountEnd, double discountPercent, Long supplier, String unit, int dose) {
        try {

            Product product = new Product();
            if (product != null) {
                if (name != null) {
                    product.setName(name);
                }
                if (price != 0) {
                    product.setPrice(price);
                }
                if (description != null) {
                    product.setDescription(description);
                }
                if (image != null) {
                    product.setImage(image);
                }
                if (discountStart != null) {
                    product.setDiscountStart(discountStart);
                }
                if (discountEnd != null) {
                    product.setDiscountEnd(discountEnd);
                }
                if (unit != null) {
                    product.setUnit(unit);
                }
                if (dose != 0) {
                    product.setDose(dose);
                }
                product.setDiscountPercent(discountPercent);
                if (supplier != null) {
                    Product_Supplier_Mapping product_supplier_old = product_supplier_repository.getProductBySupplier(id);
                    product_supplier_repository.delete(product_supplier_old);
                    Product_Supplier_Mapping product_supplier_mapping = new Product_Supplier_Mapping(id, supplier);
                    product_supplier_repository.save(product_supplier_mapping);
                }
                return true;
            } else {
                return false;
            }
        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public Date parseDate(String strDate) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse(strDate);
            return date;

        }catch (Exception e){
            try {
                throw e;
            } catch (ParseException ex) {
                throw new RuntimeException(ex);
            }
        }
    }


}
