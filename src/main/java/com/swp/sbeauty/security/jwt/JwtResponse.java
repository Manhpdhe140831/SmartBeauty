package com.swp.sbeauty.security.jwt;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class JwtResponse {
    private String accessToken;

    public JwtResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}

