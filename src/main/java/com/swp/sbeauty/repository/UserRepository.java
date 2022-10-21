package com.swp.sbeauty.repository;

import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query("select new com.swp.sbeauty.dto.UserDto(u) from User u where u.name = ?1")
    UserDto findByUserName(String username);


    Optional<User> findByUsername(String username);
}
