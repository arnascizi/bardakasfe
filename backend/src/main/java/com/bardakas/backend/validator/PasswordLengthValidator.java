package com.bardakas.backend.validator;

import com.bardakas.backend.exception.ValidationException;
import org.springframework.stereotype.Component;

@Component
public class PasswordLengthValidator extends Validator<String>{

    @Override
    public void validate(String attribute, String message) {
        if(attribute.length()>60) {
            throw new ValidationException(message);
        }
    }
}
