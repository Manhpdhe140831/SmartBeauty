package com.swp.sbeauty.service.impl;


import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.User;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.UserRepository;
import com.swp.sbeauty.service.BranchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import java.util.Optional;

@Service @Transactional @Slf4j
public class BranchServiceImpl implements BranchService {

    @Autowired
    private BranchRepository branchRepository;
    @Autowired
    private UserRepository userRepository;




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
    public List<Branch> findBranchsWithSorting(String field) {
        return null;
    }

    @Override
    public BranchDto saveBranch(BranchDto branchDto) {
        try{
            if(branchDto != null){
                Branch branch = new Branch();
                branch.setName(branchDto.getName());
                branch.setPhone(branchDto.getPhone());
                branch.setAddress(branchDto.getAddress());
                branch.setImage(branchDto.getImage());
                if(branchDto.getUsers()!=null){
                    User user = null;
                    Optional<User> optional = userRepository.findById(branchDto.getUsers().getId());
                    if (optional.isPresent()) {
                        user = optional.get();
                    }
                    branch.setUser(user);
                }
                branch = branchRepository.save(branch);
                if(branch != null){
                    return new BranchDto(branch);
                }
            }
        }catch (Exception e){
            throw e;
        }
        return null;
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
                    if(branchDto.getUsers()!=null){
                        User user = null;
                        Optional<User> optional = userRepository.findById(branchDto.getUsers().getId());
                        if (optional.isPresent()) {
                            user = optional.get();
                        }
                        branch.setUser(user);
                    }
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
    public Page<Branch> findBranchsWithPaginnation(int offset, int pageSize) {
        return null;
    }

    @Override
    public Page<Branch> findBranchsWithPaginnationAnSort(int offset, int pageSize, String field) {
        return null;
    }


    @Override
    public Page<Branch> findBranchsPaginationAndSort(int offset, int pageSize, String field, String direction) {
        Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(field).ascending() : Sort.by(field).descending();
        Page<Branch> branches =branchRepository.findAll(PageRequest.of(offset,pageSize,sort));
        return branches;
    }

    @Override
    public Page<Branch> findBranchsPaginationAndSearch(int offset, int pageSize, String name,String address) {
        Pageable pageable=PageRequest.of(offset,pageSize);
        Page<Branch> branches = branchRepository.getBranchByFilter(name,address,pageable);
        System.out.println(branches);

        return branches;
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
