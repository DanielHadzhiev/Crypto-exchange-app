package org.example.crypto.cryptoexchangeapp.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.example.crypto.cryptoexchangeapp.validations.anotations.PasswordMatcher;
import org.example.crypto.cryptoexchangeapp.validations.anotations.UniqueEmail;

@PasswordMatcher(message = "* The confirm password should match your password")
@UniqueEmail()
@Setter
@Getter
public class RegistrationDTO {

    @NotBlank(message = "* Username is required")
    private String username;

    @NotBlank(message = "* Email is required")
    @Email(message = "* Invalid email format")

    private String email;

    @NotBlank(message = "* Password is required")
    @Size(min = 6, message = "* Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "* Confirm password is required")
    private String confirmPassword;

   public RegistrationDTO() {}

    public RegistrationDTO(String username,
                           String email,
                           String password,
                           String confirmPassword) {
       this.username = username;
       this.email = email;
       this.password = password;
       this.confirmPassword = confirmPassword;
    }

}
