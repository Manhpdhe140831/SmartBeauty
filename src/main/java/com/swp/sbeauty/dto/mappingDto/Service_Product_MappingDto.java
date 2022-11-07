package com.swp.sbeauty.dto.mappingDto;

import com.swp.sbeauty.dto.ProductDto;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Service_Product_MappingDto {
    private ProductDto product;
    private long usage;
    private Long productId;

    public Service_Product_MappingDto() {
    }

    public Service_Product_MappingDto(Long productId, Long usage){
        this.productId = productId;
        this.usage = usage;
    }


    public Service_Product_MappingDto(ProductDto product, long usage) {
        this.product = product;
        this.usage = usage;
    }
}
