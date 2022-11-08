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

    Optional<Users> findByEmail(String email);

    Boolean existsByEmail(String email);
    Boolean existsByPhone(String phone);

    @Query(value = "select u.* from `users` as u , `user_role` as ur where ur.role_id != 1 and u.id = ur.user_id",nativeQuery = true)
    Page<Users> getAllUserByAdmin( Pageable pageable);

    @Query(value = "select  a.* from users a, user_branch_mapping b, user_role c where (a.id = b.id_user and a.id = c.user_id and c.role_id=3 and b.id_branch = ?1) or (a.id = b.id_user and a.id = c.user_id and c.role_id=4 and b.id_branch = ?1) ORDER BY ?#{#pageable}",
            countQuery = "select  count(*) from users a, user_branch_mapping b, user_role c where (a.id = b.id_user and a.id = c.user_id and c.role_id=3 and b.id_branch = ?1) or (a.id = b.id_user and a.id = c.user_id and c.role_id=4 and b.id_branch = ?1)"
            ,nativeQuery = true)
    Page<Users>getAllUserByManager(Integer idCheck ,Pageable pageable);

    @Query(value = "select a.* from users a, user_branch_mapping b, user_role c where a.id = b.id_user and a.id = c.user_id and c.role_id=3 and b.id_branch = ?1", nativeQuery = true)
    List<Users> getListByBranch(Long branchId);

    @Query(value = "select a.* from users a, user_role c where a.id = c.user_id and c.role_id=2 and not exists \n" +
            "(select 1 from user_branch_mapping b where a.id = b.id_user)", nativeQuery = true)
    List<Users> getAllManager();

    @Query(value = "select a.* from users a, user_branch_mapping b, user_role c where a.id = b.id_user and a.id = c.user_id and c.role_id=2 and b.id_branch = ?1", nativeQuery = true)
    Users getManagerFromBranch(Long id);

    @Query(value = "select a.* from users a, user_role c, user_branch_mapping b where a.id = c.user_id and c.role_id=4 and a.id = b.id_user and b.id_branch=?1 and not exists \n" +
            "(select 1 from user_slot_mapping d where a.id = d.id_user)", nativeQuery = true)
    List<Users> getStaffFree(Long id_branch);
}
