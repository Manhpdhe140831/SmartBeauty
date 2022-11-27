package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.BillDto;
import com.swp.sbeauty.dto.BillResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BillService {

    public BillResponseDto getBills(Long idCheck,int offSet, int pageSize);

    public BillResponseDto getBillsByCustomer(int offSet, int pageSize, Long id);

    public BillDto getBillById(Long id);

    public Boolean saveBill(BillDto billDto, String authHeader);

    public Boolean updateBill(BillDto billDto, String authHeader);

    public String getEndDate(String startDate, int duration);


}
