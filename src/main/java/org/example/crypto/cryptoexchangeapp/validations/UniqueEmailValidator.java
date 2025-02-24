package org.example.crypto.cryptoexchangeapp.validations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.example.crypto.cryptoexchangeapp.model.dto.RegistrationDTO;
import org.example.crypto.cryptoexchangeapp.service.UserService;
import org.example.crypto.cryptoexchangeapp.validations.anotations.UniqueEmail;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, RegistrationDTO> {

    private final UserService userService;

    @Autowired
    public UniqueEmailValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean isValid(RegistrationDTO dto, ConstraintValidatorContext context) {


        boolean valid = this.userService.getUserByEmail(dto.getEmail()).isEmpty();
        if (!valid) {
            // Disable default violation message
            context.disableDefaultConstraintViolation();
            // Build a new constraint violation message and attach it to the confirmPassword field
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                    .addPropertyNode("email")
                    .addConstraintViolation();
        }
        return valid;
    }
}
