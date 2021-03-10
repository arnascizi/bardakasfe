package com.bardakas.backend.validator;

public abstract class Validator<T> {
    public abstract void validate(T attribute, String message);
}
