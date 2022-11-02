package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.mapping.Bed_Branch_Mapping;
import com.swp.sbeauty.entity.mapping.Product_Supplier_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface Product_Supplier_Repository extends JpaRepository<Product_Supplier_Mapping,Long> {
    @Query(value = "select a.id_supplier from product_supplier_mapping as a where a.id_product = ?1",nativeQuery = true)
    public Long getSupplierId(Long id);

    @Query(value = "select * from product_supplier_mapping as a where a.id_product = ?1", nativeQuery = true)
    Product_Supplier_Mapping getProductBySupplier(Long id);
}
