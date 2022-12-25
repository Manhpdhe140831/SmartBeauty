package com.swp.sbeauty.repository;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.SpaBed;
import com.swp.sbeauty.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SpaBedRepository extends JpaRepository<SpaBed,Long> {
    @Query(value = "SELECT b FROM SpaBed b where  " +
            "b.name like %?1% and b.isDelete is null")
    Page<SpaBed> searchListWithField(String key, Pageable pageable);

    @Query(value = "select a from SpaBed a, Bed_Branch_Mapping b where a.id = b.id_spaBed and b.id_branch = ?1 and a.isDelete is null")
    List<SpaBed> getListByBranch(Long branchId);

    Boolean existsByName(String name);

    SpaBed getSpaBedById(Long id);

    @Query(value = "select b.* from spa_bed b, bed_slot_mapping c, bed_branch_mapping d\n" +
            "            where b.id = c.id_spa_bed and b.id = d.id_spa_bed and d.id_branch = ?1 and c.id_slot = ?3 and c.date = ?2 and b.is_delete is null", nativeQuery = true)
    List<SpaBed> getBedFree(Long id_branch, String date, Long slot);

    @Query(value = "select a.* from spa_bed a, bed_branch_mapping b where a.id = b.id_spa_bed  and b.id_branch =?1 and a.is_delete is null", nativeQuery = true)
    List<SpaBed>getAllBed(Long idBranch);

    @Query(value = "SELECT b from SpaBed b where b.isDelete is null")
    Page<SpaBed> getAllSpaBed(Pageable pageable);
}
