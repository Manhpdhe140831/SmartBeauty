package com.swp.sbeauty.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.dto.mappingDto.Service_Product_MappingDto;
import com.swp.sbeauty.entity.*;
import com.swp.sbeauty.entity.mapping.Customer_Course_Mapping;
import com.swp.sbeauty.repository.BranchRepository;
import com.swp.sbeauty.repository.CourseRepository;
import com.swp.sbeauty.repository.ProductRepository;
import com.swp.sbeauty.repository.ServiceRepository;
import com.swp.sbeauty.repository.mappingRepo.*;
import com.swp.sbeauty.service.ServiceSpaService;
import org.aspectj.weaver.NewConstructorTypeMunger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServiceSpaServiceImpl implements ServiceSpaService {

    @Autowired
    ServiceRepository repository;
    @Autowired
    BranchRepository branchRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    Bill_Service_History_Repository bill_service_history_repository;
    @Autowired
    Service_Product_Mapping_Repository service_product_mapping_repository;
    @Autowired
    Service_Branch_Mapping_Repo service_branch_mapping_repo;
    @Autowired
    Bill_Course_History_Repository bill_course_history_repository;
    @Autowired
    Customer_Course_Mapping_Repository customer_course_mapping_repository;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    private ModelMapper mapper;

    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

    @Override
    public Boolean save(String name, String discountStart, String discountEnd, Double discountPercent, Double price, String description, Long duration, MultipartFile image, String products) {
        try {
            Service service = new Service();
            service.setName(name);
            if (discountStart != null) {
                service.setDiscountStart(discountStart);
            }
            if (discountEnd != null) {
                service.setDiscountEnd(discountEnd);
            }
            if (discountPercent != null) {
                service.setDiscountPercent(discountPercent);
            }
            service.setPrice(price);
            if (description != null) {
                service.setDescription(description);
            }
            service.setDuration(duration);
            if (image != null) {
                Path staticPath = Paths.get("static");
                Path imagePath = Paths.get("images");
                if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                    Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
                }
                Path file = CURRENT_FOLDER.resolve(staticPath)
                        .resolve(imagePath).resolve(image.getOriginalFilename());
                try (OutputStream os = Files.newOutputStream(file)) {
                    os.write(image.getBytes());
                }
                service.setImage(image.getOriginalFilename());
            }
            service = serviceRepository.save(service);

            if (products != null) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
                List<Service_Product_MappingDto> mappingDto = mapper.readValue(products, new TypeReference<List<Service_Product_MappingDto>>() {
                });
                for (Service_Product_MappingDto mapping : mappingDto) {
                    service_product_mapping_repository.save(new Service_Product_mapping(service.getId(), mapping.getProductId(), mapping.getUsage()));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public ServiceDto getServiceById(Long id) {
        if (id != null) {
            Service service = serviceRepository.getServiceById(id);
            List<Service_Product_mapping> listMapping = service_product_mapping_repository.getMappingByServiceId(id);
            List<Service_Product_MappingDto> list = new ArrayList<>();
            for (Service_Product_mapping mapping : listMapping) {
                Product product = productRepository.getProductById(mapping.getProduct_id());
                list.add(new Service_Product_MappingDto(new ProductDto(product), mapping.getProductUsage()));
            }
            ServiceDto serviceDto = new ServiceDto(id, service.getName(), service.getDiscountStart(), service.getDiscountEnd(), service.getDiscountPercent(), service.getPrice(), service.getDescription(), service.getDuration(), service.getImage(), list);
            return serviceDto;
        } else {
            return null;
        }
    }

    @Override
    public ServiceResponseDto getListServicePaginationAndSearch(String name, int pageNo, int pageSize) {
        ServiceResponseDto serviceResponseDto = new ServiceResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Service> page = repository.getListServiceWithPaginationAndSearch(name, pageable);
        List<ServiceDto> serviceDtos = page
                .stream()
                .map(course -> mapper.map(course, ServiceDto.class))
                .collect(Collectors.toList());
        for (ServiceDto serviceDto : serviceDtos) {
            List<Service_Product_mapping> listMapping = service_product_mapping_repository.getMappingByServiceId(serviceDto.getId());
            List<Service_Product_MappingDto> list = new ArrayList<>();
            for (Service_Product_mapping mapping : listMapping) {
                Product product = productRepository.getProductById(mapping.getProduct_id());
                list.add(new Service_Product_MappingDto(new ProductDto(product), mapping.getProductUsage()));
            }
            serviceDto.setProducts(list);
        }
        serviceResponseDto.setData(serviceDtos);
        serviceResponseDto.setTotalElement(page.getTotalElements());
        serviceResponseDto.setTotalPage(page.getTotalPages());
        serviceResponseDto.setPageIndex(pageNo + 1);

        return serviceResponseDto;
    }

    @Override
    public ServiceResponseDto getAll(int pageNo, int pageSize) {
        ServiceResponseDto serviceResponseDto = new ServiceResponseDto();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Service> page = repository.findAll(pageable);

        List<ServiceDto> serviceDtos = page
                .stream()
                .map(course -> mapper.map(course, ServiceDto.class))
                .collect(Collectors.toList());
        for (ServiceDto serviceDto : serviceDtos) {
            List<Service_Product_mapping> listMapping = service_product_mapping_repository.getMappingByServiceId(serviceDto.getId());
            List<Service_Product_MappingDto> list = new ArrayList<>();
            for (Service_Product_mapping mapping : listMapping) {
                Product product = productRepository.getProductById(mapping.getProduct_id());
                list.add(new Service_Product_MappingDto(new ProductDto(product), mapping.getProductUsage()));
            }
            serviceDto.setProducts(list);
        }
        serviceResponseDto.setData(serviceDtos);
        serviceResponseDto.setTotalPage(page.getTotalPages());
        serviceResponseDto.setTotalElement(page.getTotalElements());
        serviceResponseDto.setPageIndex(pageNo);
        return serviceResponseDto;
    }

    @Override
    public String validateService(String name, String discountStart, String discountEnd, Double discountPercent) {
        String result = "";
        if (discountStart != null || discountEnd != null) {
            if (discountPercent == null) {
                result += "Discount percent cannot be null. ";
            }
        }
        if (serviceRepository.existsByName(name)) {
            result += "Name already exists in data. ";
        }
        return result;
    }

    @Override
    public ServiceCourseBuyedDto findProductCourseService(String keyword, Long idCustomer) {
        List<CourseDto> courseDtos = new ArrayList<>();
        List<Bill_Course_History> list = bill_course_history_repository.getCourseHistory(keyword);
        Customer_Course_Mapping ccm = null;
        for (Bill_Course_History i : list) {
            ccm = customer_course_mapping_repository.getCustomerCourse(idCustomer, i.getId());
            if (ccm != null) {
                break;
            }
        }
        if (ccm != null) {
            Bill_Course_History history = bill_course_history_repository.getBill_Course_HistoriesById(ccm.getCourse_id());
            CourseDto courseDto = new CourseDto(history.getId(), history.getName(), history.getPrice(), history.getDuration(), history.getTimeOfUse(), history.getDiscountStart(), history.getDiscountEnd(), history.getDiscountPercent(), history.getImage(), true, history.getDescription());
            List<Course> courses = courseRepository.getCourseExpelId(history.getCourse_id(), keyword);
            courseDtos.add(courseDto);
            for (Course course : courses) {
                courseDtos.add(new CourseDto(false, course));
            }
        }
        List<Service> services = serviceRepository.findService(keyword);
        List<ServiceDto> serviceDtos = new ArrayList<>();
        for (Service service : services) {
            serviceDtos.add(new ServiceDto(service));
        }
        ServiceCourseBuyedDto result = new ServiceCourseBuyedDto(serviceDtos, courseDtos);
        return result;
    }

    @Override
    public Boolean update(Long id, String name, String discountStart, String discountEnd, Double discountPercent, Double price, String description, Long duration, MultipartFile image, String products) {
        try {
            Service service = serviceRepository.getServiceById(id);
            if (name != null) {
                service.setName(name);
            }
            if (discountStart != null) {
                service.setDiscountStart(discountStart);
            }
            if (discountEnd != null) {
                service.setDiscountEnd(discountEnd);
            }
            if (discountPercent != null) {
                service.setDiscountPercent(discountPercent);
            }
            if (price != null) {
                service.setPrice(price);
            }
            if (description != null) {
                service.setDescription(description);
            }
            if (duration != null) {
                service.setDuration(duration);
            }
            if (image != null) {
                Path staticPath = Paths.get("static");
                Path imagePath = Paths.get("images");
                if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                    Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
                }
                Path file = CURRENT_FOLDER.resolve(staticPath)
                        .resolve(imagePath).resolve(image.getOriginalFilename());
                try (OutputStream os = Files.newOutputStream(file)) {
                    os.write(image.getBytes());
                }
                //remove old image
                Path pathOld = CURRENT_FOLDER.resolve(staticPath)
                        .resolve(imagePath).resolve(service.getImage());
                File fileOld = new File(pathOld.toString());
                if (!fileOld.delete()) {
                    throw new IOException("Unable to delete file: " + fileOld.getAbsolutePath());
                }
                service.setImage(image.getOriginalFilename());
            }
            serviceRepository.save(service);
            if (products != null) {
                List<Service_Product_mapping> listMapping = service_product_mapping_repository.getMappingByServiceId(id);
                for (Service_Product_mapping mapping : listMapping) {
                    service_product_mapping_repository.deleteById(mapping.getId());
                }
                ObjectMapper mapper = new ObjectMapper();
                mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
                List<Service_Product_MappingDto> mappingDto = mapper.readValue(products, new TypeReference<List<Service_Product_MappingDto>>() {
                });
                for (Service_Product_MappingDto mapping : mappingDto) {
                    service_product_mapping_repository.save(new Service_Product_mapping(id, mapping.getProductId(), mapping.getUsage()));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}


