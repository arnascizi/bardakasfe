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
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;
    private StudentValidator studentValidator;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, StudentValidator studentValidator) {
        this.studentValidator = studentValidator;
        this.studentRepository = studentRepository;
    }

    @Override
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @Override
    public Student getById(long id) {
        return studentRepository.findById(id).orElseThrow(() -> new StudentNotFoundException(id));
    }

    @Override
    public boolean delete(long id) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new StudentNotFoundException(id));
        studentRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean add(Student student) {
        Optional<Student> studentOptional = studentRepository.findById(student.getId());
        if(studentOptional.isPresent()) {
            return false;
        } else {
            studentValidator.validate(student);
            studentRepository.save(student);
            return true;
        }
    }

    @Override
    public boolean update(Student student) {
        long id = student.getId();
        Optional<Student> studentOptional = studentRepository.findById(id);
        if(studentOptional.isPresent()) {
            studentValidator.validate(student);
            studentRepository.save(student);
            return true;
        } else {
            throw new StudentNotFoundException(id);
        }
    }
}
