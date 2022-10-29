package com.swp.sbeauty.repository;

import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users,Long> {
    @Query("select new com.swp.sbeauty.dto.UserDto(u) from Users u where u.name = ?1")
    UserDto findByUserName(String username);


    @Query(value = "select * from sbeauty.users as u \n" +
            "inner join sbeauty.user_role as userRole on u.id = userRole.user_id where userRole.role_id = ?1", nativeQuery = true)
    List<Users> findUserByRoleId(Long id);
    @Query(value = "select * from users  , user_role  where users.id = user_role.user_id and user_role.role_id = :roleId ", nativeQuery = true)
    Page<Users> getUserByRoleId(@Param("roleId") int roleId, Pageable pageable);

    Optional<Users> findByEmail(String email);

    Boolean existsByEmail(String email);
    Boolean existsByMobile(String mobile);
//select * from users join user_role on users.id = user_role.user_id  where user_role.role_id = 2 or user_role.role_id =3
    //select * from users  , user_role  where users.id = user_role.user_id and user_role.role_id = 2 or user_role.role_id =3
    @Query(value = "select * from users join user_role on users.id = user_role.user_id  where user_role.role_id = 2 or user_role.role_id =3", nativeQuery = true)

    Page<Users> getAllUserByAdmin( Pageable pageable);

    @Query(value = "select users.* from users join branch_user on users.id = branch_user.user_id join user_role on  users.id = user_role.user_id\n" +
            "    where  user_role.role_id =3", nativeQuery = true)
    Page<Users>getAllUserByManager(Pageable pageable);

    @Query(value = "select users.id from users where users.email = '?1'", nativeQuery = true)
    Integer getIdUserByEmail(String email);
}
