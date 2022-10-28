package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query(value = "SELECT b FROM Product b where " +
            "concat(b.productCode, b.productName)" +
            "like %?1%")
    public Page<Product> searchListWithField(String key, Pageable pageable);
}
