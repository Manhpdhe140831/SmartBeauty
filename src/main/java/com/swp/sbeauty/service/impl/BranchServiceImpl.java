package com.swp.sbeauty.service.impl;


import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.UserDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Role;
import com.swp.sbeauty.entity.User_Branch_Mapping;
import com.swp.sbeauty.entity.Users;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.UserRepository;
import com.swp.sbeauty.repository.mappingRepo.User_Branch_Mapping_Repo;
import com.swp.sbeauty.service.BranchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service @Transactional @Slf4j
public class BranchServiceImpl implements BranchService {

    @Autowired
    private BranchRepository branchRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private User_Branch_Mapping_Repo user_branch_mapping_repo;



    @Override
    public List<BranchDto> getBranch() {

        List<Branch> list = branchRepository.findAll();
        List<BranchDto> result =new ArrayList<>();
        for(Branch branch : list){
            result.add(new BranchDto(branch));
        }
        return result;
    }

    @Override
    public List<Branch> findAllBranchs() {
        return null;
    }

    @Override
    public BranchDto getById(Long id) {
        if (id != null) {
            Branch entity = branchRepository.findById(id).orElse(null);
//            UserDto managerDto = branchRepository.getManagerFromBranch(entity.getId());
            if (entity != null) {
                return new BranchDto(entity.getId(), entity.getName(), entity.getPhone(), entity.getAddress(), entity.getImage());
            }
        }
        return null;
    }

    @Override
    public List<Branch> findBranchsWithSorting(String field) {
        return null;
    }

    @Override
    public Boolean saveBranch(BranchDto branchDto) {
        try{
            if(branchDto != null){
                Branch branch = new Branch();
                branch.setName(branchDto.getName());
                branch.setPhone(branchDto.getPhone());
                branch.setAddress(branchDto.getAddress());
                branch.setImage(branchDto.getImage());
                branch = branchRepository.save(branch);
                if(branchDto.getManager().getId() != null){
                    User_Branch_Mapping user_branch_mapping = new User_Branch_Mapping(branchDto.getManager().getId(), branch.getId());
                    user_branch_mapping_repo.save(user_branch_mapping);
                }
                if(branch != null){
                    return true;
                }
            }
        }catch (Exception e){
            throw e;
        }
        return false;
    }

    @Override
    public BranchDto updateBranch(BranchDto branchDto, Long id) {
        try{
            if(branchDto !=null){
                Branch branch = null;
                if(id !=null){
                    Optional<Branch> optional =branchRepository.findById(id);
                    if(optional.isPresent()){
                        branch = optional.get();
                    }
                }
                if(branch != null){
                    branch.setName(branchDto.getName());
                    branch.setPhone(branchDto.getPhone());
                    branch.setAddress(branchDto.getAddress());
                    branch.setImage(branchDto.getImage());
                    branch = branchRepository.save(branch);
                    return new BranchDto(branch);
                } else {
                    return null;
                }
            }
        }catch (Exception e){
            throw e;
        }


        return null;
    }



    @Override
    public Page<Branch> findBranchsPaginationAndSort(int offset, int pageSize) {
        Page<Branch> branches =branchRepository.findAll(PageRequest.of(offset,pageSize));
        return branches;
    }

    @Override
    public Page<Branch> findBranchsPaginationAndSearch(String name, String address, String phone, int offset, int pageSize) {
        Page<Branch> branches =branchRepository.searchListWithField(name,address,phone,PageRequest.of(offset,pageSize));
        return branches;
    }

    @Override
    public String validateUser(BranchDto branchDto) {
        String result = "";
        if(branchRepository.existsByAddress(branchDto.getAddress())){
            result += "Address already exists in data, ";
        }
        if(branchRepository.existsByName(branchDto.getName())){
            result += "Name already exists in data";
        }
        return result;
    }


//    @Autowired
//    private BranchRepository branchRepository;
//
//    @Override
//    public List<BranchDto> getBranch() {
//        List<Branch> list = branchRepository.findAll();
//        List<BranchDto> result = new ArrayList<>();
//        for (Branch branch :list){
//            result.add(new BranchDto(branch));
//        }
//        return result;
//        /*Pageable pageable = PageRequest.of(pageNo, pageSize);
//        Page<Recruiter> page = recruiterRepository.getRecruiterByName(name,pageable);
//        List<Recruiter> freelancers=page.getContent();
//        List<RecruiterAdminDto> ras=new ArrayList<>();
//        for (Recruiter f: freelancers){
//            RecruiterAdminDto ra=new RecruiterAdminDto();
//            ra=mapToFreeDTO(f);
//            ra.setFullName(f.getUser().getFullname());
//            ra.setEmail(f.getUser().getAccount().getEmail*/
//    }
//
//    @Override
//    public List<Branch> findAllBranchs() {
//        return branchRepository.findAll();
//    }
//
//    @Override
//    public List<Branch> findBranchsWithSorting(String field) {
//        return branchRepository.findAll(Sort.by(Sort.Direction.ASC,field));
//    }
//
//    @Override
//    public BranchDto saveBranch(BranchDto branchDto) {
//        if(branchDto != null){
//            Branch branch = new Branch();
//            branch.setName(branchDto.getName());
//            branch.setPhone(branchDto.getPhone());
//            branch.setEmail(branchDto.getEmail());
//            branch.setCountry(branchDto.getCountry());
//            branch.setCity(branchDto.getCity());
//            branch.setDistrict(branchDto.getDistrict());
//            branch.setStreet(branchDto.getStreet());
//            branch = branchRepository.save(branch);
//            if(branch != null){
//                return new BranchDto(branch);
//            }
//        }
//        return null;
//    }
//
//    @Override
//    public BranchDto updateBranch(BranchDto branchDto, Long id) {
//        if(branchDto !=null){
//            Branch branch = null;
//            if(id !=null){
//                Optional<Branch> optional =branchRepository.findById(id);
//                if(optional.isPresent()){
//                    branch = optional.get();
//                }
//            }
//            if(branch != null){
//                branch.setName(branchDto.getName());
//                branch.setPhone(branchDto.getPhone());
//                branch.setEmail(branchDto.getEmail());
//                branch.setCountry(branchDto.getCountry());
//                branch.setCity(branchDto.getCity());
//                branch.setDistrict(branchDto.getDistrict());
//                branch.setStreet(branchDto.getStreet());
//                branch = branchRepository.save(branch);
//                return new BranchDto(branch);
//            } else {
//                return null;
//            }
//        }
//        return null;
//    }
//
//    @Override
//    public Page<Branch> findBranchsWithPaginnation(int offset, int pageSize) {
//        Page<Branch> branches =branchRepository.findAll(PageRequest.of(offset,pageSize));
//        return branches;
//    }
//
//    @Override
//    public Page<Branch> findBranchsWithPaginnationAnSort(int offset, int pageSize, String field) {
//        Page<Branch> branches =branchRepository.findAll(PageRequest.of(offset,pageSize).withSort(Sort.by(field)));
//        return branches;
//    }
}
