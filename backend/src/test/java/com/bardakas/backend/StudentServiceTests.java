package com.bardakas.backend;

import com.bardakas.backend.entity.Student;
import com.bardakas.backend.exception.StudentNotFoundException;
import com.bardakas.backend.exception.ValidationException;
import com.bardakas.backend.repository.StudentRepository;
import com.bardakas.backend.service.StudentServiceImpl;
import com.bardakas.backend.validator.StudentValidator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;


@SpringBootTest
public class StudentServiceTests {

    @Mock
    private StudentValidator studentValidator;

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentServiceImpl studentService = new StudentServiceImpl(studentRepository, studentValidator);


    @Test
    public void getById_StudentWithIdExists_ReturnsStudent() {
        Student testStudent = new Student();
        testStudent.setId(1);
        testStudent.setName("TestName");
        testStudent.setSurname("TestSurname");
        when(studentRepository.findById(testStudent.getId())).thenReturn(java.util.Optional.of(testStudent));
        Assertions.assertEquals(testStudent.getName(), studentService.getById(testStudent.getId()).getName());
        Assertions.assertEquals(testStudent.getSurname(), studentService.getById(testStudent.getId()).getSurname());
    }

    @Test
    public void getById_StudentWithIdDoesNotExist_ExceptionThrown() {
        long id = anyLong();
        when(studentRepository.findById(id)).thenThrow(new StudentNotFoundException(id));
        Assertions.assertThrows(StudentNotFoundException.class, () -> {
            Assertions.assertEquals(id, studentService.getById(id).getId());
        });
    }

    @Test
    public void delete_StudentWithIdExists_ExceptionNotThrown() {
        Student testStudent = new Student();
        testStudent.setId(1);
        testStudent.setName("TestName");
        testStudent.setSurname("TestSurname");
        when(studentRepository.findById(testStudent.getId())).thenReturn(java.util.Optional.of(testStudent));
        studentService.delete(testStudent.getId());
        verify(studentRepository).deleteById(testStudent.getId());

    }

    @Test
    public void delete_StudentWithIdDoesNotExist_ExceptionThrown() {
        long id = anyLong();
        when(studentRepository.findById(id)).thenThrow(new StudentNotFoundException(id));
        Assertions.assertThrows(StudentNotFoundException.class, () -> {
            studentService.delete(id);
        });
    }

    @Test
    public void add_StudentPassesValidation_ExceptionNotThrown() {
        Student testStudent = new Student();
        testStudent.setId(1);
        testStudent.setName("TestName");
        testStudent.setSurname("TestSurname");
        studentService.add(testStudent);
        verify(studentRepository).save(testStudent);
    }

    @Test
    public void add_StudentDoesNotPassValidation_ExceptionThrown() {
        Student testStudent = new Student();
        testStudent.setId(1);
        testStudent.setName("TestName");
        testStudent.setSurname("TestSurname");
        when(studentRepository.findById(testStudent.getId())).thenReturn(Optional.empty());
        doThrow(new ValidationException("")).when(studentValidator).validate(testStudent);
        Assertions.assertThrows(ValidationException.class, () -> {
            studentService.add(testStudent);
        });
    }

    @Test
    public void update_StudentWithIdDoesNotExist_ExceptionThrown() {
        Student testStudent = new Student();
        testStudent.setId(1);
        testStudent.setName("TestName");
        testStudent.setSurname("TestSurname");
        when(studentRepository.findById(testStudent.getId())).thenThrow(new StudentNotFoundException(testStudent.getId()));
        Assertions.assertThrows(StudentNotFoundException.class, () -> {
           studentService.update(testStudent);
        });
    }

    @Test
    public void update_StudentDoesNotPassValidation_ExceptionThrown() {
        Student testStudent = new Student();
        testStudent.setId(1);
        testStudent.setName("TestName");
        testStudent.setSurname("TestSurname");
        when(studentRepository.findById(testStudent.getId())).thenReturn(Optional.of(testStudent));
        doThrow(new ValidationException("")).when(studentValidator).validate(testStudent);
        Assertions.assertThrows(ValidationException.class, () -> {
           studentService.update(testStudent);
        });
    }

    @Test
    public void update_StudentWithIdExistsAndPassesValidation_ExceptionNotThrown() {
        Student testStudent = new Student();
        testStudent.setId(1);
        testStudent.setName("TestName");
        testStudent.setSurname("TestSurname");
        when(studentRepository.findById(testStudent.getId())).thenReturn(Optional.of(testStudent));
        studentService.update(testStudent);
        verify(studentRepository).save(testStudent);
    }
}
