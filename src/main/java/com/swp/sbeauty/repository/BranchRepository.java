package com.swp.sbeauty.repository;

import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchRepository extends JpaRepository<Branch,Long> {
    /*@Query(value = "select a.* from `recruiter` a" +
            " inner join `user` b on b.user_id=a.recruiter_id" +
            " inner join `account` c on a.recruiter_id=c.id" +
            " where b.fullname like CONCAT('%',:name,'%') or c.email like CONCAT('%',:name,'%') "+
            "Order by b.fullname asc,c.email asc ", nativeQuery = true)
    Page<Recruiter> getRecruiterByName(String name, Pageable pageable);*/
}
