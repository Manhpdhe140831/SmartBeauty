package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Service_Product_mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Service_Product_Mapping_Repository extends JpaRepository<Service_Product_mapping, Long> {

    @Query(value = "SELECT spm.productUsage FROM Service_Product_mapping spm WHERE spm.product_id = ?1")
    public Long getUsageByProductId(Long id);

    @Query(value = "select a from Service_Product_mapping  a where a.service_id = ?1")
    List<Service_Product_mapping> listProducts(Long idService);

    @Query(value = "SELECT spm.productUsage from Service_Product_mapping  spm where spm.service_id = ?1 and spm.product_id =?1")
    public Long getUsage(Long serviceId, Long productId);



    @Query(value = "Select spm.productUsage from Service_Product_mapping spm where spm.service_id =?1 and spm.product_id =?2")
    public Long getUsageByServiceProduct(Long serviceId, Long productId);

    @Query(value = "select p from Product  p join Service_Product_mapping spm on p.id = spm.product_id where spm.service_id =?1")
    public List<Product> getProductByService(Long id);
}
