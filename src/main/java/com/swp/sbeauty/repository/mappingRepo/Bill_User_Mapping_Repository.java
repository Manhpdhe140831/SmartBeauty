package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Users;
import com.swp.sbeauty.entity.mapping.Bill_User_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface Bill_User_Mapping_Repository extends JpaRepository<Bill_User_Mapping, Long> {
    @Query(value = "select u from Users u join Bill_User_Mapping  bum on bum.user_id = u.id where bum.bill_id =?1")
    Users getStaffByBill(Long id);
}
