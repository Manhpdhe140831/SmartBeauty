package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Customer;
import com.swp.sbeauty.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Boolean existsByname(String name);
    Boolean existsByEmail(String email);
    Boolean existsByPhone(String phone);

    Customer getCustomerById(Long id);

    @Query(value = "SELECT b FROM Customer b where  " +
            "b.name like %?1% and b.address like %?2% and b.phone like %?3%")
    public Page<Customer> searchListWithField(String key, String key2, String key3, Pageable pageable);
}
