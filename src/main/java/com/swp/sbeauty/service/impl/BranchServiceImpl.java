package com.swp.sbeauty.service.impl;


import com.swp.sbeauty.dto.BranchDto;
import com.swp.sbeauty.dto.BranchResponseDto;
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
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class BranchServiceImpl implements BranchService {

    @Autowired
    private BranchRepository branchRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private User_Branch_Mapping_Repo user_branch_mapping_repo;

    @Autowired
    private ModelMapper mapper;

    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

    @Override
    public List<BranchDto> getBranch() {

        List<Branch> list = branchRepository.findAll();
        List<BranchDto> result = new ArrayList<>();
        for (Branch branch : list) {
            result.add(new BranchDto(branch));
        }
        return result;
    }

    @Override
    public BranchDto getById(Long id) {
        if (id != null) {
            Branch entity = branchRepository.findById(id).orElse(null);
            Users manager = userRepository.getManagerFromBranch(entity.getId());
            if (entity != null) {
                return new BranchDto(entity.getId(), entity.getName(), new UserDto(manager), entity.getPhone(), entity.getAddress(), entity.getEmail(), entity.getLogo());
            }
        }
        return null;
    }

    @Override
    public Boolean saveBranch(String name, String email, String phone, String address, Long manager, MultipartFile image) {
        try {
            Branch branch = new Branch();
            branch.setName(name);
            branch.setEmail(email);
            branch.setPhone(phone);
            branch.setAddress(address);
            branch = branchRepository.save(branch);
            if (image != null) {
                Path staticPath = Paths.get("static");
                Path imagePath = Paths.get("images");
                if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                    Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
                }
                Path file = CURRENT_FOLDER.resolve(staticPath)
                        .resolve(imagePath).resolve("branch_"+ branch.getId() +image.getOriginalFilename());
                try (OutputStream os = Files.newOutputStream(file)) {
                    os.write(image.getBytes());
                }
                branch.setLogo("branch_"+ branch.getId() +image.getOriginalFilename());
            }
            branchRepository.save(branch);
            User_Branch_Mapping user_branch_mapping = new User_Branch_Mapping(manager, branch.getId());
            user_branch_mapping_repo.save(user_branch_mapping);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    @Override
    public String validateBranch(String name, String email, String phone) {
        String result = "";
        if (branchRepository.existsByEmail(email)) {
            result += "Email already exists in data, ";
        }
        if (branchRepository.existsByPhone(phone)) {
            result += "phone already exists in data, ";
        }
        if (branchRepository.existsByName(name)) {
            result += "name already exists in data";
        }
        return result;
    }

    @Override
    public Boolean updateBranch(Long id, String name, String email, String phone, String address, Long manager, MultipartFile image) {
        try {
            Branch branch = branchRepository.getBranchById(id);
            if (branch != null) {
                if (name != null) {
                    branch.setName(name);
                }
                if (email != null) {
                    branch.setEmail(email);
                }
                if (phone != null) {
                    branch.setPhone(phone);
                }
                if (address != null) {
                    branch.setAddress(address);
                }
                if (image != null) {
                    Path staticPath = Paths.get("static");
                    Path imagePath = Paths.get("images");
                    if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                        Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
                    }
                    Path file = CURRENT_FOLDER.resolve(staticPath)
                            .resolve(imagePath).resolve("branch_"+ branch.getId() +image.getOriginalFilename());
                    try (OutputStream os = Files.newOutputStream(file)) {
                        os.write(image.getBytes());
                    }
                    //remove old image
                    if(branch.getLogo()!=null){
                        Path pathOld = CURRENT_FOLDER.resolve(staticPath)
                                .resolve(imagePath).resolve(branch.getLogo());

                        File fileOld = new File(pathOld.toString());
                        if (!fileOld.delete()) {
                            throw new IOException("Unable to delete file: " + fileOld.getAbsolutePath());
                        }
                    }
                    branch.setLogo("branch_"+ branch.getId() +image.getOriginalFilename());
                }
                if (manager != null) {
                    Users managerOld = userRepository.getManagerFromBranch(id);
                    User_Branch_Mapping user_manager_old = user_branch_mapping_repo.getByManager(managerOld.getId());
                    user_branch_mapping_repo.delete(user_manager_old);
                    User_Branch_Mapping user_branch_mapping = new User_Branch_Mapping(manager, id);
                    user_branch_mapping_repo.save(user_branch_mapping);
                }
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Page<Branch> findBranchsPaginationAndSort(int offset, int pageSize) {
        Page<Branch> branches = branchRepository.findAll(PageRequest.of(offset, pageSize));
        return branches;
    }

    @Override
    public Page<Branch> findBranchsPaginationAndSearch(String name, String address, String phone, int offset, int pageSize) {
        Page<Branch> branches = branchRepository.searchListWithField(name, address, phone, PageRequest.of(offset, pageSize));
        return branches;
    }

    @Override
    public BranchResponseDto getBranchAndSearch(String name, String address, String phone, int pageNo, int pageSize) {
        BranchResponseDto branchResponseDto = new BranchResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Branch> page = branchRepository.searchListWithField(name, address, phone, pageable);
        List<BranchDto> dtos = page
                .stream()
                .map(branch -> mapper.map(branch, BranchDto.class))
                .collect(Collectors.toList());
        dtos.stream().forEach(f ->
                {
                    Users users = userRepository.getManagerFromBranch(f.getId());
                    f.setManager(new UserDto(users));
                }
        );
        List<BranchDto> pageResult = new ArrayList<>(dtos);
        branchResponseDto.setData(pageResult);
        branchResponseDto.setTotalElement(page.getTotalElements());
        branchResponseDto.setTotalPage(page.getTotalPages());
        branchResponseDto.setPageIndex(pageNo + 1);
        return branchResponseDto;
    }

    @Override
    public BranchResponseDto getAllBranch(int pageNo, int pageSize) {
        BranchResponseDto branchResponseDto = new BranchResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Branch> page = branchRepository.findAll(pageable);
        List<Branch> branches = page.getContent();
        List<BranchDto> branchDtos = new ArrayList<>();
        for (Branch branch : branches) {
            BranchDto branchDto = new BranchDto();
            branchDto = mapper.map(branch, BranchDto.class);
            branchDtos.add(branchDto);
        }
        branchResponseDto.setData(branchDtos);
        branchResponseDto.setTotalElement(page.getTotalElements());
        branchResponseDto.setTotalPage(page.getTotalPages());
        branchResponseDto.setPageIndex(pageNo + 1);
        return branchResponseDto;
    }
}
