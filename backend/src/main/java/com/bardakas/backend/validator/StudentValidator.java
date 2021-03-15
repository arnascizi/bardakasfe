package com.bardakas.backend.validator;

import com.bardakas.backend.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StudentValidator{

    private MandatoryStringValueValidator mandatoryStringValueValidator;
    private NameAndSurnameLengthValidator nameAndSurnameLengthValidator;

    @Autowired
    public StudentValidator(MandatoryStringValueValidator mandatoryStringValueValidator, NameAndSurnameLengthValidator nameAndSurnameLengthValidator) {
        this.mandatoryStringValueValidator = mandatoryStringValueValidator;
        this.nameAndSurnameLengthValidator = nameAndSurnameLengthValidator;
    }

    public void validate(Student student) {
        mandatoryStringValueValidator.validate(student.getName(), "Student name cannot be blank");
        nameAndSurnameLengthValidator.validate(student.getName(), "Student name cannot exceed 64 characters");
        mandatoryStringValueValidator.validate(student.getSurname(), "Student surname cannot be blank");
        nameAndSurnameLengthValidator.validate(student.getSurname(), "Student surname cannot exceed 64 characters");
    }
}
