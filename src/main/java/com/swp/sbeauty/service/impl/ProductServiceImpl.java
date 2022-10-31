package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.ProductDto;
import com.swp.sbeauty.dto.SupplierDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.*;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.CategoryRepository;
import com.swp.sbeauty.repository.ProductRepository;
import com.swp.sbeauty.repository.SupplierRepository;
import com.swp.sbeauty.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service @Transactional @Slf4j
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private BranchRepository branchRepository;


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
            if (entity != null) {
                return new ProductDto(entity);
            }
        }
        return null;
    }

    @Override
    public ProductDto saveProduct(ProductDto productDto) {

        try{
            if(productDto != null){
                Product product = new Product();
                product.setName(productDto.getName());
                product.setPrice(productDto.getPrice());
                product.setDiscountStart(productDto.getDiscountStart());
                product.setDiscountEnd(productDto.getDiscountEnd());
                product.setDiscountPercent(productDto.getDiscountPercent());
                product.setImage(productDto.getImage());
                product.setQuantity(productDto.getQuantity());
                product.setUnit(productDto.getUnit());
                product.setDescription(productDto.getDescription());

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
                Set<Branch> branches = new HashSet<>();
                if(productDto.getBranch()!=null && product.getBranches().size()>0){
                    for (BranchDto branchDto : productDto.getBranch()){
                        if(branchDto!=null){
                            Branch branch = null;
                            if(branchDto.getId()!=null){
                                Optional<Branch> optional =branchRepository.findById(branchDto.getId());
                                if(optional.isPresent()){
                                    branch = optional.get();
                                }
                                if(branch!=null){
                                    branches.add(branch);
                                }
                            }
                        }
                    }
                    product.setBranches(branches);
                }
                product = productRepository.save(product);
                if(product != null){
                    return new ProductDto(product);
                }
            }
        }catch (Exception e){
            throw e;
        }
        return null;
    }

    @Override
    public ProductDto updateProduct(ProductDto productDto, Long id) {

    try{
        if(productDto !=null){
            Product product = null;
            if(id !=null){
                Optional<Product> optional =productRepository.findById(id);
                if(optional.isPresent()){
                    product = optional.get();
                }
            }
            if(product != null){
                product.setName(productDto.getName());
                product.setPrice(productDto.getPrice());
                product.setDiscountStart(productDto.getDiscountStart());
                product.setDiscountEnd(productDto.getDiscountEnd());
                product.setDiscountPercent(productDto.getDiscountPercent());
                product.setImage(productDto.getImage());
                product.setQuantity(productDto.getQuantity());
                product.setUnit(productDto.getUnit());
                product.setDescription(productDto.getDescription());

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
                Set<Branch> branches = new HashSet<>();
                if(productDto.getBranch()!=null && product.getBranches().size()>0){
                    for (BranchDto branchDto : productDto.getBranch()){
                        if(branchDto!=null){
                            Branch branch = null;
                            if(branchDto.getId()!=null){
                                Optional<Branch> optional =branchRepository.findById(branchDto.getId());
                                if(optional.isPresent()){
                                    branch = optional.get();
                                }
                                if(branch!=null){
                                    branches.add(branch);
                                }
                            }
                        }
                    }
                    product.setBranches(branches);
                }
                product = productRepository.save(product);
                return new ProductDto(product);
            } else {
                return null;
            }
        }
    }catch (Exception e){
        throw e;
    }


        return null;
    }

    @Override
    public Page<Product> getAllProductPagination(int offset, int pageSize) {
        Page<Product> products =productRepository.findAll(PageRequest.of(offset,pageSize));
        return products;
    }

    @Override
    public Page<Product> findProductPaginationAndSearch(String name,int offset, int pageSize) {
        Page<Product> products =productRepository.searchListWithField(name,PageRequest.of(offset,pageSize));
        return products;
    }


}
