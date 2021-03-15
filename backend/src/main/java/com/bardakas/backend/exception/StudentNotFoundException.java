package com.bardakas.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

public class StudentNotFoundException extends ResponseStatusException {
    public StudentNotFoundException(long id) {
        super(HttpStatus.NOT_FOUND, "Could not find student with the following id: " + id);
    }
}
