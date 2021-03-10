package com.bardakas.backend.validator;

import com.bardakas.backend.exception.ValidationException;

public class NameAndSurnameLengthValidator extends Validator<String>{

    @Override
    public void validate(String attribute, String message) {
        if(attribute.length()>60) {
            throw new ValidationException(message);
        }
    }
}
