package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Service;
import com.swp.sbeauty.entity.Slot;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SlotDto {
    private Long id;
    private String name;
    private String timeline;

    public SlotDto() {
    }

    public SlotDto(Long id, String name, String timeline) {
        this.id = id;
        this.name = name;
        this.timeline = timeline;
    }
    public SlotDto(Slot slot) {

        if (null != slot) {
            this.setId(slot.getId());
            this.setName(slot.getName());
            this.setTimeline(slot.getTimeline());
        }
    }
}
