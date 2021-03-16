package com.bardakas.backend.exception;

public class EvaluationNotFoundException extends RuntimeException {

    public EvaluationNotFoundException(long id) {
        super("Can't find evaluation with " + id);
    }
}
