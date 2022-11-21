package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.SpaBed;
import com.swp.sbeauty.entity.Users;
import com.swp.sbeauty.entity.mapping.Bed_Branch_Mapping;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.SpaBedRepository;
import com.swp.sbeauty.repository.UserRepository;
import com.swp.sbeauty.repository.mappingRepo.SpaBed_Branch_Repository;
import com.swp.sbeauty.service.SpaBedService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service @Transactional @Slf4j
public class SpaBedServiceImpl implements SpaBedService {
    @Autowired
    private SpaBedRepository spaBedRepository;
    @Autowired
    private BranchRepository branchRepository;
    @Autowired
    private SpaBed_Branch_Repository spaBed_branch_repository;
    @Autowired
    private UserRepository userRepository;


    @Override
    public List<SpaBedDto> getBeds() {
        List<SpaBed> list = spaBedRepository.findAll();
        List<SpaBedDto> result =new ArrayList<>();
        for(SpaBed spaBed : list){
            result.add(new SpaBedDto(spaBed));
        }
        return result;
    }



    @Override
    public SpaBedDto getById(Long id) {
        if (id != null) {
            SpaBed entity = spaBedRepository.findById(id).orElse(null);
            Long idBranch = spaBed_branch_repository.getBranchId(id);
            Branch branch = branchRepository.getBranchById(idBranch);
            Users users = userRepository.getManagerFromBranch(idBranch);
            if (entity != null) {
                return new SpaBedDto(id, entity.getName()
                        , new BranchDto(branch.getId(),branch.getName()
                        , new UserDto(users),branch.getPhone(),branch.getAddress(),branch.getEmail(),branch.getLogo()));
            }
        }
        return null;
    }





    @Override
    public SpaBedResponseDto getSpaBedAndSearch(String name, int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        SpaBedResponseDto spaBedResponseDto = new SpaBedResponseDto();
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<SpaBed> page = spaBedRepository.searchListWithField(name,pageable);
        List<SpaBed> spaBeds = page.getContent();
        /*List<SpaBedDto> spaBedDtos = new ArrayList<>();
        for (SpaBed spaBed : spaBeds){
            SpaBedDto spaBedDto = new SpaBedDto();
            spaBedDto = mapper.map(spaBed,SpaBedDto.class);
            spaBedDtos.add(spaBedDto);
        }*/
        List<SpaBedDto> dtos = page
                .stream()
                .map(spaBed -> mapper.map(spaBed, SpaBedDto.class))
                .collect(Collectors.toList());
        dtos.stream().forEach(f->
                {
                    Branch branch = branchRepository.getBranchFromSpaBed(f.getId());
                    f.setBranch(new BranchDto(branch));
                }
        );
        List<SpaBedDto> pageResult = new ArrayList<>(dtos);
        spaBedResponseDto.setData(pageResult);
        spaBedResponseDto.setTotalElement(page.getTotalElements());
        spaBedResponseDto.setTotalPage(page.getTotalPages());
        spaBedResponseDto.setPageIndex(pageNo+1);
        return spaBedResponseDto;
    }

    @Override
    public SpaBedResponseDto getAllSpaBed(int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        SpaBedResponseDto spaBedResponseDto = new SpaBedResponseDto();
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<SpaBed> page = spaBedRepository.findAll(pageable);
        List<SpaBed> spaBeds = page.getContent();
        List<SpaBedDto> spaBedDtos = new ArrayList<>();
        for (SpaBed spaBed : spaBeds){
            SpaBedDto spaBedDto = new SpaBedDto();
            spaBedDto = mapper.map(spaBed,SpaBedDto.class);
            spaBedDtos.add(spaBedDto);
        }
        spaBedResponseDto.setData(spaBedDtos);
        spaBedResponseDto.setTotalElement(page.getTotalElements());
        spaBedResponseDto.setTotalPage(page.getTotalPages());
        spaBedResponseDto.setPageIndex(pageNo+1);
        return spaBedResponseDto;
    }

    @Override
    public String validateSpaBed(String name) {
        String result = "";
        if(spaBedRepository.existsByName(name)){
            result += "Name already exists in data, ";
        }
        return result;
    }

    @Override
    public Boolean saveSpaBed(String name, Long branch) {
        SpaBed spaBed = new SpaBed();
        spaBed.setName(name);
        spaBed = spaBedRepository.save(spaBed);
        Bed_Branch_Mapping bed_branch_mapping = new Bed_Branch_Mapping(spaBed.getId(), branch);
        spaBed_branch_repository.save(bed_branch_mapping);
        return true;
    }

    @Override
    public Boolean updateSpaBed(Long id, String name, Long branch) {
        SpaBed spaBed = spaBedRepository.getSpaBedById(id);
        if(spaBed != null){
            if(name != null){
                spaBed.setName(name);
            }
            if(branch !=null){
                Bed_Branch_Mapping bed_branch_old = spaBed_branch_repository.getSpaBedByBranch(id);
                spaBed_branch_repository.delete(bed_branch_old);
                Bed_Branch_Mapping bed_branch_mapping = new Bed_Branch_Mapping(id,branch);
                spaBed_branch_repository.save(bed_branch_mapping);
            }
            return true;
        }else {
            return false;
        }
    }

    @Override
    public List<SpaBedDto> getBedFree(Long idCheck, String date, Long slot) {
        if(idCheck==null || date == null || slot == null){
            return null;
        } else {

            Long idBranch = spaBed_branch_repository.idBranch(idCheck);
            List<SpaBed> allBeds = spaBedRepository.getAllBed(idBranch);
            List<SpaBed> listDup = spaBedRepository.getBedFree(idBranch, date, slot);
            List<SpaBed> listResult = new ArrayList<>();
            for(SpaBed spaBeds : allBeds){
                if(listDup!=null){
                    Boolean check = false;
                    for(SpaBed spaBed: listDup){
                        if(spaBeds.getId() == spaBed.getId()){
                            check = true;
                        }
                    }
                    if(check == false){
                        listResult.add(spaBeds);
                    }
                } else{
                    listResult.add(spaBeds);
                }
            }
            List<SpaBedDto> listDto = new ArrayList<>();
            if(listResult!=null){
                for(SpaBed spaBed : listResult){
                    listDto.add(new SpaBedDto(spaBed));
                }
            }
            return listDto;
        }
    }

    @Override
    public StaffBedDto findStaffAndBedFree(Long idCheck, String date, Long idSlot) {
        if(idCheck==null || date == null || idSlot == null){
            return null;
        } else {

            Long idBranch = spaBed_branch_repository.idBranch(idCheck);
            List<SpaBed> allBeds = spaBedRepository.getAllBed(idBranch);
            List<SpaBed> listDupBed = spaBedRepository.getBedFree(idBranch, date, idSlot);
            List<SpaBed> listResultBed = new ArrayList<>();
            for(SpaBed spaBeds : allBeds){
                if(listDupBed!=null){
                    Boolean check = false;
                    for(SpaBed spaBed: listDupBed){
                        if(spaBeds.getId() == spaBed.getId()){
                            check = true;
                        }
                    }
                    if(check == false){
                        listResultBed.add(spaBeds);
                    }
                } else{
                    listResultBed.add(spaBeds);
                }
            }
            List<SpaBedDto> listDto = new ArrayList<>();
            if(listResultBed!=null){
                for(SpaBed spaBed : listResultBed){
                    listDto.add(new SpaBedDto(spaBed));
                }
            }
            List<Users> allUsers = userRepository.getAllTechStaff(idBranch);
            List<Users> listDupStaff = userRepository.getStaffFree(idBranch, date, idSlot);
            List<Users> listResultStaff = new ArrayList<>();
            for(Users users : allUsers){
                if(listDupStaff!=null){
                    Boolean check = false;
                    for(Users user: listDupStaff){
                        if(users.getId() == user.getId()){
                            check = true;
                        }
                    }
                    if(check == false){
                        listResultStaff.add(users);
                    }
                } else{
                    listResultStaff.add(users);
                }
            }
            List<UserDto> userDtos = new ArrayList<>();
            if(listResultStaff!=null){
                for(Users user : listResultStaff){
                    userDtos.add(new UserDto(user));
                }
            }
            StaffBedDto result = new StaffBedDto(userDtos,listDto);
            return result;
        }
    }
}
