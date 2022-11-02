package com.swp.sbeauty.dto.mappingDto;

import com.swp.sbeauty.dto.ProductDto;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Service_Product_MappingDto {
    private ProductDto productDto;
    private long usage;

    public Service_Product_MappingDto() {
    }

    public Service_Product_MappingDto(ProductDto productDto, long usage) {
        this.productDto = productDto;
        this.usage = usage;
    }
}
