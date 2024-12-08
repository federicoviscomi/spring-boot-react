package com.secure.notes.controllers;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SignInResponse {
    private String jwtToken;
    private String username;
    private List<String> roles;

    public SignInResponse(String username, List<String> roles, String jwtToken) {
        this.username = username;
        this.roles = roles;
        this.jwtToken = jwtToken;
    }
}