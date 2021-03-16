package com.bardakas.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class TeacherExceptionController {

    @ExceptionHandler(value = TeacherIdNotFoundException.class)
    public ResponseEntity<Object> exception(TeacherIdNotFoundException exception){
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = TeacherIdAlreadyExistsException.class)
    public ResponseEntity<Object> exception(TeacherIdAlreadyExistsException exception){
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = TeacherPasswordInvalidException.class)
    public ResponseEntity<Object> exception(TeacherPasswordInvalidException exception){
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = TeacherUsernameNotFoundException.class)
    public ResponseEntity<Object> exception(TeacherUsernameNotFoundException exception){
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = TeacherUsernameAlreadyExistsException.class)
    public ResponseEntity<Object> exception(TeacherUsernameAlreadyExistsException exception){
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.CONFLICT);
    }
}
