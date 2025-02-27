package org.example.crypto.cryptoexchangeapp.validations.anotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import org.example.crypto.cryptoexchangeapp.validations.PasswordMatcherValidator;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PasswordMatcherValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface PasswordMatcher {
    String message() default "* The confirm password doesn't match the password";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}