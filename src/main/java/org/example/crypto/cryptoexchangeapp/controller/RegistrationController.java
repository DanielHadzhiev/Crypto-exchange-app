package org.example.crypto.cryptoexchangeapp.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.example.crypto.cryptoexchangeapp.model.dto.LoginDTO;
import org.example.crypto.cryptoexchangeapp.model.dto.RegistrationDTO;
import org.example.crypto.cryptoexchangeapp.model.entity.User;
import org.example.crypto.cryptoexchangeapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
@RequestMapping("/api")
public class RegistrationController {

    private final UserService userService;

    @Autowired
    public RegistrationController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/registration")
    public ResponseEntity<Map<String, String>> registerUser(@Valid @RequestBody RegistrationDTO registrationDto,
                                                            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        Map<String, String> response = new HashMap<>();
        this.userService.addUser(registrationDto);
        response.put("message", "User registered successfully.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> loginUser(@Valid @RequestBody LoginDTO loginDTO,
                                                        BindingResult bindingResult,
                                                        HttpSession session){

        Optional<User> optionalUser= userService.getUserByEmail(loginDTO.getEmail());

        Map<String, String> response = new HashMap<>();

        if (optionalUser.isEmpty()) {
            response.put("email", "* No account found for this email.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        User user = optionalUser.get();

        // Check if the provided password matches the stored hashed password
        if (!this.userService.isPasswordMatching(loginDTO)) {
            response.put("password", "* Invalid password.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        this.userService.setCurrentUser(user);
        response.put("message", "Login successful.");
        return ResponseEntity.ok(response);
    }

}
