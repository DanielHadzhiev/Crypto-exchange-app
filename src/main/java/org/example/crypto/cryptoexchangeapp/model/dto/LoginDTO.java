package org.example.crypto.cryptoexchangeapp.model.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {

    @NotBlank(message = "* Email is required")
    @Email(message = "* Invalid email format")
    private String email;

    @NotBlank(message = "* Password is required")
    @Size(min = 6, message = "* Password must be at least 6 characters")
    private String password;

}
