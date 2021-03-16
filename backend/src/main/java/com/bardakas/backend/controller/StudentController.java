package com.bardakas.backend.controller;

import com.bardakas.backend.entity.Student;
import com.bardakas.backend.exception.StudentNotFoundException;
import com.bardakas.backend.service.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private StudentServiceImpl studentService;

    @Autowired
    public StudentController(StudentServiceImpl studentService) {
        this.studentService = studentService;
    }


    @GetMapping
    public ResponseEntity<List<Student>> getStudents() {
        List<Student> list = studentService.getAll();
        return new ResponseEntity<List<Student>>(list, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable("id") Long id) {
        return new ResponseEntity<Student>(studentService.getById(id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable("id") Long id) {
        try {
            studentService.delete(id);
            return ResponseEntity.ok().build();
        } catch (StudentNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Void> addStudent(@RequestBody Student student, UriComponentsBuilder builder) {
        studentService.add(student);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/{id}").buildAndExpand(student.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
        studentService.update(student);
        return new ResponseEntity<Student>(student, HttpStatus.OK);
    }

}
