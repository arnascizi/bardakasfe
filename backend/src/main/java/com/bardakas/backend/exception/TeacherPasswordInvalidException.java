package com.bardakas.backend.exception;

public class TeacherPasswordInvalidException extends RuntimeException{
    public TeacherPasswordInvalidException(String password) {
        super("The password is invalid!");
    }
}
