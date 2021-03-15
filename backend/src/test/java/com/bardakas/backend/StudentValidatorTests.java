package com.bardakas.backend;

import com.bardakas.backend.entity.Student;
import com.bardakas.backend.exception.ValidationException;
import com.bardakas.backend.validator.StudentValidator;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class StudentValidatorTests {

    @Autowired
    private StudentValidator studentValidator;


    private final String testStringOver64Characters = RandomStringUtils.randomAlphabetic(65);
    private final String testStringBlank = " ";
    private final String testStringUnder64CharactersAndNotBlank = RandomStringUtils.randomAlphabetic(15);


    @Test
    public void validate_StudentNameOver64Characters_ExceptionThrown() {
        Assertions.assertThrows(ValidationException.class, () -> {
            Student testStudent = new Student();
            testStudent.setName(testStringOver64Characters);
            testStudent.setSurname(testStringUnder64CharactersAndNotBlank);
            studentValidator.validate(testStudent);
        });
    }

    @Test
    public void validate_StudentNameBlank_ExceptionThrown() {
        Assertions.assertThrows(ValidationException.class, () -> {
            Student testStudent = new Student();
            testStudent.setName(testStringBlank);
            testStudent.setSurname(testStringUnder64CharactersAndNotBlank);
            studentValidator.validate(testStudent);
        });
    }

    @Test
    public void validate_StudentSurnameOver64Characters_ExceptionThrown() {
        Assertions.assertThrows(ValidationException.class, () -> {
            Student testStudent = new Student();
            testStudent.setName(testStringUnder64CharactersAndNotBlank);
            testStudent.setSurname(testStringOver64Characters);
            studentValidator.validate(testStudent);
        });
    }

    @Test
    public void validate_StudentSurnameBlank_ExceptionThrown() {
        Assertions.assertThrows(ValidationException.class, () -> {
            Student testStudent = new Student();
            testStudent.setName(testStringUnder64CharactersAndNotBlank);
            testStudent.setSurname(testStringBlank);
            studentValidator.validate(testStudent);
        });
    }

    @Test
    public void validate_StudentNameAndSurnameUnder64CharactersAndNotBlank_ExceptionNotThrown() {
        Assertions.assertDoesNotThrow(() -> {
            Student testStudent = new Student();
            testStudent.setName(testStringUnder64CharactersAndNotBlank);
            testStudent.setSurname(testStringUnder64CharactersAndNotBlank);
            studentValidator.validate(testStudent);
        });
    }


}
