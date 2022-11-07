package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.Bill;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Customer;
import com.swp.sbeauty.entity.Users;
import com.swp.sbeauty.entity.mapping.Bill_Branch_Mapping;
import com.swp.sbeauty.entity.mapping.Bill_Customer_Mapping;
import com.swp.sbeauty.entity.mapping.Bill_User_Mapping;
import com.swp.sbeauty.repository.BillRepository;
import com.swp.sbeauty.repository.mappingRepo.Bill_Branch_Mapping_Repository;
import com.swp.sbeauty.repository.mappingRepo.Bill_Cusomter_Mapping_Repositry;
import com.swp.sbeauty.repository.mappingRepo.Bill_User_Mapping_Repository;
import com.swp.sbeauty.service.BillService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class BillServiceImpl implements BillService {

    @Autowired
    BillRepository billRepository;
    @Autowired
    Bill_Cusomter_Mapping_Repositry bill_cusomter_mapping_repositry;
    @Autowired
    Bill_User_Mapping_Repository bill_user_mapping_repository;
    @Autowired
    Bill_Branch_Mapping_Repository bill_branch_mapping_repository;



    @Override
    public BillResponseDto getBills(int offSet, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        BillResponseDto billResponseDto = new BillResponseDto();
        Pageable pageable = PageRequest.of(offSet, pageSize);
        Page<Bill> page = billRepository.findAll(pageable);
        List<Bill> bills = page.getContent();

        List<BillDto> dtos = page
                .stream()
                .map(bill -> mapper.map(bill,BillDto.class))
                .collect(Collectors.toList());
        dtos.stream().forEach(f->
                {
                    Customer customer = bill_cusomter_mapping_repositry.getCustomerByBill(f.getId());
                    CustomerDto customerDto = new CustomerDto(customer);
                    Users users = bill_user_mapping_repository.getStaffByBill(f.getId());
                    UserDto userDto = new UserDto(users);
                    Branch branch = bill_branch_mapping_repository.getBranchByBill(f.getId());
                    BranchDto branchDto = new BranchDto(branch);
                    f.setCustomer(customerDto);
                    f.setBranch(branchDto);
                    f.setStaff(userDto);



                }
                );
        List<BillDto> pageResult = new ArrayList<>(dtos);
        billResponseDto.setData(pageResult);
        billResponseDto.setTotalElement(page.getTotalElements());
        billResponseDto.setPageIndex(offSet + 1);
        billResponseDto.setTotalPage(page.getTotalPages());





        return billResponseDto;
    }

    @Override
    public Page<BillDto> getBillsByBranch(int offSet, int pageSize, Long id) {
        return null;
    }

    @Override
    public BillDto getBillById(Long id) {
        Bill entity = billRepository.findById(id).orElse(null);
        CustomerDto customerDto = new CustomerDto(bill_cusomter_mapping_repositry.getCustomerByBill(id));
        UserDto userDto = new UserDto(bill_user_mapping_repository.getStaffByBill(id));
        BranchDto branchDto = new BranchDto(bill_branch_mapping_repository.getBranchByBill(id));
        if (entity != null){
            return new BillDto(entity.getId(), entity.getCode(),branchDto, userDto, customerDto, entity.getStatus(), entity.getDate(), entity.getMoneyPerTax(), entity.getMoneyAfterTax());
        }

        return null;
    }

    @Override
    public Boolean saveBill(BillDto billDto) {
       Bill bill = new Bill();
       bill.setCode(billDto.getCode());
       bill.setDate(billDto.getCreateDate());
       bill.setStatus(billDto.getStatus());
       bill.setMoneyPerTax(billDto.getPriceBeforeTax());
       bill.setMoneyAfterTax(billDto.getPriceAfterTax());
       Long customerId = billDto.getCustomer().getId();
       billRepository.save(bill);
       bill_branch_mapping_repository.save(new Bill_Branch_Mapping(bill.getId(), billDto.getBranch().getId()));
       bill_user_mapping_repository.save(new Bill_User_Mapping(bill.getId(), billDto.getStaff().getId()));
       bill_cusomter_mapping_repositry.save(new Bill_Customer_Mapping(bill.getId(), billDto.getCustomer().getId()));




        return true;
    }

    @Override
    public Boolean updateBill(Long id, BillDto billDto) {
        Bill bill = null;
        Optional<Bill> optional = billRepository.findById(id);
        if (optional.isPresent()){
            bill = optional.get();
        }
        bill.setDate(billDto.getCreateDate());
        bill.setStatus(billDto.getStatus());
        bill.setMoneyPerTax(bill.getMoneyPerTax());
        bill.setMoneyAfterTax(bill.getMoneyAfterTax());


        return false;
    }
}
