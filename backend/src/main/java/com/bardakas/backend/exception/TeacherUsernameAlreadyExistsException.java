package com.bardakas.backend.exception;

public class TeacherUsernameAlreadyExistsException extends RuntimeException{
    public TeacherUsernameAlreadyExistsException(String username) {
        super("The username " + username + " is already taken!");
    }
}
