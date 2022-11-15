package com.swp.sbeauty.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseDto<dataType> {
    private dataType data;
    private Integer status;
    private String error;

    public ResponseDto(dataType data) {
        this.data = data;
    }

    public ResponseDto(Integer status, String error) {
        this.status = status;
        this.error = error;
    }
}
