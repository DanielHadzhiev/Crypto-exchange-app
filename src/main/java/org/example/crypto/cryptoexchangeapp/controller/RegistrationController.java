package org.example.crypto.cryptoexchangeapp.controller;

import jakarta.validation.Valid;
import org.example.crypto.cryptoexchangeapp.model.dto.RegistrationDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class RegistrationController {


    @PostMapping("/registration")
    public ResponseEntity<Map<String, String>> registerUser(@Valid @RequestBody RegistrationDTO registrationDto) {
        Map<String, String> response = new HashMap<>();

        // Basic validation checks
        if (registrationDto.getUsername() == null || registrationDto.getUsername().isEmpty()) {
            response.put("username", "Username is required.");
        }
        if (registrationDto.getEmail() == null || registrationDto.getEmail().isEmpty()) {
            response.put("email", "Email is required.");
        }
        if (registrationDto.getPassword() == null || registrationDto.getPassword().isEmpty()) {
            response.put("password", "Password is required.");
        }
        if (registrationDto.getConfirmPassword() == null || registrationDto.getConfirmPassword().isEmpty()) {
            response.put("confirmPassword", "Confirm Password is required.");
        }
        if (!registrationDto.getPassword().equals(registrationDto.getConfirmPassword())) {
            response.put("confirmPassword", "Passwords do not match.");
        }

        // If there are errors, return them with a 400 Bad Request status
        if (!response.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        response.put("message", "User registered successfully.");
        return ResponseEntity.ok(response);
    }

}
