package com.swp.sbeauty.repository;

import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query("select new com.swp.sbeauty.dto.UserDto(u) from User u where u.name = ?1")
    UserDto findByUserName(String username);

    @Query(value = "select * from sbeauty.user as u \n" +
            "inner join sbeauty.user_role as userRole on u.id = userRole.user_id where userRole.role_id = ?1", nativeQuery = true)
    List<User> findUserByRoleId(Long id);

    Optional<User> findByEmail(String email);
}
