package com.bardakas.backend.exception;

public class TeacherUsernameNotFoundException extends RuntimeException{
    public TeacherUsernameNotFoundException(String username) {
        super("A teacher with the username of " + username + " was not found!");
    }
}
