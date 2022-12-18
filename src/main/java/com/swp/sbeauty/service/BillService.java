package com.swp.sbeauty.service;

import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Table;
import com.lowagie.text.DocumentException;
import com.swp.sbeauty.dto.BillDto;
import com.swp.sbeauty.dto.BillResponseDto;
import org.springframework.data.domain.Page;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

public interface BillService {

    public BillResponseDto getBills(Long idCheck,int offSet, int pageSize);
    public BillResponseDto getBillAndSearch(Long idCheck,String keyword,int offSet, int pageSize);
    public BillResponseDto getBillsByCustomer(int offSet, int pageSize, Long id);

    public BillDto getBillById(Long id);

    public Boolean saveBill(BillDto billDto, String authHeader);

    public Boolean updateBill(BillDto billDto, String authHeader);

    public String getEndDate(String startDate, int duration);


    public void generator(HttpServletResponse response, Long id) throws IOException;

    public ByteArrayInputStream generatorPDF(Long id) throws  IOException;


}
