package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.SpaBed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SpaBedRepository extends JpaRepository<SpaBed,Long> {
    @Query(value = "SELECT b FROM SpaBed b where  " +
            "b.name like %?1%")
    public Page<SpaBed> searchListWithField(String key, Pageable pageable);

    Boolean existsByName(String name);
}
