package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.ServiceDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ServiceSpaService {

    Page<ServiceDto> getListServiceSpa(int offset, int page);
}
