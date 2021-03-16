package com.bardakas.backend.validator;

import com.bardakas.backend.entity.Student;
import com.bardakas.backend.entity.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TeacherValidator {

    private MandatoryStringValueValidator mandatoryStringValueValidator;
    private NameAndSurnameLengthValidator nameAndSurnameLengthValidator;
    private UsernameLengthValidator usernameLengthValidator;
    private PasswordLengthValidator passwordLengthValidator;

    @Autowired
    public TeacherValidator(MandatoryStringValueValidator mandatoryStringValueValidator,
                            NameAndSurnameLengthValidator nameAndSurnameLengthValidator,
                            UsernameLengthValidator usernameLengthValidator,
                            PasswordLengthValidator passwordLengthValidator) {
        this.mandatoryStringValueValidator = mandatoryStringValueValidator;
        this.nameAndSurnameLengthValidator = nameAndSurnameLengthValidator;
        this.usernameLengthValidator = usernameLengthValidator;
        this.passwordLengthValidator = passwordLengthValidator;
    }

    public void validate(Teacher teacher) {
        mandatoryStringValueValidator.validate(teacher.getName(), "Teacher name cannot be blank");
        nameAndSurnameLengthValidator.validate(teacher.getName(), "Teacher name cannot exceed 64 characters");

        mandatoryStringValueValidator.validate(teacher.getSurname(), "Teacher surname cannot be blank");
        nameAndSurnameLengthValidator.validate(teacher.getSurname(), "Teacher surname cannot exceed 64 characters");

        mandatoryStringValueValidator.validate(teacher.getUsername(), "Teacher username cannot be blank");
        nameAndSurnameLengthValidator.validate(teacher.getUsername(), "Teacher username cannot exceed 64 characters");

        mandatoryStringValueValidator.validate(teacher.getUsername(), "Teacher username cannot be blank");
        usernameLengthValidator.validate(teacher.getUsername(), "Teacher username cannot exceed 64 characters");

        mandatoryStringValueValidator.validate(teacher.getPassword(), "Teacher password cannot be blank");
        passwordLengthValidator.validate(teacher.getPassword(), "Teacher password cannot exceed 60 characters");
    }
}
