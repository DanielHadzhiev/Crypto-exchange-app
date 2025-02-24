package org.example.crypto.cryptoexchangeapp.controller;

import jakarta.servlet.http.HttpSession;
import org.example.crypto.cryptoexchangeapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api")
public class HomeController {

    private final UserService userService;

    @Autowired
    public HomeController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/currentUser")
    public Map<String, String> getCurrentUser(HttpSession session) {


        return Map.of("username",this.userService.getCurrentUser());
    }

}
