package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.*;
import com.swp.sbeauty.entity.mapping.Bill_BillDetail_Mapping;
import com.swp.sbeauty.entity.mapping.Bill_Branch_Mapping;
import com.swp.sbeauty.entity.mapping.Bill_Customer_Mapping;
import com.swp.sbeauty.entity.mapping.Bill_User_Mapping;
import com.swp.sbeauty.repository.BillDetailRepository;
import com.swp.sbeauty.repository.BillRepository;
import com.swp.sbeauty.repository.mappingRepo.*;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.BillService;
import io.jsonwebtoken.Claims;
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
    JwtUtils jwtUtils;
    @Autowired
    Bill_Cusomter_Mapping_Repositry bill_cusomter_mapping_repositry;
    @Autowired
    Bill_User_Mapping_Repository bill_user_mapping_repository;
    @Autowired
    Bill_Branch_Mapping_Repository bill_branch_mapping_repository;
    @Autowired
    BillDetailRepository billDetailRepository;
    @Autowired
    Bill_BillDetail_Mapping_Repository bill_billDetail_mapping_repository;
    @Autowired
    User_Branch_Mapping_Repo user_branch_mapping_repo;



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
                    List<BillDetailDto> list = new ArrayList<>();
                    List<BillDetail> billDetailList = billDetailRepository.getBillDetailByBillId(f.getId());
                    for (BillDetail itemb: billDetailList
                    ) {
                        ProductDto p = billDetailRepository.getProductByBillDetail(itemb.getId());
                        ServiceDto s = billDetailRepository.getServiceByBillDetail(itemb.getId());
                        CourseDto c = billDetailRepository.getCourseByBillDetail(itemb.getId());
                        list.add(new BillDetailDto(itemb.getId(), p, s, c, itemb.getQuantity()));

                    }
                    f.setItems(list);
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
        List<BillDetailDto> list = new ArrayList<>();
        BillDetailDto billDetailDto = null;
        List<BillDetail> billDetailList = billDetailRepository.getBillDetailByBillId(id);
        for (BillDetail itemb: billDetailList
             ) {
            ProductDto p = billDetailRepository.getProductByBillDetail(itemb.getId());
            ServiceDto s = billDetailRepository.getServiceByBillDetail(itemb.getId());
            CourseDto c = billDetailRepository.getCourseByBillDetail(itemb.getId());
            list.add(new BillDetailDto(itemb.getId(), p, s, c, itemb.getQuantity()));

        }
        if (entity != null){
            return new BillDto(entity.getId(), entity.getCode(),branchDto, userDto, customerDto, entity.getStatus(), entity.getCreateDate(), entity.getPriceBeforeTax(), entity.getPriceAfterTax(), list);
        }

        return null;
    }

    @Override
    public Boolean saveBill(BillDto billDto, String authHeader) {
       Bill bill = new Bill();
       bill.setCode(billDto.getCode());
       bill.setCreateDate(billDto.getCreateDate());
       bill.setStatus(billDto.getStatus());
       bill.setPriceBeforeTax(billDto.getPriceBeforeTax());
       bill.setPriceAfterTax(billDto.getPriceAfterTax());
       bill = billRepository.save(bill);
       List<BillDetailDto> billDetailDtos = billDto.getItems();
        for (BillDetailDto billDetailDto: billDetailDtos) {
            if (billDetailDto.getType().equalsIgnoreCase("product")){
                BillDetail billDetail = new BillDetail();
                billDetail.setProduct_id(billDetailDto.getType_id());
                billDetail.setQuantity(billDetailDto.getQuantity());
                billDetail = billDetailRepository.save(billDetail);
               bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
            }if (billDetailDto.getType().equalsIgnoreCase("service")){
                BillDetail billDetail = new BillDetail();
                billDetail.setService_id(billDetailDto.getType_id());
                billDetail.setQuantity(billDetailDto.getQuantity());
                billDetailRepository.save(billDetail);
                bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
            }if (billDetailDto.getType().equalsIgnoreCase("course")){
                BillDetail billDetail = new BillDetail();
                billDetail.setCourse_id(billDetailDto.getType_id());
                billDetail.setQuantity(billDetailDto.getQuantity());
                billDetailRepository.save(billDetail);
                bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
            }
        }
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        Long idStaff = Long.parseLong(temp.get("id").toString());
        Long idBranch =  user_branch_mapping_repo.idBranch(idStaff);
        if (idBranch != null){
            bill_branch_mapping_repository.save(new Bill_Branch_Mapping(bill.getId(), idBranch));
        }

        bill_user_mapping_repository.save(new Bill_User_Mapping(bill.getId(), idStaff));
        bill_cusomter_mapping_repositry.save(new Bill_Customer_Mapping(bill.getId(), billDto.getCustomer().getId()));
// customer - course
//        Long idCourse = null;
//        for (BillDetailDto billDetailDto: billDetailDtos) {
//            if (billDetailDto.getType().equalsIgnoreCase("course")){
//                idCourse = billDetailDto.getType_id();
//            }
//        }

        if (bill != null){
            return true;
        }else {
            return false;
        }



    }

    @Override
    public Boolean updateBill(Long id, BillDto billDto, String authHeader) {
        Bill bill = null;
        Optional<Bill> optional = billRepository.findById(id);
        if (optional.isPresent()) {
            bill = optional.get();
        }
// xoa bill_billdetail_mapping
        Bill_BillDetail_Mapping bill_billDetail_mapping = bill_billDetail_mapping_repository.getByBillId(id);
        if (null != bill_billDetail_mapping) {
            bill_billDetail_mapping_repository.delete(bill_billDetail_mapping);
        }

        // xoa bill customer mapping
        Bill_Customer_Mapping bill_customer_mapping = bill_cusomter_mapping_repositry.getByBillId(id);
        if (null != bill_customer_mapping){
            bill_cusomter_mapping_repositry.delete(bill_customer_mapping);
    }
       // xoa bill user mapping
       Bill_User_Mapping bill_user_mapping = bill_user_mapping_repository.getByBillId(id);
       if (null != bill_user_mapping){
           bill_user_mapping_repository.delete(bill_user_mapping);
       }
       // xoa bill branch mapping
       Bill_Branch_Mapping bill_branch_mapping = bill_branch_mapping_repository.getByBillId(id);
        // xoa bill detail by billid
       if (null != bill_branch_mapping){
           bill_branch_mapping_repository.delete(bill_branch_mapping);
       }
        List<BillDetail> billDetailList = billDetailRepository.getBillDetailByBillId(id);
        for (BillDetail itemb: billDetailList
        ) {
            billDetailRepository.delete(itemb);
        }


        bill.setCreateDate(billDto.getCreateDate());
        bill.setStatus(billDto.getStatus());
        bill.setPriceBeforeTax(billDto.getPriceBeforeTax());
        bill.setPriceAfterTax(billDto.getPriceAfterTax());
        bill = billRepository.save(bill);
        List<BillDetailDto> billDetailDtos = billDto.getItems();
        for (BillDetailDto billDetailDto: billDetailDtos) {
            if (billDetailDto.getType().equalsIgnoreCase("product")){
                BillDetail billDetail = new BillDetail();
                billDetail.setProduct_id(billDetailDto.getType_id());
                billDetail.setQuantity(billDetailDto.getQuantity());
                billDetail = billDetailRepository.save(billDetail);
                bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
            }if (billDetailDto.getType().equalsIgnoreCase("service")){
                BillDetail billDetail = new BillDetail();
                billDetail.setService_id(billDetailDto.getType_id());
                billDetail.setQuantity(billDetailDto.getQuantity());
                billDetailRepository.save(billDetail);
                bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
            }if (billDetailDto.getType().equalsIgnoreCase("course")){
                BillDetail billDetail = new BillDetail();
                billDetail.setCourse_id(billDetailDto.getType_id());
                billDetail.setQuantity(billDetailDto.getQuantity());
                billDetailRepository.save(billDetail);
                bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
            }
        }
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        Long idStaff = Long.parseLong(temp.get("id").toString());
        Long idBranch =  user_branch_mapping_repo.idBranch(idStaff);
        bill_branch_mapping_repository.save(new Bill_Branch_Mapping(bill.getId(), idBranch));
        bill_user_mapping_repository.save(new Bill_User_Mapping(bill.getId(), idStaff));
        bill_cusomter_mapping_repositry.save(new Bill_Customer_Mapping(bill.getId(), billDto.getCustomer().getId()));

        if (bill != null){
            return true;
        }else {
            return false;
        }

    }
}
