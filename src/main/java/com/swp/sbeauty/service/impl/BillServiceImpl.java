package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.*;
import com.swp.sbeauty.entity.mapping.*;
import com.swp.sbeauty.repository.BillDetailRepository;
import com.swp.sbeauty.repository.BillRepository;
import com.swp.sbeauty.repository.ProductRepository;
import com.swp.sbeauty.repository.mappingRepo.*;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.BillService;
import io.jsonwebtoken.Claims;
import org.joda.time.format.DateTimeFormat;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.*;
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

    @Autowired
    Customer_Course_Mapping_Repository customer_course_mapping_repository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    Bill_Product_History_Repository bill_product_history_repository;



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
                        Bill_Product_history bill_product_history = billDetailRepository.getBillProductHistory(itemb.getId());
//Long id, String name, Double price, String description, String image, String discountStart, String discountEnd, Double discountPercent,  String unit, Integer dose
                        ProductDto product = new ProductDto(bill_product_history.getProductId(),
                                                        bill_product_history.getName(),
                                                        bill_product_history.getPrice(),
                                                        bill_product_history.getDescription(),
                                                        bill_product_history.getImage(),
                                                        bill_product_history.getDiscountStart(),
                                                        bill_product_history.getDiscountEnd(),
                                                        bill_product_history.getDiscountPercent(),
                                                        bill_product_history.getUnit(),
                                                        bill_product_history.getDose());
                        ServiceDto s = billDetailRepository.getServiceByBillDetail(itemb.getId());
                        CourseDto c = billDetailRepository.getCourseByBillDetail(itemb.getId());
                        list.add(new BillDetailDto(itemb.getId(), product, s, c, itemb.getQuantity()));

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
        List<BillDetail> billDetailList = billDetailRepository.getBillDetailByBillId(id);
        for (BillDetail itemb: billDetailList
             ) {
            Bill_Product_history bill_product_history = billDetailRepository.getBillProductHistory(itemb.getId());
            ProductDto product = new ProductDto(bill_product_history.getProductId(),
                    bill_product_history.getName(),
                    bill_product_history.getPrice(),
                    bill_product_history.getDescription(),
                    bill_product_history.getImage(),
                    bill_product_history.getDiscountStart(),
                    bill_product_history.getDiscountEnd(),
                    bill_product_history.getDiscountPercent(),
                    bill_product_history.getUnit(),
                    bill_product_history.getDose());
            ServiceDto s = billDetailRepository.getServiceByBillDetail(itemb.getId());
            CourseDto c = billDetailRepository.getCourseByBillDetail(itemb.getId());
            list.add(new BillDetailDto(itemb.getId(), product, s, c, itemb.getQuantity()));

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
                Bill_Product_history bill_product_history = new Bill_Product_history();
                Product product = productRepository.getProductById(billDetailDto.getType_id());
                bill_product_history.setBillDetail_id(billDetail.getId());
                bill_product_history.setDate(bill.getCreateDate());
                bill_product_history.setProductId(product.getId());
                bill_product_history.setName(product.getName());
                bill_product_history.setPrice(product.getPrice());
                bill_product_history.setDescription(product.getDescription());
                bill_product_history.setImage(product.getImage());
                bill_product_history.setDiscountStart(product.getDiscountStart());
                bill_product_history.setDiscountEnd(product.getDiscountEnd());
                bill_product_history.setDiscountPercent(product.getDiscountPercent());
                bill_product_history.setUnit(product.getUnit());
                bill_product_history.setDose(product.getDose());
                bill_product_history_repository.save(bill_product_history);
            }if (billDetailDto.getType().equalsIgnoreCase("service")){
                BillDetail billDetail = new BillDetail();
                billDetail.setService_id(billDetailDto.getType_id());
                billDetail.setQuantity(billDetailDto.getQuantity());
                billDetailRepository.save(billDetail);
                bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
                // for (i=>billDetailDto.getQuantity())
                // Customer_Course_Mapping (Long bill_id, Long customer_id, Long service_id, String status "chuasudung")
                for (int i = 1; i<= billDetailDto.getQuantity(); i++){
                    customer_course_mapping_repository.save(new Customer_Course_Mapping(bill.getId(), billDto.getCustomer().getId(), billDetailDto.getType_id(), billDetailDto.getStatus()));
                }
            }if (billDetailDto.getType().equalsIgnoreCase("course")){
                BillDetail billDetail = new BillDetail();
                billDetail.setCourse_id(billDetailDto.getType_id());
                billDetail.setQuantity(billDetailDto.getQuantity());
                billDetailRepository.save(billDetail);
                bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
                // for (i=>billDetailDto.getQuantity())
                //Customer_Course_Mapping(Long bill_id, Long customer_id, Long course_id, String endDate, Integer count (0), String status (chuasudung))
                for (int i = 1; i<= billDetailDto.getQuantity(); i++){
                    customer_course_mapping_repository.save(new Customer_Course_Mapping(bill.getId(), billDto.getCustomer().getId(), billDetailDto.getType_id(), getEndDate(bill.getCreateDate(), billDetailRepository.getTimeOfUse(billDetailDto.getType_id())), 0, billDetailDto.getStatus()));
                }
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
        if (bill.getStatus().equalsIgnoreCase("dathanhtoan")){
            return false;
        }else {


            bill.setPriceBeforeTax(billDto.getPriceBeforeTax());
            bill.setPriceAfterTax(billDto.getPriceAfterTax());
            bill = billRepository.save(bill);
            List<BillDetailDto> billDetailDtos = billDto.getItems();
            for (BillDetailDto billDetailDto : billDetailDtos) {
                if (billDetailDto.getType().equalsIgnoreCase("product")) {
                    BillDetail billDetail = new BillDetail();
                    billDetail.setProduct_id(billDetailDto.getType_id());
                    billDetail.setQuantity(billDetailDto.getQuantity());
                    billDetail = billDetailRepository.save(billDetail);
                    bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
                }
                if (billDetailDto.getType().equalsIgnoreCase("service")) {
                    BillDetail billDetail = new BillDetail();
                    billDetail.setService_id(billDetailDto.getType_id());
                    billDetail.setQuantity(billDetailDto.getQuantity());
                    billDetailRepository.save(billDetail);
                    bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
                }
                if (billDetailDto.getType().equalsIgnoreCase("course")) {
                    BillDetail billDetail = new BillDetail();
                    billDetail.setCourse_id(billDetailDto.getType_id());
                    billDetail.setQuantity(billDetailDto.getQuantity());
                    billDetailRepository.save(billDetail);
                    bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
                }
            }
            Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
            Long idStaff = Long.parseLong(temp.get("id").toString());
            Long idBranch = user_branch_mapping_repo.idBranch(idStaff);
            bill_branch_mapping_repository.save(new Bill_Branch_Mapping(bill.getId(), idBranch));
            bill_user_mapping_repository.save(new Bill_User_Mapping(bill.getId(), idStaff));
            bill_cusomter_mapping_repositry.save(new Bill_Customer_Mapping(bill.getId(), billDto.getCustomer().getId()));
        }
        if (bill != null){
            return true;
        }else {
            return false;
        }


    }

    @Override
    public String getEndDate(String startDate, int duration) {
        String subStartDate = startDate.substring(0,10);
        DateTimeFormatter formmat1 = new DateTimeFormatterBuilder().appendPattern("yyyy-MM-dd").toFormatter();
        LocalDate localDateTime = LocalDate.parse(subStartDate , formmat1);
        LocalDate dt = localDateTime.plusDays(duration);
        String formatter = formmat1.format(dt);
        return formatter + "T17:00:00.000Z";
    }

}
