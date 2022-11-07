package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Long> {
}
