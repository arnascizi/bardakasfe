package com.bardakas.backend.service;

import com.bardakas.backend.entity.Teacher;
import com.bardakas.backend.exception.*;

import java.util.List;

public interface TeacherService {

    List<Teacher> getAll();

    Teacher getById(long id) throws TeacherIdNotFoundException;

    Teacher getByLogin(Teacher loginInfo) throws TeacherUsernameNotFoundException, TeacherPasswordInvalidException;

    void delete(long id) throws TeacherIdNotFoundException;

    void add(Teacher newTeacher) throws TeacherIdAlreadyExistsException, TeacherUsernameAlreadyExistsException;

    void update(Teacher updatedTeacher) throws TeacherIdNotFoundException;
}
