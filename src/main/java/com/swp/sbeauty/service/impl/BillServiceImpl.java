package com.swp.sbeauty.service.impl;


import com.itextpdf.layout.element.Tab;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.alignment.HorizontalAlignment;
import com.lowagie.text.alignment.VerticalAlignment;
import com.lowagie.text.pdf.PdfWriter;
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


import javax.print.attribute.standard.PresentationDirection;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.*;
import java.util.List;
import java.util.concurrent.Phaser;
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

    @Autowired
    ScheduleRepository scheduleRepository;


    @Autowired
    SlotRepository slotRepository;

    @Autowired
    SpaBedRepository spaBedRepository;

    @Autowired
    UserRepository userRepository;

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
    public BillResponseDto getBillAndSearch(Long idCheck, String keyword, int offSet, int pageSize) {
        ModelMapper mapper = new ModelMapper();
        BillResponseDto billResponseDto = new BillResponseDto();
        Pageable pageable = PageRequest.of(offSet, pageSize);
        Long idBranch = customer_branch_mapping_repo.idBranch(idCheck);
        Page<Bill> page = billRepository.getBillAndSearch(idBranch,keyword, pageable);

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
                String itemType = null;
                if (course != null) {
                    itemType = "course";
                    return new BillDto(entity.getId(), entity.getCode(), branchDto, userDto, customerDto, Long.parseLong(entity.getStatus()), entity.getCreateDate(), entity.getPriceBeforeTax(), entity.getPriceAfterTax(), course, addons, itemType);
                } else if (service != null) {
                    itemType = "service";
                    return new BillDto(entity.getId(), entity.getCode(), branchDto, userDto, customerDto, Long.parseLong(entity.getStatus()), entity.getCreateDate(), entity.getPriceBeforeTax(), entity.getPriceAfterTax(), service, addons, itemType);
                } else if(course == null && service ==null){
                    return new BillDto(entity.getId(), entity.getCode(), branchDto, userDto, customerDto, Long.parseLong(entity.getStatus()), entity.getCreateDate(), entity.getPriceBeforeTax(), entity.getPriceAfterTax(), null, addons, itemType);
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
        bill.setStatus("2");
        bill.setPriceBeforeTax(billDto.getPriceBeforeTax());
        bill.setPriceAfterTax(billDto.getPriceAfterTax());
        bill = billRepository.save(bill);
        if (billDto.getScheduleId() != null) {
            schedule_bill_mapping_repository.save(new Schedule_Bill_Mapping(billDto.getScheduleId(), bill.getId()));
            Schedule schedule = scheduleRepository.findById(billDto.getScheduleId()).orElse(null);
            schedule.setStatus("2");
            scheduleRepository.save(schedule);
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
        } else {
            if (billDto.getItemId() != null && billDto.getItemType() != null) {
                if (billDto.getItemType().equalsIgnoreCase("service")) {
                    com.swp.sbeauty.entity.Service service = serviceRepository.getServiceById(billDto.getItemId());
                    Bill_Service_History bill_service_history = new Bill_Service_History();
                    if (service != null) {
                        bill_service_history.setServiceId(service.getId());
                        bill_service_history.setName(service.getName());
                        bill_service_history.setDiscountStart(service.getDiscountStart());
                        bill_service_history.setDiscountEnd(service.getDiscountEnd());
                        bill_service_history.setDiscountPercent(service.getDiscountPercent());
                        bill_service_history.setPrice(service.getPrice());
                        bill_service_history.setDescription(service.getDescription());
                        bill_service_history.setDuration(service.getDuration());
                        bill_service_history.setImage(service.getImage());
                        bill_service_history = bill_service_history_repository.save(bill_service_history);
                        BillDetail billDetail = new BillDetail();
                        billDetail.setService_id(bill_service_history.getId());//id service history
                        billDetail.setQuantity(Long.parseLong("1"));
                        billDetail = billDetailRepository.save(billDetail);
                        bill_billDetail_mapping_repository.save(new Bill_BillDetail_Mapping(bill.getId(), billDetail.getId()));
                        customer_course_mapping_repository.save(new Customer_Course_Mapping(billDetail.getId(), billDto.getCustomerId(), billDto.getItemId(), usingStatus));
                    }
                }
            }
        }
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
        if (bill != null && bill.getStatus().equalsIgnoreCase("1")) {
            TimeZone tz = TimeZone.getTimeZone("UTC");
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'"); // Quoted "Z" to indicate UTC, no timezone offset
            df.setTimeZone(tz);
            String nowAsISO = df.format(new Date());
            bill.setCreateDate(nowAsISO);
            if (billDto.getPriceBeforeTax() != null) {
                bill.setPriceBeforeTax(billDto.getPriceBeforeTax());
            }
            if (billDto.getPriceAfterTax() != null) {
                bill.setPriceAfterTax(billDto.getPriceAfterTax());
            }
            if (billDto.getAddons() != null) {
                //delete from bill detail
                List<BillDetail> list = billDetailRepository.getAddons(billDto.getId());
                for (BillDetail billDetail : list) {
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

    @Override
    public void generator(HttpServletResponse response, Long id) throws IOException {
        Double totalBillProduct = 0.0;
        BillDto billDto = this.getBillById(id);
        CourseDto course = null;
        ServiceDto service = null;
        ProductDto product = null;
        List<BillDetailDto> addons = new ArrayList<>();
        List<BillDetail> billDetailList = billDetailRepository.getBillDetailByBillId(id);
        for (BillDetail itemb : billDetailList
        ) {
            if (itemb.getService_id() != null) {
                Bill_Service_History bill_service_history = bill_service_history_repository.getBill_Service_HistoryById(itemb.getService_id());
                service = new ServiceDto(bill_service_history);
            }
            if (itemb.getCourse_id() != null) {
                Bill_Course_History bill_course_history = bill_course_history_repository.getBill_Course_HistoriesById(itemb.getCourse_id());
                course = new CourseDto(bill_course_history);
            }
            if (itemb.getProduct_id() != null) {
                Bill_Product_history bill_product_history = billDetailRepository.getBillProductHistory(itemb.getId());
                product = new ProductDto(bill_product_history);
                addons.add(new BillDetailDto(product, itemb.getQuantity()));
            }

        }
        if (billDto != null) {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, response.getOutputStream());
            document.open();
            Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontTitle.setSize(24);
            fontTitle.setColor(Color.WHITE);
            Font fontPar = FontFactory.getFont(FontFactory.TIMES_ROMAN);
            fontPar.setSize(14);
            Font fontSubTitle = FontFactory.getFont(FontFactory.TIMES_ROMAN);
            fontSubTitle.setSize(18);
            Font fontTitleCustomer = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontTitleCustomer.setSize(13);
            Table tableHeader = new Table(2);
            Cell cellHeaderTitle = new Cell(new Phrase("Invoice Order", fontTitle));
            Cell cellHeaderBranch = new Cell(new Paragraph("Sbeauty" + "\n" + "Branch Name: " + billDto.getBranch().getName() + "\n" + "Phone Number: " + billDto.getBranch().getPhone() + "\n" + "Address: " + billDto.getBranch().getAddress(), fontPar));
            cellHeaderTitle.setBackgroundColor(Color.LIGHT_GRAY);
            cellHeaderTitle.setVerticalAlignment(VerticalAlignment.CENTER);
            cellHeaderTitle.setHorizontalAlignment(HorizontalAlignment.CENTER);
            cellHeaderBranch.setBackgroundColor(Color.LIGHT_GRAY);
            cellHeaderTitle.setBorderColor(Color.LIGHT_GRAY);
            cellHeaderBranch.setBorderColor(Color.LIGHT_GRAY);
            tableHeader.setPadding(5);
            tableHeader.setBorderColor(Color.LIGHT_GRAY);
            tableHeader.setBorderColorBottom(Color.BLACK);
            tableHeader.addCell(cellHeaderTitle);
            tableHeader.addCell(cellHeaderBranch);
            tableHeader.setWidth(100f);
            tableHeader.setSpacing(10);
            document.add(tableHeader);

            Paragraph br = new Paragraph("\n\n");
            document.add(br);

            String customerName = billDto.getCustomer().getName();
            String customerPhone = billDto.getCustomer().getPhone();
            String customerAddress = billDto.getCustomer().getAddress();
            String itemType = billDto.getItemType();

            Table tableCustomer = new Table(2, 3);
            tableCustomer.setWidth(50f);
            Cell customerNameCell = new Cell(new Phrase("Customer Name:", fontTitleCustomer));
            Cell customerNameInformation = new Cell(customerName);
            Cell customerPhoneCell = new Cell(new Phrase("Phone Number:", fontTitleCustomer));
            Cell customerPhoneInformation = new Cell(customerPhone);
            Cell customerAddressCell = new Cell(new Phrase("Address:", fontTitleCustomer));
            Cell customerAddressInformation = new Cell(customerAddress);

            customerNameCell.setBorderColor(Color.WHITE);
            customerNameInformation.setBorderColor(Color.WHITE);
            customerPhoneCell.setBorderColor(Color.WHITE);
            customerPhoneInformation.setBorderColor(Color.WHITE);
            customerAddressCell.setBorderColor(Color.WHITE);
            customerAddressInformation.setBorderColor(Color.WHITE);

            customerPhoneCell.setWidth(5f);
            customerNameInformation.setWidth(5f);
            customerPhoneCell.setWidth(5f);
            customerPhoneInformation.setWidth(5f);
            customerAddressCell.setWidth(5f);
            customerAddressInformation.setWidth(5f);

            tableCustomer.addCell(customerNameCell);
            tableCustomer.addCell(customerNameInformation);
            tableCustomer.addCell(customerPhoneCell);
            tableCustomer.addCell(customerPhoneInformation);
            tableCustomer.addCell(customerAddressCell);
            tableCustomer.addCell(customerAddressInformation);
            tableCustomer.setBorderColor(Color.WHITE);
            tableCustomer.setBorderColorBottom(Color.WHITE);
            tableCustomer.setBackgroundColor(Color.WHITE);
            tableCustomer.setPadding(2f);
            document.add(tableCustomer);
            Paragraph lineBr = new Paragraph("----------------------------------------------------------------------------------------------------------------------------------");
            lineBr.setAlignment(Element.ALIGN_CENTER);
          document.add(lineBr);
//            document.add(br);
            if ("service".equalsIgnoreCase(itemType)||"course".equalsIgnoreCase(itemType)) {
                Paragraph subTitle1 = new Paragraph("Service/Course", fontSubTitle);
                subTitle1.setAlignment(Element.ALIGN_CENTER);
                document.add(subTitle1);
            }
            Font fontTitleTable = FontFactory.getFont(FontFactory.TIMES_ROMAN);
            fontTitleTable.setColor(Color.WHITE);
            fontTitleTable.setSize(15);
            Table table = new Table(5, 4);
            table.setPadding(5f);
            table.setWidth(100f);
            table.setBorderColor(Color.GRAY);
            if ("service".equalsIgnoreCase(itemType)) {
                Cell serviceCell = new Cell(new Phrase("Service", fontTitleTable));
                serviceCell.setBorderColor(Color.GRAY);
                serviceCell.setBackgroundColor(Color.PINK);
                table.addCell(serviceCell);
                Cell serviceDes = new Cell(new Phrase("Description", fontTitleTable));
                serviceDes.setBorderColor(Color.GRAY);
                serviceDes.setBackgroundColor(Color.PINK);
                table.addCell(serviceDes);
                Cell duration = new Cell(new Phrase("Duration", fontTitleTable));
                duration.setBorderColor(Color.GRAY);
                duration.setBackgroundColor(Color.PINK);
                table.addCell(duration);
                Cell priceCell = new Cell(new Phrase("Price", fontTitleTable));
                priceCell.setBorderColor(Color.GRAY);
                priceCell.setBackgroundColor(Color.PINK);
                table.addCell(priceCell);
                Cell total = new Cell(new Phrase("Total Amount", fontTitleTable));
                total.setBorderColor(Color.GRAY);
                total.setBackgroundColor(Color.pink);
                table.addCell(total);
                table.addCell(service.getName());
                if (service.getDescription().isEmpty() || service.getDescription() == null) {
                    table.addCell("None");
                } else {
                    table.addCell(service.getDescription());
                }
                table.addCell(service.getDuration().toString());
                table.addCell(service.getPrice().toString());
                table.addCell(service.getPrice().toString());
            }
            if ("course".equalsIgnoreCase(itemType)) {
                Cell courseCell = new Cell(new Phrase("Course", fontTitleTable));
                courseCell.setBorderColor(Color.GRAY);
                courseCell.setBackgroundColor(Color.PINK);
                table.addCell(courseCell);
                Cell totalSession = new Cell(new Phrase("Total Session", fontTitleTable));
                totalSession.setBorderColor(Color.GRAY);
                totalSession.setBackgroundColor(Color.PINK);
                table.addCell(totalSession);
                Cell session = new Cell(new Phrase("Seesion", fontTitleTable));
                session.setBorderColor(Color.GRAY);
                session.setBackgroundColor(Color.PINK);
                table.addCell(session);
                Cell priceCell = new Cell(new Phrase("Price", fontTitleTable));
                priceCell.setBorderColor(Color.GRAY);
                priceCell.setBackgroundColor(Color.PINK);
                table.addCell(priceCell);
                Cell total = new Cell(new Phrase("Total Amount", fontTitleTable));
                total.setBorderColor(Color.GRAY);
                total.setBackgroundColor(Color.pink);
                table.addCell(total);
                table.addCell(course.getName());
                table.addCell(course.getTimeOfUse().toString());
                if (course.getCount() == null) {
                    table.addCell("None");
                } else {
                    table.addCell(course.getCount().toString());
                }
                table.addCell(course.getPrice().toString());
                table.addCell(course.getPrice().toString());

            }
            document.add(table);
            if (!addons.isEmpty()){
            Table productTable = new Table(5, addons.size());
            productTable.setWidth(100f);
            Paragraph subTitle2 = new Paragraph("Product", fontSubTitle);
            subTitle2.setAlignment(Element.ALIGN_CENTER);
            document.add(subTitle2);
            productTable.setPadding(5);
            Cell productCell = new Cell(new Phrase("Product", fontTitleTable));
            productCell.setBackgroundColor(Color.BLUE);
            Cell description = new Cell(new Phrase("Discount Percent", fontTitleTable));
            description.setBackgroundColor(Color.BLUE);
            Cell quantityCell = new Cell(new Phrase("Quantity", fontTitleTable));
            quantityCell.setBackgroundColor(Color.BLUE);
            Cell priceCell = new Cell(new Phrase("Price", fontTitleTable));
            priceCell.setBackgroundColor(Color.BLUE);
            Cell totalProductAmount = new Cell(new Phrase("Total amount", fontTitleTable));
            totalProductAmount.setBackgroundColor(Color.BLUE);
            productTable.addCell(productCell);
            productTable.addCell(description);
            productTable.addCell(quantityCell);
            productTable.addCell(priceCell);
            productTable.addCell(totalProductAmount);
            productTable.setBorderColor(Color.GRAY);
            if (addons != null || !addons.isEmpty()) {
                for (BillDetailDto item : addons
                ) {
                    productTable.addCell(item.getItem().getName());
                    if (item.getItem().getDescription().isEmpty() || item.getItem().getDescription() == null) {
                        productTable.addCell("None");
                    } else {
                        productTable.addCell(item.getItem().getDiscountPercent().toString());
                    }
                    productTable.addCell(item.getQuantity().toString());
                    productTable.addCell(item.getItem().getPrice().toString());
                    Double discountPercent = item.getItem().getDiscountPercent();
                    Double totalAmount = 0.0;
                    if (discountPercent.toString().equalsIgnoreCase("0.0")){
                        totalAmount = item.getQuantity().doubleValue() * item.getItem().getPrice();
                    }
                    if (discountPercent != 0.0){
                        totalAmount = item.getQuantity().doubleValue() * item.getItem().getPrice()* (100-discountPercent)*0.01;
                    }
                    totalBillProduct += totalAmount;
                    productTable.addCell(totalAmount.toString());
                }
            }
            if (addons.isEmpty()) {
                productTable.addCell("");
                productTable.addCell("");
                productTable.addCell("");
                productTable.addCell("");
                productTable.addCell("");
            }
            document.add(productTable);
        }
            document.add(lineBr);

            Schedule schedule = null;
            Long scheduleId = schedule_bill_mapping_repository.getScheduleByBill(billDto.getId());
            if (scheduleId != null){
                schedule = scheduleRepository.findById(scheduleId).orElse(null);
            }

            if (schedule != null){
                Slot slot = null;
                SpaBed bed = null;
                Users users = null;
               if (schedule.getSlotId() != null){
                   slot = slotRepository.findById(schedule.getSlotId()).orElse(null);
               }
               if (schedule.getBedId() != null){
                   bed = spaBedRepository.getSpaBedById(schedule.getBedId());
               }
               if (schedule.getTechnicalStaffId() != null){
                   users = userRepository.getUsersById(schedule.getTechnicalStaffId()).orElse(null);
               }
                String scheduleTitle = "Schedule";
                Paragraph scheduleParagraph = new Paragraph("\n" + scheduleTitle, fontSubTitle);
                scheduleParagraph.setAlignment(Element.ALIGN_CENTER);
                document.add(scheduleParagraph);
                Table scheduleTable = new Table(4,2);
                scheduleTable.setPadding(5f);
                scheduleTable.setWidth(100f);
                String dateCellContent = "Date";
                String slotCellContent = "Timeline";
                String bedCellContent = "Bed";
                String techStaffCellContent = "Technical Staff";
                Cell dateCell = new Cell(new Phrase(dateCellContent, fontTitleTable));
                dateCell.setBackgroundColor(Color.ORANGE);
                Cell slotCell = new Cell(new Phrase(slotCellContent, fontTitleTable));
                slotCell.setBackgroundColor(Color.ORANGE);
                Cell bedCell = new Cell(new Phrase(bedCellContent, fontTitleTable));
                bedCell.setBackgroundColor(Color.ORANGE);
                Cell techCell = new Cell(new Phrase(techStaffCellContent, fontTitleTable));
                techCell.setBackgroundColor(Color.ORANGE);
                scheduleTable.addCell(dateCell);
                scheduleTable.addCell(slotCell);
                scheduleTable.addCell(bedCell);
                scheduleTable.addCell(techCell);

                scheduleTable.addCell(schedule.getDate().substring(0,10));
                if (slot != null){
                    scheduleTable.addCell(slot.getTimeline());
                }else{
                    scheduleTable.addCell("");
                }

                if (bed != null){
                    scheduleTable.addCell(bed.getName());
                }else{
                    scheduleTable.addCell("");
                }

                if (users != null){
                    scheduleTable.addCell(users.getName());
                }else{
                    scheduleTable.addCell("");
                }



                document.add(scheduleTable);
                document.add(lineBr);
               // document.add(br);

            }
            Paragraph footerTitle = null;
            Paragraph footerContent = null;

            if (billDto.getItemType() == null) {

                footerTitle = new Paragraph("Payment(VND)", fontSubTitle);
                footerTitle.setAlignment(Paragraph.ALIGN_RIGHT);
                footerContent = new Paragraph("Price: " + totalBillProduct.toString()
                        + "\n" + "Tax: 8%"
                        + "\n" + "Total Amount: " + billDto.getPriceAfterTax());
                footerContent.setAlignment(Paragraph.ALIGN_RIGHT);
            }
            if (billDto.getItemType().equalsIgnoreCase("service")){
                footerTitle = new Paragraph("Payment(VND)", fontSubTitle);
                footerTitle.setAlignment(Paragraph.ALIGN_RIGHT);
                Double totalServiceBill = 0.0;
                if (service.getDiscountPercent() != null){
                    totalServiceBill = service.getPrice()*(100.0-service.getDiscountPercent())*0.01;
                }
                if (service.getDiscountPercent() == null){
                    totalServiceBill = service.getPrice();
                }

                footerContent = new Paragraph("Price: " + totalServiceBill + totalBillProduct
                        + "\n" + "Tax: 8%"
                        + "\n" + "Total Amount: " + billDto.getPriceAfterTax());
                footerContent.setAlignment(Paragraph.ALIGN_RIGHT);
            }

            if (billDto.getItemType().equalsIgnoreCase("course")){
                footerTitle = new Paragraph("Payment(VND)", fontSubTitle);
                footerTitle.setAlignment(Paragraph.ALIGN_RIGHT);
                Double totalCourseBill = 0.0;
                if (course.getDiscountPercent() != null){
                    totalCourseBill = course.getPrice()*(100.0-course.getDiscountPercent())*0.01;
                }
                if (course.getDiscountPercent() == null){
                    totalCourseBill = service.getPrice();
                }

                footerContent = new Paragraph("Price: " + totalCourseBill + totalBillProduct
                        + "\n" + "Tax: 8%"
                        + "\n" + "Total Amount: " + billDto.getPriceAfterTax());
                footerContent.setAlignment(Paragraph.ALIGN_RIGHT);
            }


            document.add(footerTitle);
            document.add(footerContent);

            document.close();
        }
    }
}
