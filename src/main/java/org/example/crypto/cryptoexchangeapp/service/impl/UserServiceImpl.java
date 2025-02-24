package org.example.crypto.cryptoexchangeapp.service.impl;

import org.example.crypto.cryptoexchangeapp.model.dto.LoginDTO;
import org.example.crypto.cryptoexchangeapp.model.dto.RegistrationDTO;
import org.example.crypto.cryptoexchangeapp.model.entity.User;
import org.example.crypto.cryptoexchangeapp.repos.UserRepository;
import org.example.crypto.cryptoexchangeapp.service.UserService;
import org.example.crypto.cryptoexchangeapp.session.CurrentUser;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final CurrentUser loggedUser;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           ModelMapper modelMapper,
                           CurrentUser loggedUser) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.loggedUser = loggedUser;
    }

    @Override
    public void addUser(RegistrationDTO registrationDTO) {

        User user = this.modelMapper.map(registrationDTO, User.class);
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));

        this.userRepository.save(user);

    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public boolean isPasswordMatching(LoginDTO loginDTO) {
       Optional<User> optionalUser =  this.userRepository.findByEmail(loginDTO.getEmail());

        if(optionalUser.isPresent()) {

            User user = optionalUser.get();

            return this.passwordEncoder.matches(loginDTO.getPassword(), user.getPassword());
        }
        return false;
    }

    @Override
    public void setCurrentUser(User user) {
        this.loggedUser.setUsername(user.getUsername());
    }

    @Override
    public String getCurrentUser() {
        return this.loggedUser.getUsername();
    }
}
