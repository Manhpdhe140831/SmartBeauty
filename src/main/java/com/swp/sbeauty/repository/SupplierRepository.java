package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier,Long> {
    @Query(value = "SELECT b FROM Supplier b where " +
            "concat(b.supplierCode, b.address, b.phone,b.email)" +
            "like %?1%")
    public Page<Supplier> searchListWithField(String key, Pageable pageable);
}
