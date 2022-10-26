package com.swp.sbeauty.dto;

import com.swp.sbeauty.entity.Branch;
import com.swp.sbeauty.entity.Product;
import com.swp.sbeauty.entity.Service;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class ServiceDto {
    private Long id;
    private String codeService;
    private String nameService;
    private Date startDiscount;
    private Date endDiscount;
    private Double discountPercent;
    private double priceService;
    private String description;
    private long minutesNumber;
    private String imageService;

    private Set<BranchDto> branch;
    private Set<ProductDto> product;


    public ServiceDto(Service service) {

        if (null != service) {
            this.setId(service.getId());
            this.setCodeService(service.getCodeService());
            this.setNameService(service.getNameService());
            this.setStartDiscount(service.getStartDiscount());
            this.setEndDiscount(service.getEndDiscount());
            this.setPriceService(service.getPriceService());
            this.setDescription(service.getDescription());
            this.setMinutesNumber(service.getMinutesNumber());
            this.setImageService(service.getImageService());

            if (service.getBranch() != null) {
                this.branch = new HashSet<>();
                for (Branch item : service.getBranch()) {
                    this.branch.add(new BranchDto(item));
                }
            }
            if (service.getProduct() != null) {
                this.product = new HashSet<>();
                for (Product itemP : service.getProduct()) {
                    this.product.add(new ProductDto(itemP));
                }
            }


        }
    }
}

