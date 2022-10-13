package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
//    @Query
//    Role findByName(String name);
}
