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
import org.joda.time.Chronology;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.chrono.GregorianChronology;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.joda.time.format.ISODateTimeFormat;
import org.joda.time.tz.UTCProvider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
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

    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

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

                return new ProductDto(id, entity.getName(), entity.getPrice(), entity.getDescription(), entity.getImage(), entity.getDiscountStart(),entity.getDiscountEnd(),entity.getDiscountPercent(),entity.getUnit(),entity.getDose(),new SupplierDto(supplier));







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
        List<ProductDto> dtos = page
                .stream()
                .map(product -> mapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
        dtos.stream().forEach(f->
                {
                    Supplier supplier = supplierRepository.getSupplierFromProduct(f.getId());
                    f.setSupplier(new SupplierDto(supplier));
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
        List<ProductDto> dtos = page
                .stream()
                .map(product -> mapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
        dtos.stream().forEach(f->
                {
                    Date dateStart = new DateTime(f.getDiscountStart()).toDate();
                    Date dateEnd = new DateTime(f.getDiscountEnd()).toDate();
                    f.setDiscountStart(dateEnd);
                    f.setDiscountStart(dateStart);
                    Supplier supplier = supplierRepository.getSupplierFromProduct(f.getId());
                    f.setSupplier(new SupplierDto(supplier));
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
    public String validateProduct(String name, String discountStart, String discountEnd, Double discountPercent) {
        String result = "";
        if(discountStart!=null || discountEnd!=null){
            if(discountPercent == null){
                result += "Discount percent cannot be null. ";
            }
        }
        if(productRepository.existsByName(name)){
            result += "Name already exists in data. ";
        }
        return result;
    }

    @Override
    public Boolean saveProduct(String name, Double price, String description, MultipartFile image, String discountStart, String discountEnd, Double discountPercent, Long supplier, String unit, Integer dose) {
        try {
            Product product = new Product();
            product.setName(name);
            product.setPrice(price);
            if(description!=null){
                product.setDescription(description);
            }

            if(image != null){
                Path staticPath = Paths.get("static");
                Path imagePath = Paths.get("images");
                if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                    Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
                }
                Path file = CURRENT_FOLDER.resolve(staticPath)
                        .resolve(imagePath).resolve(image.getOriginalFilename());
                try (OutputStream os = Files.newOutputStream(file)) {
                    os.write(image.getBytes());
                }
                product.setImage(imagePath.resolve(image.getOriginalFilename()).toString());

            }
            if(discountStart!=null){
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                Date startDate = df.parse(discountStart);
                product.setDiscountStart(startDate);
            }
            if(discountEnd!=null){
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                Date endDate = df.parse(discountEnd);
                product.setDiscountStart(endDate);
            }
            if(discountEnd!=null){
                product.setDiscountPercent(discountPercent);
            }
            product.setUnit(unit);
            product.setDose(dose);
            product = productRepository.save(product);
            Product_Supplier_Mapping product_supplier_mapping = new Product_Supplier_Mapping(product.getId(), supplier);
            product_supplier_repository.save(product_supplier_mapping);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public Boolean updateProduct(Long id, String name, Double price, String description, MultipartFile image, String discountStart, String discountEnd, Double discountPercent, Long supplier, String unit, Integer dose) {
        try {

            Product product = productRepository.getProductById(id);
            if (product != null) {
                if (name != null) {
                    product.setName(name);
                }
                if (price != null) {
                    product.setPrice(price);
                }
                if (description != null) {
                    product.setDescription(description);
                }
                if (image != null) {
                    Path staticPath = Paths.get("static");
                    Path imagePath = Paths.get("images");
                    if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                        Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
                    }
                    Path file = CURRENT_FOLDER.resolve(staticPath)
                            .resolve(imagePath).resolve(image.getOriginalFilename());
                    try (OutputStream os = Files.newOutputStream(file)) {
                        os.write(image.getBytes());
                    }
                    product.setImage(imagePath.resolve(image.getOriginalFilename()).toString());

                }
                if (discountStart != null) {
                    Date startDate = new DateTime(discountStart).toDate();

                    product.setDiscountStart(startDate);
                }
                if (discountEnd != null) {
//                    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
//                    Date endDate = df.parse(discountEnd);
                   Date endDate = new DateTime(discountEnd).toDate();
                    product.setDiscountEnd(endDate);
                }
                if (unit != null) {
                    product.setUnit(unit);
                }
                if (dose != null) {
                    product.setDose(dose);
                }
                if(discountPercent !=null){
                    product.setDiscountPercent(discountPercent);
                }

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
        }catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }


}
