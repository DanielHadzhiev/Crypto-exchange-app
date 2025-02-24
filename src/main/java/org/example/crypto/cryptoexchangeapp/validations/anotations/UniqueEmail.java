package org.example.crypto.cryptoexchangeapp.validations.anotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import org.example.crypto.cryptoexchangeapp.validations.UniqueEmailValidator;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueEmailValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueEmail {
    String message() default "* The email should be unique";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}