package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.ServiceGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceGroupRepository extends JpaRepository<ServiceGroup, Long> {
    @Query(value = "SELECT s from ServiceGroup s where s.name like %?1%")
    public List<ServiceGroup> searchByName (String name);

}
