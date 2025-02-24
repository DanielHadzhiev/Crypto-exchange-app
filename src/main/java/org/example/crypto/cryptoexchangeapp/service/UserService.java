package org.example.crypto.cryptoexchangeapp.service;

import org.example.crypto.cryptoexchangeapp.model.dto.LoginDTO;
import org.example.crypto.cryptoexchangeapp.model.dto.RegistrationDTO;
import org.example.crypto.cryptoexchangeapp.model.entity.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserService {
    void addUser(RegistrationDTO registrationDTO);
    Optional<User>getUserByEmail(String email);
    boolean isPasswordMatching(LoginDTO loginDTO);
    void setCurrentUser(User user);
    String getCurrentUser();
}
