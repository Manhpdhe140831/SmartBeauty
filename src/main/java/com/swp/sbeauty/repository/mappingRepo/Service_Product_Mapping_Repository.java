package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Service_Product_mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Service_Product_Mapping_Repository extends JpaRepository<Service_Product_mapping, Long> {

    @Query(value = "SELECT spm.productUsage FROM Service_Product_mapping spm WHERE spm.product_id = ?1")
    public Long getUsageByProductId(Long id);

    @Query(value = "select a from service_product_mapping as a where a.service_id = ?1", nativeQuery = true)
    List<Service_Product_mapping> listProducts(Long idService);
}
