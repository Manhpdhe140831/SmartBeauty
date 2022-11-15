package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Service_Product_mapping;
import com.swp.sbeauty.entity.Slot;
import com.swp.sbeauty.entity.mapping.Slot_Branch_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Slot_Branch_Mapping_Repo extends JpaRepository<Slot_Branch_Mapping, Long> {

}
