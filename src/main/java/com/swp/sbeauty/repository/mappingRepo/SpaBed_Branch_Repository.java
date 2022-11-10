package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.dto.SpaBedDto;
import com.swp.sbeauty.entity.User_Branch_Mapping;
import com.swp.sbeauty.entity.mapping.Bed_Branch_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SpaBed_Branch_Repository extends JpaRepository<Bed_Branch_Mapping,Long> {
    @Query(value = "select a.id_branch from bed_branch_mapping as a where a.id_spa_bed = ?1",nativeQuery = true)
    public Long getBranchId(Long id);

    @Query(value = "select * from bed_branch_mapping as a where a.id_spa_bed = ?1", nativeQuery = true)
    Bed_Branch_Mapping getSpaBedByBranch(Long id);

    @Query(value = "select a.id_branch from user_branch_mapping as a where a.id_user = ?1", nativeQuery = true)
    Long idBranch(Long idStaff);
}
