package com.swp.sbeauty.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseDto<dataType> {
    private dataType data;
    private Integer errorCode;
    private String errorMessage;

    public ResponseDto(dataType data) {
        this.data = data;
    }

    public ResponseDto(Integer errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
