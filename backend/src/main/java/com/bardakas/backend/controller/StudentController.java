package com.bardakas.backend.controller;

import com.bardakas.backend.entity.Student;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @GetMapping
    public ResponseEntity<List<Student>> getStudents() {
        //Waiting for service implementation, placeholder code
        List<Student> list = new ArrayList<>();
        return new ResponseEntity<List<Student>>(list, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable("id") Long id) {
        //Waiting for service implementation, placeholder code
        return new ResponseEntity<Student>(new Student(), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable("id") Long id) {
        //Waiting for service implementation, placeholder code
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> addStudent(@RequestBody Student student, UriComponentsBuilder builder) {
        //Waiting for service implementation, placeholder code
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
        //Waiting for service implementation, placeholder code
        return new ResponseEntity<Student>(new Student(), HttpStatus.OK);
    }

}
