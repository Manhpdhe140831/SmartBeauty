package com.swp.sbeauty.controller;


import com.swp.sbeauty.dto.*;
import com.swp.sbeauty.entity.APIResponse;
import com.swp.sbeauty.entity.Category;
import com.swp.sbeauty.entity.SpaBed;
import com.swp.sbeauty.security.jwt.JwtUtils;
import com.swp.sbeauty.service.SpaBedService;
import com.swp.sbeauty.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SpaBedController {
    @Autowired
    private SpaBedService spaBedService;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/bed/getById")
    public ResponseEntity<SpaBedDto> getSpaBedById(@RequestParam(value = "id", required = false) Long id) {
        SpaBedDto result = spaBedService.getById(id);
        return new ResponseEntity<>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/bed/getStaffAndBedFree")
    private ResponseEntity<?> getBedFree(@RequestHeader("Authorization") String authHeader,
                                         @RequestParam(value = "date") String date,
                                         @RequestParam(value = "slot") Long slot) {

        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        if (temp != null) {
            String id = temp.get("id").toString();
            Date expir = temp.getExpiration();
            if (expir.before(new Date())) {
                return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
            } else {
                Long idCheck = Long.parseLong(id);
                StaffBedDto list = spaBedService.findStaffAndBedFree(idCheck, date, slot);
                return new ResponseEntity<>(list, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/bed")
    private ResponseEntity<?> getCategoryPagination(@RequestParam(value = "page", required = false, defaultValue = "1") int page
            , @RequestParam(value = "pageSize", required = false) int pageSize
            , @RequestParam(value = "name", required = false, defaultValue = "") String name) {
        if (name == "" || name == null) {
            SpaBedResponseDto spaBedResponseDto = spaBedService.getAllSpaBed(page - 1, pageSize);
            return new ResponseEntity<>(spaBedResponseDto, HttpStatus.OK);
        } else {
            SpaBedResponseDto spaBedResponseDto = spaBedService.getSpaBedAndSearch(name, page - 1, pageSize);
            return new ResponseEntity<>(spaBedResponseDto, HttpStatus.OK);
        }
    }

    @PostMapping(value = "/bed/create")
    public ResponseEntity<?> saveSlot(@RequestHeader("Authorization") String authHeader,
                                      @RequestBody SpaBedDto spaBedDto) {
        Claims temp = jwtUtils.getAllClaimsFromToken(authHeader.substring(7));
        if (temp != null) {
            Date expir = temp.getExpiration();
            if (expir.before(new Date())) {
                return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
            } else {
                Boolean result = spaBedService.saveBed(spaBedDto, authHeader);
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new ResponseDto<>(401, "Token is expired"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/bed/update")
    public ResponseEntity<?> updateBed(@RequestParam(value = "id") Long id,
                                       @RequestParam(value = "name", required = false) String name,
                                       @RequestParam(value = "branch", required = false) Long branch,
                                       @RequestParam(value = "description", required = false) String description) {
        String check = spaBedService.validateSpaBed(name);
        if (check == "") {
            Boolean result = spaBedService.updateSpaBed(id, name, branch,description);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseDto<>(400, check), HttpStatus.BAD_REQUEST);
        }
    }

}
