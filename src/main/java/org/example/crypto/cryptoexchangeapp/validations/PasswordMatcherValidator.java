package org.example.crypto.cryptoexchangeapp.validations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.example.crypto.cryptoexchangeapp.model.dto.RegistrationDTO;
import org.example.crypto.cryptoexchangeapp.validations.anotations.PasswordMatcher;

public class PasswordMatcherValidator implements ConstraintValidator<PasswordMatcher, RegistrationDTO> {

    @Override
    public boolean isValid(RegistrationDTO dto, ConstraintValidatorContext context) {
        // Check if either password is null
        if (dto.getPassword() == null || dto.getConfirmPassword() == null) {
            return false;
        }

        boolean valid = dto.getPassword().equals(dto.getConfirmPassword());
        if (!valid) {
            // Disable default violation message
            context.disableDefaultConstraintViolation();
            // Build a new constraint violation message and attach it to the confirmPassword field
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                    .addPropertyNode("confirmPassword")
                    .addConstraintViolation();
        }
        return valid;
    }
}
