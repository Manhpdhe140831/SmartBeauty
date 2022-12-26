package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Course;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.SpaBed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query(value = "SELECT b FROM Product b where  b.name like %?1% and b.isDelete is null")
    Page<Product> searchListWithField(String key, Pageable pageable);

    Product getProductById(Long id);

    Boolean existsByName(String name);

    @Query(value = "select p from Product p where p.isDelete is null")
    Page<Product> getAllProduct(Pageable pageable);
}
