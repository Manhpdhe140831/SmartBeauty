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
    Boolean existsByname(String name);
    Boolean existsByEmail(String email);
    Boolean existsByPhone(String phone);
    Supplier getSupplierById(Long id);

    @Query(value = "SELECT b FROM Supplier b where  " +
            "b.name like %?1% and b.address like %?2% and b.phone like %?3%")
    public Page<Supplier> searchListWithField(String key,String key2,String key3, Pageable pageable);
}
