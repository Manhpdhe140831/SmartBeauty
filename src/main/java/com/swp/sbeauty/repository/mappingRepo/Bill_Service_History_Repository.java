package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Bill_Service_History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Bill_Service_History_Repository extends JpaRepository<Bill_Service_History, Long> {
    Bill_Service_History getBill_Service_HistoryById(Long id);
}
