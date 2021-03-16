package com.bardakas.backend.exception;

public class TeacherIdNotFoundException extends RuntimeException {
    public TeacherIdNotFoundException(Long id) {
        super("A teacher with the id of " + id + " does not exist!");
    }
}
