package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.*;
import com.swp.sbeauty.entity.mapping.*;
import com.swp.sbeauty.repository.*;
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

import java.text.DateFormat;
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

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    Bill_Service_History_Repository bill_service_history_repository;

    @Autowired
    Bill_Course_History_Repository bill_course_history_repository;

    @Autowired
    Customer_Branch_Mapping_Repo customer_branch_mapping_repo;

    @Autowired
    Schedule_Bill_Mapping_Repository schedule_bill_mapping_repository;

    String usingStatus = "2";

    @Override
    public BillResponseDto getBills(Long idCheck, int offSet, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        BillResponseDto billResponseDto = new BillResponseDto();
        Pageable pageable = PageRequest.of(offSet, pageSize);
        Long idBranch = customer_branch_mapping_repo.idBranch(idCheck);
        Page<Bill> page = billRepository.getAllBill(idBranch, pageable);

        List<BillDto> dtos = page
                .stream()
                .map(bill -> mapper.map(bill, BillDto.class))
                .collect(Collectors.toList());
        dtos.stream().forEach(f ->
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
                    BillItem<CourseDto, ServiceDto> item = null;
                    List<BillDetailDto> addons = new ArrayList<>();
                    List<BillDetail> billDetailList = billDetailRepository.getBillDetailByBillId(f.getId());
                    for (BillDetail itemb : billDetailList) {
                        CourseDto course = null;
                        ProductDto product = null;
                        ServiceDto service = null;
                        if (itemb.getProduct_id() != null) {
                            Bill_Product_history bill_product_history = billDetailRepository.getBillProductHistory(itemb.getId());
                            if (bill_product_history != null) {
                                product = new ProductDto(bill_product_history.getProductId(),
                                        bill_product_history.getName(),
                                        bill_product_history.getPrice(),
                                        bill_product_history.getDescription(),
                                        bill_product_history.getImage(),
                                        bill_product_history.getDiscountStart(),
                                        bill_product_history.getDiscountEnd(),
                                        bill_product_history.getDiscountPercent(),
                                        bill_product_history.getUnit(),
                                        bill_product_history.getDose());
                            }
                            addons.add(new BillDetailDto(product, itemb.getQuantity()));
                        }
                        if (itemb.getService_id() != null) {
                            Bill_Service_History bill_service_history = bill_service_history_repository.getBill_Service_HistoryById(itemb.getService_id());
                            if (bill_service_history != null) {
                                service = new ServiceDto(bill_service_history.getServiceId(),
                                        bill_service_history.getName(),
                                        bill_service_history.getDiscountStart(),
                                        bill_service_history.getDiscountEnd(),
                                        bill_service_history.getDiscountPercent(),
                                        bill_service_history.getPrice(),
                                        bill_service_history.getDescription(),
                                        bill_service_history.getDuration(),
                                        bill_service_history.getImage());
                            }
                            f.setItem(service);
                            f.setItemType("service");
                        }
                        if (itemb.getCourse_id() != null) {
                            Bill_Course_History bill_course_history = bill_course_history_repository.getBill_Course_HistoriesById(itemb.getCourse_id());
                            if (bill_course_history != null) {
                                course = new CourseDto(bill_course_history.getCourse_id(),
                                        bill_course_history.getCode(),
                                        bill_course_history.getName(),
                                        bill_course_history.getPrice(),
                                        bill_course_history.getDuration(),
                                        bill_course_history.getTimeOfUse(),
                                        bill_course_history.getDiscountStart(),
                                        bill_course_history.getDiscountEnd(),
                                        bill_course_history.getDiscountPercent(),
                                        bill_course_history.getImage(),
                                        bill_course_history.getDescription());
                            }
                            f.setItem(course);
                            f.setItemType("course");
                        }
                    }
                    f.setAddons(addons);
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
    public BillResponseDto getBillsByCustomer(int offSet, int pageSize, Long id) {
        ModelMapper mapper = new ModelMapper();
        BillResponseDto billResponseDto = new BillResponseDto();
        Pageable pageable = PageRequest.of(offSet, pageSize);
        Page<Bill> page = billRepository.searchBillByCustomer(id, pageable);

        List<BillDto> dtos = page
                .stream()
                .map(bill -> mapper.map(bill, BillDto.class))
                .collect(Collectors.toList());
        dtos.stream().forEach(f ->
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
                    for (BillDetail itemb : billDetailList
                    ) {
                        CourseDto course = null;
                        ProductDto product = null;
                        ServiceDto service = null;
                        if (itemb.getProduct_id() != null) {
                            Bill_Product_history bill_product_history = billDetailRepository.getBillProductHistory(itemb.getId());
                            if (bill_product_history != null) {
                                product = new ProductDto(bill_product_history.getProductId(),
                                        bill_product_history.getName(),
                                        bill_product_history.getPrice(),
                                        bill_product_history.getDescription(),
                                        bill_product_history.getImage(),
                                        bill_product_history.getDiscountStart(),
                                        bill_product_history.getDiscountEnd(),
                                        bill_product_history.getDiscountPercent(),
                                        bill_product_history.getUnit(),
                                        bill_product_history.getDose());
                            }
                        }
                        if (itemb.getService_id() != null) {
                            Bill_Service_History bill_service_history = bill_service_history_repository.getBill_Service_HistoryById(itemb.getId());
                            if (bill_service_history != null) {
                                service = new ServiceDto(bill_service_history.getServiceId(),
                                        bill_service_history.getName(),
                                        bill_service_history.getDiscountStart(),
                                        bill_service_history.getDiscountEnd(),
                                        bill_service_history.getDiscountPercent(),
                                        bill_service_history.getPrice(),
                                        bill_service_history.getDescription(),
                                        bill_service_history.getDuration(),
                                        bill_service_history.getImage());
                            }
                        }
                        if (itemb.getCourse_id() != null) {
                            Bill_Course_History bill_course_history = bill_course_history_repository.getBill_Course_HistoriesById(itemb.getId());
                            if (bill_course_history != null) {
                                course = new CourseDto(bill_course_history.getCourse_id(),
                                        bill_course_history.getCode(),
                                        bill_course_history.getName(),
                                        bill_course_history.getPrice(),
                                        bill_course_history.getDuration(),
                                        bill_course_history.getTimeOfUse(),
                                        bill_course_history.getDiscountStart(),
                                        bill_course_history.getDiscountEnd(),
                                        bill_course_history.getDiscountPercent(),
                                        bill_course_history.getImage(),
                                        bill_course_history.getDescription());
                            }
                        }
                        ServiceDto s = billDetailRepository.getServiceByBillDetail(itemb.getId());
                        CourseDto c = billDetailRepository.getCourseByBillDetail(itemb.getId());
                        list.add(new BillDetailDto(itemb.getId(), product, service, course, itemb.getQuantity()));

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
    public BillDto getBillById(Long id) {
        if (id != null) {
            Bill entity = billRepository.getBillById(id);
            if (entity != null) {
                CustomerDto customerDto = new CustomerDto(bill_cusomter_mapping_repositry.getCustomerByBill(id));
                UserDto userDto = new UserDto(bill_user_mapping_repository.getStaffByBill(id));
                BranchDto branchDto = new BranchDto(bill_branch_mapping_repository.getBranchByBill(id));
                BillItem<CourseDto, ServiceDto> item = null;
                List<BillDetailDto> addons = new ArrayList<>();
                List<BillDetail> billDetailList = billDetailRepository.getBillDetailByBillId(id);
                CourseDto course = null;
                ProductDto product = null;
                ServiceDto service = null;
                for (BillDetail itemb : billDetailList) {
                    if (itemb.getProduct_id() != null) {
                        Bill_Product_history bill_product_history = billDetailRepository.getBillProductHistory(itemb.getId());
                        product = new ProductDto(bill_product_history);
                        addons.add(new BillDetailDto(product, itemb.getQuantity()));
                    }
                    if (itemb.getService_id() != null) {
                        Bill_Service_History bill_service_history = bill_service_history_repository.getBill_Service_HistoryById(itemb.getService_id());
                        service = new ServiceDto(bill_service_history);
                    }
                    if (itemb.getCourse_id() != null) {
                        Bill_Course_History bill_course_history = bill_course_history_repository.getBill_Course_HistoriesById(itemb.getCourse_id());
                        course = new CourseDto(bill_course_history);
                    }
                }
                String itemType = "";
                if(course!=null){
                    itemType = "course";
                    return new BillDto(entity.getId(), entity.getCode(), branchDto, userDto, customerDto, Long.parseLong(entity.getStatus()), entity.getCreateDate(), entity.getPriceBeforeTax(), entity.getPriceAfterTax(), course,addons,itemType);
                } else if(service!=null){
                    itemType = "service";
                    return new BillDto(entity.getId(), entity.getCode(), branchDto, userDto, customerDto, Long.parseLong(entity.getStatus()), entity.getCreateDate(), entity.getPriceBeforeTax(), entity.getPriceAfterTax(), service,addons,itemType);
                }
            }
        }
        return null;
    }

    @Override
    public Boolean saveBill(BillDto billDto, String authHeader) {
        Bill bill = new Bill();
        bill.setCode(billDto.getCode());
        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'"); // Quoted "Z" to indicate UTC, no timezone offset
        df.setTimeZone(tz);
        String nowAsISO = df.format(new Date());
        bill.setCreateDate(nowAsISO);
        bill.setStatus("1");
        bill.setPriceBeforeTax(billDto.getPriceBeforeTax());
        bill.setPriceAfterTax(billDto.getPriceAfterTax());
        bill = billRepository.save(bill);
        schedule_bill_mapping_repository.save(new Schedule_Bill_Mapping(billDto.getScheduleId(), bill.getId()));
        if (billDto.getAddons() != null) {
            for (BillDetailDto billDetailDto : billDto.getAddons()) {
                BillDetail billDetail = new BillDetail();
                billDetail.setProduct_id(billDetailDto.getItemId());//id product
                billDetail.setQuantity(billDetailDto.getQuantity());
                billDetail = billDetailRepository.save(billDetail);
                bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
                Bill_Product_history bill_product_history = new Bill_Product_history();
                Product product = productRepository.getProductById(billDetailDto.getItemId());
                bill_product_history.setDate(billDto.getCreateDate());
                bill_product_history.setBillDetail_id(billDetail.getId());
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
            }
        }
        if (billDto.getItemId() != null && billDto.getItemType() != null) {
            if (billDto.getItemType().equalsIgnoreCase("service")) {
                BillDetail billDetail = new BillDetail();
                billDetail.setService_id(billDto.getItemId());//id service history
                billDetail.setQuantity(Long.parseLong("1"));
                billDetail = billDetailRepository.save(billDetail);
                bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
                customer_course_mapping_repository.save(new Customer_Course_Mapping(billDetail.getId(), billDto.getCustomerId(), billDto.getItemId(), usingStatus));
            } else if (billDto.getItemType().equalsIgnoreCase("course")) {
                BillDetail billDetail = new BillDetail();
                billDetail.setCourse_id(billDto.getItemId());
                billDetail.setQuantity(Long.parseLong("1"));
                billDetail = billDetailRepository.save(billDetail);
                Bill_Course_History bill_course_history = bill_course_history_repository.getBill_Course_HistoriesById(billDto.getItemId());
                Integer duration = bill_course_history.getDuration();
                bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
                customer_course_mapping_repository.save(new Customer_Course_Mapping(billDetail.getId(), billDto.getCustomerId(), billDto.getItemId(), getEndDate(bill.getCreateDate(), duration), 0, usingStatus));
            }
        }
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        Long idStaff = Long.parseLong(temp.get("id").toString());
        Long idBranch = user_branch_mapping_repo.idBranch(idStaff);
        if (idBranch != null) {
            bill_branch_mapping_repository.save(new Bill_Branch_Mapping(bill.getId(), idBranch));
        }

        bill_user_mapping_repository.save(new Bill_User_Mapping(bill.getId(), idStaff));
        bill_cusomter_mapping_repositry.save(new Bill_Customer_Mapping(bill.getId(), billDto.getCustomerId()));

        if (bill != null) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean updateBill(BillDto billDto, String authHeader) {
        Bill bill = null;
        Optional<Bill> optional = billRepository.findById(billDto.getId());
        if (optional.isPresent()) {
            bill = optional.get();
        }
        if(bill!=null && bill.getStatus().equalsIgnoreCase("1")){
            TimeZone tz = TimeZone.getTimeZone("UTC");
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'"); // Quoted "Z" to indicate UTC, no timezone offset
            df.setTimeZone(tz);
            String nowAsISO = df.format(new Date());
            bill.setCreateDate(nowAsISO);
            if(billDto.getPriceBeforeTax()!=null){
                bill.setPriceBeforeTax(billDto.getPriceBeforeTax());
            }
            if(billDto.getPriceAfterTax()!=null){
                bill.setPriceAfterTax(billDto.getPriceAfterTax());
            }
            if(billDto.getAddons()!=null){
                //delete from bill detail
                List<BillDetail> list = billDetailRepository.getAddons(billDto.getId());
                for(BillDetail billDetail :list){
                    billDetailRepository.delete(billDetail);
                    Bill_BillDetail_Mapping bbm = bill_billDetail_mapping_repository.getByBillDetailId(billDetail.getId());
                    bill_billDetail_mapping_repository.delete(bbm);
                }
                for (BillDetailDto billDetailDto : billDto.getAddons()) {
                    BillDetail billDetail = new BillDetail();
                    billDetail.setProduct_id(billDetailDto.getItemId());//id product
                    billDetail.setQuantity(billDetailDto.getQuantity());
                    billDetail = billDetailRepository.save(billDetail);
                    bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
                    Bill_Product_history bill_product_history = new Bill_Product_history();
                    Product product = productRepository.getProductById(billDetailDto.getItemId());
                    bill_product_history.setDate(billDto.getCreateDate());
                    bill_product_history.setBillDetail_id(billDetail.getId());
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
                }
            }
            bill = billRepository.save(bill);
            return true;
        }
        return false;
    }

    @Override
    public String getEndDate(String startDate, int duration) {
        String subStartDate = startDate.substring(0, 10);
        DateTimeFormatter formmat1 = new DateTimeFormatterBuilder().appendPattern("yyyy-MM-dd").toFormatter();
        LocalDate localDateTime = LocalDate.parse(subStartDate, formmat1);
        LocalDate dt = localDateTime.plusDays(duration);
        String formatter = formmat1.format(dt);
        return formatter + "T17:00:00.000Z";
    }

}
