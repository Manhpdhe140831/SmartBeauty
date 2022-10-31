package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query(value = "SELECT b FROM Product b where  " +
            "b.name like %?2%")
    public Page<Product> searchListWithField(String key, Pageable pageable);

    @Query(value = "SELECT p FROM Product p join Service_Product_mapping spm ON p.id = spm.product_id where spm.service_id =?1")
    public List<Product> getAllProductByServiceId(Long id);

}
