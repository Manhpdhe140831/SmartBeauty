package com.swp.sbeauty.service.impl;

import com.swp.sbeauty.dto.ServiceGroupDto;
import com.swp.sbeauty.entity.ServiceGroup;
import com.swp.sbeauty.repository.ServiceGroupRepository;
import com.swp.sbeauty.service.ServiceGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class ServiceGroupServiceImpl implements ServiceGroupService {
    @Autowired
    private ServiceGroupRepository repository;
    @Override
    public List<ServiceGroupDto> getAll() {
        List<ServiceGroupDto> list = new ArrayList<>();
        List<ServiceGroup> listService = repository.findAll();
        for (ServiceGroup item: listService
             ) {
            list.add(new ServiceGroupDto(item));
        }
        return list;
    }

    @Override
    public ServiceGroupDto updateServiceGroup(ServiceGroupDto serviceGroupDto, Long id) {
        if (null != serviceGroupDto){
            ServiceGroup serviceGroup = null;
            if (null != id){
                Optional<ServiceGroup> optional = repository.findById(id);
                if (null != optional){
                    serviceGroup = optional.get();
                }
            }
            if (null != serviceGroup){
                serviceGroup.setId(serviceGroupDto.getId());
                serviceGroup.setName(serviceGroupDto.getName());
                serviceGroup = repository.save(serviceGroup);
                return new ServiceGroupDto(serviceGroup);
            }
        }
        return null;
    }

    @Override
    public ServiceGroupDto saveServiceGroup(ServiceGroupDto serviceGroupDto) {
        if (null != serviceGroupDto){
            ServiceGroup serviceGroup = new ServiceGroup();
            serviceGroup.setId(serviceGroup.getId());
            serviceGroup.setName(serviceGroup.getName());
            if (null != serviceGroup){
                return new ServiceGroupDto(serviceGroup);
            }
        }
        return null;
    }

    @Override
    public Boolean removeServiceGroup(Long id) {
        ServiceGroup serviceGroup = null;
        Optional<ServiceGroup> optional = repository.findById(id);
        if (optional.isPresent()){
            serviceGroup = optional.get();
        }
        if (null != serviceGroup){
            repository.delete(serviceGroup);
            return true;
        }
        return false;
    }

    @Override
    public List<ServiceGroupDto> searchServiceGroupByName(String serviceGroupName) {
        List<ServiceGroupDto> list = new ArrayList<>();
        List<ServiceGroup> listServiceGroups = repository.searchByName(serviceGroupName);
        for (ServiceGroup item: listServiceGroups
             ) {
            list.add(new ServiceGroupDto(item));
        }
        return list;
    }
}
