package com.bardakas.backend.validator;

import com.bardakas.backend.exception.ValidationException;
import io.micrometer.core.instrument.util.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class MandatoryStringValueValidator extends Validator<String> {
    @Override
    public void validate(String attribute, String message) {
        if(StringUtils.isBlank(attribute)) {
            throw new ValidationException(message);
        }
    }
}
