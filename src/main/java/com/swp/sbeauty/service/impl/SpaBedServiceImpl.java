package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.*;
import com.swp.sbeauty.entity.mapping.Bed_Branch_Mapping;
import com.swp.sbeauty.entity.mapping.Slot_Branch_Mapping;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.SpaBedRepository;
import com.swp.sbeauty.repository.UserRepository;
import com.swp.sbeauty.repository.mappingRepo.SpaBed_Branch_Repository;
import com.swp.sbeauty.repository.mappingRepo.User_Branch_Mapping_Repo;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.SpaBedService;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
    @Autowired
    private User_Branch_Mapping_Repo user_branch_mapping_repo;
    @Autowired
    JwtUtils jwtUtils;
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
                        , new UserDto(users),branch.getPhone(),branch.getAddress(),branch.getEmail(),branch.getLogo()), entity.getDescription());
            }
        }
        return null;
    }

    @Override
    public SpaBedResponseDto getSpaBedAndSearch(Long idCheck, String name, int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        SpaBedResponseDto spaBedResponseDto = new SpaBedResponseDto();
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Long idBranch = spaBed_branch_repository.idBranch(idCheck);
        Page<SpaBed> page = spaBedRepository.searchListWithField(idBranch,name,pageable);
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
    public SpaBedResponseDto getAllSpaBed(Long idCheck ,int pageNo, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        SpaBedResponseDto spaBedResponseDto = new SpaBedResponseDto();
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Long idBranch = spaBed_branch_repository.idBranch(idCheck);
        Page<SpaBed> page = spaBedRepository.getAllSpaBed(idBranch ,pageable);
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
    public String updateSpaBed(SpaBedDto spaBedDto) {
        String check = null;
        if(spaBedDto.getId()!=null){
            SpaBed spaBed = spaBedRepository.getSpaBedById(spaBedDto.getId());
            if(spaBed != null){
                if(spaBedDto.getName() != null){
                    Long idBranch = spaBed_branch_repository.getBranchId(spaBed.getId());
                    List<SpaBed> listBed = spaBedRepository.getListByBranch(idBranch);
                    for(SpaBed bed : listBed){
                        if(spaBedDto.getName().equalsIgnoreCase(bed.getName())){
                            check = "Name already exists";
                            break;
                        }
                    }
                    if(check == null){
                        spaBed.setName(spaBedDto.getName());
                    }
                }
                if (spaBedDto.getDescription() != null){
                    spaBed.setDescription(spaBedDto.getDescription());
                }
                return check;
            }else {
                return "Bed not found";
            }
        } else {
            return "Id null";
        }
    }

    @Override
    public StaffBedDto findStaffAndBedFree(Long idCheck, String date, Long idSlot) {
        if(idCheck==null || date == null || idSlot == null){
            return null;
        } else {
            try {
                Date date1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(date);
                Date newDate = new Date(date1.getTime() + 7 * 3600 * 1000);
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                String nowAsISO = df.format(newDate);
                Long idBranch = spaBed_branch_repository.idBranch(idCheck);
                List<SpaBed> allBeds = spaBedRepository.getAllBed(idBranch);
                List<SpaBed> listDupBed = spaBedRepository.getBedFree(idBranch, nowAsISO, idSlot);
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
                List<Users> listDupStaff = userRepository.getStaffFree(idBranch, nowAsISO, idSlot);
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
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    @Override
    public Boolean saveBed(SpaBedDto spaBedDto, String authHeader) {
        try {

            SpaBed spaBed = new SpaBed();

            if (spaBedDto.getName() != null) {
                spaBed.setName(spaBedDto.getName() );
            }
            if (spaBedDto.getDescription() != null){
                spaBed.setDescription(spaBedDto.getDescription());
            }
            spaBed = spaBedRepository.save(spaBed);
            Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
            Long idStaff = Long.parseLong(temp.get("id").toString());
            Long idBranch =  user_branch_mapping_repo.idBranch(idStaff);
            spaBed_branch_repository.save(new Bed_Branch_Mapping(spaBed.getId(), idBranch));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean delete(Long id) {
        if (id != null){
            SpaBed spaBed = spaBedRepository.getSpaBedById(id);
            if (spaBed != null){
                spaBed.setIsDelete(true);
                spaBedRepository.save(spaBed);
                return true;
            }else{
                return false;
            }
        }else {
            return false;
        }

    }
}
