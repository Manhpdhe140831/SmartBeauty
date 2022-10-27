package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findByName(String name);
}
