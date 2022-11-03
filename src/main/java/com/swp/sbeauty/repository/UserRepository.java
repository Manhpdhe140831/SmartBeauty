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
    Boolean existsByPhone(String phone);

//select * from users join user_role on users.id = user_role.user_id  where user_role.role_id = 2 or user_role.role_id =3
    //select * from users  , user_role  where users.id = user_role.user_id and user_role.role_id = 2 or user_role.role_id =3
    /*@Query(value = "select u.* from users as u join user_role as ur on u.id = ur.user_id where ur.role_id = 2 or ur.role_id = 3 ORDER BY ?#{#pageable}",
            countQuery = "select count(*) from users as u join user_role as ur on u.id = ur.user_id where ur.role_id = 2 or ur.role_id = 3"
            ,nativeQuery = true)
    Page<Users> getAllUserByAdmin( Pageable pageable);*/
    @Query(value = "select u.* from `users` as u , `user_role` as ur where ur.role_id != 1 and u.id = ur.user_id",nativeQuery = true)
    Page<Users> getAllUserByAdmin( Pageable pageable);

    @Query(value = "select  a.* from users a, user_branch_mapping b, user_role c where (a.id = b.id_user and a.id = c.user_id and c.role_id=3 and b.id_branch = ?1) or (a.id = b.id_user and a.id = c.user_id and c.role_id=4 and b.id_branch = ?1) ORDER BY ?#{#pageable}",
            countQuery = "select  count(*) from users a, user_branch_mapping b, user_role c where (a.id = b.id_user and a.id = c.user_id and c.role_id=3 and b.id_branch = ?1) or (a.id = b.id_user and a.id = c.user_id and c.role_id=4 and b.id_branch = ?1)"
            ,nativeQuery = true)
    Page<Users>getAllUserByManager(Integer idCheck ,Pageable pageable);

    @Query(value = "select users.id from users where users.email = '?1'", nativeQuery = true)
    Integer getIdUserByEmail(String email);
//    @Query(value = "select u from User u inner join branch_user  b ON  u.id = b.user_id where u.name = ?1")
//    List<User> getListByBranch(String branchId);
    /*@Query(value = "select * from sbeauty.user as u \n" +
            "inner join sbeauty.branch_user as bu on u.id = bu.user_id where bu.branch_id = ?1", nativeQuery = true)
    List<Users> getListByBranch(Long branchId);*/

    @Query(value = "select a.* from users a, user_branch_mapping b, user_role c where a.id = b.id_user and a.id = c.user_id and c.role_id=3 and b.id_branch = ?1", nativeQuery = true)
    List<Users> getListByBranch(Long branchId);

    @Query(value = "select a.* from users a, user_role c where a.id = c.user_id and c.role_id=2 and not exists \n" +
            "(select 1 from user_branch_mapping b where a.id = b.id_user)", nativeQuery = true)
    List<Users> getAllManager();

    @Query(value = "select a.* from users a, user_branch_mapping b, user_role c where a.id = b.id_user and a.id = c.user_id and c.role_id=2 and b.id_branch = ?1", nativeQuery = true)
    Users getManagerFromBranch(Long id);
}
