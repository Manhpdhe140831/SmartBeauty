package com.swp.sbeauty.repository.mappingRepo;

import com.swp.sbeauty.entity.User_Branch_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface User_Branch_Mapping_Repo extends JpaRepository<User_Branch_Mapping, Long> {
    @Query(value = "select * from user_branch_mapping as a where a.id_user = ?1", nativeQuery = true)
    User_Branch_Mapping getByManager(Long id);
    @Query(value = "select a.id_branch from user_branch_mapping as a where a.id_user = ?1", nativeQuery = true)
    Long idBranch(Long idStaff);
}
