package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Customer;
import com.swp.sbeauty.entity.Slot;
import com.swp.sbeauty.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Boolean existsByname(String name);

    Boolean existsByPhone(String phone);

    Customer getCustomerById(Long id);
    @Query(value = "SELECT b.* FROM customer b where b.is_delete is null",
            countQuery = "SELECT count(*) FROM customer b where b.is_delete is null",nativeQuery = true)
    Page<Customer> getAllCustomer(Pageable pageable);
    @Query(value = "SELECT b.* FROM customer b, customer_branch_mapping c where b.id = c.id_customer and b.name like %?1% and b.is_delete is null",
            countQuery = "SELECT count(*) FROM Customer b, customer_branch_mapping c where b.id = c.id_customer and b.name like %?1% and b.is_delete is null",nativeQuery = true)
    Page<Customer> searchListWithField(String name, Pageable pageable);

    @Query(value = "select c.* from customer c , customer_branch_mapping cbm where c.id = cbm.id_customer  and cbm.id_branch =?1 and c.name like %?2% and b.is_delete is null",nativeQuery = true)
    List<Customer> getCustomerByKeyword(Long idBranch, String keyword);
}
