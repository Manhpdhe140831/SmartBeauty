package com.swp.sbeauty.entity;

import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Table;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfTable;
import com.swp.sbeauty.dto.BillDto;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class PDFGenerator {

    public String titleInvoice = "Hóa Đơn";
    String customerName ="khách hàng";
    String phone ="Số Điện Thoại";

    public PDFGenerator(){

    }
    public String getTitleInvoice() {
        return titleInvoice;
    }

    public void setTitleInvoice(String titleInvoice) {
        this.titleInvoice = titleInvoice;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
