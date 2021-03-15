package com.bardakas.backend.controller;

import com.bardakas.backend.entity.Teacher;
import com.bardakas.backend.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    private TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping
    public ResponseEntity<List<Teacher>> getTeachers() {
        List<Teacher> list = teacherService.getAll();
        return new ResponseEntity<List<Teacher>>(list, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable("id") Long id) {
        Teacher teacher = teacherService.getById(id);
        return new ResponseEntity<Teacher>(teacher, HttpStatus.OK);
    }

    @GetMapping("login")
    public ResponseEntity<Teacher> getTeacherByLogin(@RequestBody Teacher loginInfo) {
        Teacher teacher = teacherService.getByLogin(loginInfo);
        return new ResponseEntity<Teacher>(teacher, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable("id") Long id) {
        teacherService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> addTeacher(@RequestBody Teacher teacher) {
        teacherService.add(teacher);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Teacher> updateTeacher(@RequestBody Teacher teacher) {
        teacherService.update(teacher);
        return ResponseEntity.ok().build();
    }
}
