package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Customer;
import com.swp.sbeauty.entity.mapping.Bill_Customer_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface Bill_Cusomter_Mapping_Repositry extends JpaRepository<Bill_Customer_Mapping, Long> {

    @Query(value = "select c from Customer c join Bill_Customer_Mapping bcm on bcm.customer_id = c.id where bcm.bill_id =?1")
    public Customer getCustomerByBill(Long id);

    @Query(value = "SELECT bcm from Bill_Customer_Mapping bcm where bcm.bill_id =?1")
    public Bill_Customer_Mapping getByBillId(Long id);


}
