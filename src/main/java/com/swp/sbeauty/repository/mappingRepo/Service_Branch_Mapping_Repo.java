package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.Service_Brand_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface Service_Branch_Mapping_Repo extends JpaRepository<Service_Brand_Mapping,Long> {
    @Query(value = "select a.id_branch from user_branch_mapping as a where a.id_user = ?1", nativeQuery = true)
    Long idBranch(Long idStaff);
}
