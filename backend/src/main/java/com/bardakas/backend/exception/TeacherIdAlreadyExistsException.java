package com.bardakas.backend.exception;

public class TeacherIdAlreadyExistsException extends RuntimeException{
    public TeacherIdAlreadyExistsException(Long id) {
        super("A teacher with the id of " + id + " already exists!");
    }
}
