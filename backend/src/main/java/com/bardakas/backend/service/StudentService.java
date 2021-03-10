package com.bardakas.backend.service;

import com.bardakas.backend.entity.Student;

import java.util.List;

public interface StudentService {

    List<Student> getAll();

    Student getById(long id);

    boolean delete(long id);

    boolean add(Student student);

    boolean update(Student student);
}
