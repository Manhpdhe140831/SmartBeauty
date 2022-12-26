package com.swp.sbeauty.service;

import com.swp.sbeauty.dto.CustomerDto;
import com.swp.sbeauty.dto.SlotDto;
import com.swp.sbeauty.dto.StaffBedDto;
import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Slot;

import java.util.List;

public interface SlotService {
    List<SlotDto> getAllSlot();

    Boolean saveSlot(SlotDto slotDto, String authHeader);

}
