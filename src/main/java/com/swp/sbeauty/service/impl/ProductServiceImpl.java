package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.ProductDto;
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
    public ProductDto saveProduct(ProductDto productDto) {


        if(productDto != null){
            Product product = new Product();
            product.setProductCode(productDto.getProductCode());
            product.setProductName(productDto.getProductName());
            product.setProductPrice(productDto.getProductPrice());
            product.setProductBeginDiscount(productDto.getProductBeginDiscount());
            product.setProductEndDiscount(productDto.getProductEndDiscount());
            product.setDiscountPercent(productDto.getDiscountPercent());
            product.setProductImage(productDto.getProductImage());
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

        return null;
    }

    @Override
    public ProductDto updateProduct(ProductDto productDto, Long id) {


        if(productDto !=null){
            Product product = null;
            if(id !=null){
                Optional<Product> optional =productRepository.findById(id);
                if(optional.isPresent()){
                    product = optional.get();
                }
            }
            if(product != null){
                product.setProductCode(productDto.getProductCode());
                product.setProductName(productDto.getProductName());
                product.setProductPrice(productDto.getProductPrice());
                product.setProductBeginDiscount(productDto.getProductBeginDiscount());
                product.setProductEndDiscount(productDto.getProductEndDiscount());
                product.setDiscountPercent(productDto.getDiscountPercent());
                product.setProductImage(productDto.getProductImage());
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

        return null;
    }

    @Override
    public Page<Product> findProductsPaginationAndSort(int offset, int pageSize, String field, String direction) {
        Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(field).ascending() : Sort.by(field).descending();
        Page<Product> products =productRepository.findAll(PageRequest.of(offset,pageSize,sort));
        return products;
    }
//    @Autowired
//    private ProductRepository productRepository;
//    @Autowired
//    private SupplierRepository supplierRepository;
//    @Autowired
//    private CategoryRepository categoryRepository;
//    @Override
//    public List<ProductDto> getProducts() {
//        List<Product> list = productRepository.findAll();
//        List<ProductDto> result =new ArrayList<>();
//        for(Product product : list){
//            result.add(new ProductDto(product));
//        }
//        return result;
//    }
//
//    @Override
//    public ProductDto saveProduct(ProductDto productDto) {
//
//        if(productDto != null){
//            Product product = new Product();
//            product.setName(productDto.getName());
//            product.setImportPrice(productDto.getImportPrice());
//            product.setSalePrice(productDto.getSalePrice());
//            product.setEXP((Date) productDto.getEXP());
//            product.setMFG((Date) productDto.getMFG());
//            product.setDescription(product.getDescription());
//            if(productDto.getSupplier()!=null){
//                Supplier supplier = null;
//                Optional<Supplier> optional = supplierRepository.findById(productDto.getSupplier().getId());
//                if (optional.isPresent()) {
//                    supplier = optional.get();
//                }
//                product.setSupplier(supplier);
//            }
//            if(productDto.getCategory()!=null){
//                Category category = null;
//                Optional<Category> optional = categoryRepository.findById(productDto.getCategory().getId());
//                if (optional.isPresent()) {
//                    category = optional.get();
//                }
//                product.setCategory(category);
//            }
//            product = productRepository.save(product);
//            if(product != null){
//                return new ProductDto(product);
//            }
//        }
//        return null;
//    }
//
//    @Override
//    public ProductDto updateProduct(ProductDto productDto, Long id) {
//        if(productDto !=null){
//            Product product = null;
//            if(id !=null){
//                Optional<Product> optional =productRepository.findById(id);
//                if(optional.isPresent()){
//                    product = optional.get();
//                }
//            }
//            if(product != null){
//                product.setName(productDto.getName());
//                product.setImportPrice(productDto.getImportPrice());
//                product.setSalePrice(productDto.getSalePrice());
//                product.setEXP(productDto.getEXP());
//                product.setMFG(productDto.getMFG());
//                product.setDescription(productDto.getDescription());
//                if(productDto.getSupplier()!=null){
//                    Supplier supplier = null;
//                    Optional<Supplier> optional = supplierRepository.findById(productDto.getSupplier().getId());
//                    if (optional.isPresent()) {
//                        supplier = optional.get();
//                    }
//                    product.setSupplier(supplier);
//                }
//                if(productDto.getCategory()!=null){
//                    Category category = null;
//                    Optional<Category> optional = categoryRepository.findById(productDto.getCategory().getId());
//                    if (optional.isPresent()) {
//                        category = optional.get();
//                    }
//                    product.setCategory(category);
//                }
//                product = productRepository.save(product);
//                return new ProductDto(product);
//            } else {
//                return null;
//            }
//        }
//        return null;
//    }
}
