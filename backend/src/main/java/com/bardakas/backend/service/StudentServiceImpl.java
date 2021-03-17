package com.bardakas.backend.service;

import com.bardakas.backend.entity.Student;
import com.bardakas.backend.exception.StudentNotFoundException;
import com.bardakas.backend.repository.StudentRepository;
import com.bardakas.backend.validator.StudentValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl {

    private StudentRepository studentRepository;
    private StudentValidator studentValidator;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, StudentValidator studentValidator) {
        this.studentValidator = studentValidator;
        this.studentRepository = studentRepository;
    }

    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    public Student getById(long id) {
        return studentRepository.findById(id).orElseThrow(() -> new StudentNotFoundException(id));
    }

    public void delete(long id) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new StudentNotFoundException(id));
        studentRepository.deleteById(id);
    }

    public void add(Student student) {
        Optional<Student> studentOptional = studentRepository.findById(student.getId());
        if(studentOptional.isPresent()) {
            throw new RuntimeException();
        }
        studentValidator.validate(student);
        studentRepository.save(student);

    }

    public void update(Student student) {
        long id = student.getId();
        Student optionalStudent = studentRepository.findById(id).orElseThrow(() -> new StudentNotFoundException(id));
        studentValidator.validate(student);
        studentRepository.save(student);
    }
}
