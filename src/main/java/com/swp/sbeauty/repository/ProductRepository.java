package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
