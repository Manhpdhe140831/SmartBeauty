package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Bill;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.crypto.Data;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
public class BillDto {
    private Long id;
    private String code;
    private BranchDto branch;
    private UserDto staff;
    private CustomerDto customer;
    private String status;
    private Date createDate;
    private Double priceBeforeTax;
    private Double priceAfterTax;

    public BillDto(Long id, String code,BranchDto branch, UserDto staff, CustomerDto customer, String status, Date createDate, Double priceBeforeTax, Double privateAfterTax) {
        this.id = id;
        this.code = code;
        this.branch = branch;
        this.staff = staff;
        this.customer = customer;
        this.status = status;
        this.createDate = createDate;
        this.priceBeforeTax = priceBeforeTax;
        this.priceAfterTax = privateAfterTax;
    }
    public BillDto(Bill bill){
        this.setId(bill.getId());
        this.setCode(bill.getCode());
        this.setStatus(bill.getStatus());
        this.setCreateDate(bill.getDate());
        this.setPriceBeforeTax(bill.getMoneyPerTax());
        this.setPriceAfterTax(bill.getMoneyAfterTax());
    }

}
