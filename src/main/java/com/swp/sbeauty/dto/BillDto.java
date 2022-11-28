package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Bill;
import com.swp.sbeauty.entity.Course;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BillDto {
    private Long id;
    private String code;
    private BranchDto branch;
    private UserDto staff;
    private CustomerDto customer;
    private Long status;
    private String createDate;
    private Double priceBeforeTax;
    private Double priceAfterTax;
    private Long itemId;
    private Object item;
    private String itemType;
    private List<BillDetailDto> addons;
    private Long customerId;
    private Long scheduleId;

    private List<BillDetailDto> items;

    public BillDto(Long id, String code, BranchDto branch, UserDto staff, CustomerDto customer, Long status, String createDate, Double priceBeforeTax, Double priceAfterTax, Object item, List<BillDetailDto> addons, String itemType) {
        this.id = id;
        this.code = code;
        this.branch = branch;
        this.staff = staff;
        this.customer = customer;
        this.status = status;
        this.createDate = createDate;
        this.priceBeforeTax = priceBeforeTax;
        this.priceAfterTax = priceAfterTax;
        this.addons = addons;
        this.itemType = itemType;
        this.item = item;
    }
}
