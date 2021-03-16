package com.bardakas.backend.service;

import com.bardakas.backend.entity.Teacher;
import com.bardakas.backend.exception.*;
import com.bardakas.backend.repository.TeacherRepository;
import com.bardakas.backend.validator.NameAndSurnameLengthValidator;
import com.bardakas.backend.validator.TeacherValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherServiceImp implements TeacherService {

    private TeacherRepository teacherRepository;
    private TeacherValidator teacherValidator;

    @Autowired
    public TeacherServiceImp(TeacherRepository teacherRepository, TeacherValidator teacherValidator) {
        this.teacherRepository = teacherRepository;
        this.teacherValidator = teacherValidator;
    }

    @Override
    public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }

    @Override
    public Teacher getById(long id) throws TeacherIdNotFoundException {
        return teacherRepository.findById(id).orElseThrow(() -> new TeacherIdNotFoundException(id));
    }

    @Override
    public Teacher getByLogin(Teacher loginInfo) throws TeacherUsernameNotFoundException, TeacherPasswordInvalidException {
        Teacher teacher = teacherRepository.findByUsername(loginInfo.getUsername())
                .orElseThrow(() -> new TeacherUsernameNotFoundException(loginInfo.getUsername()));

        if (teacher.getPassword().contentEquals(loginInfo.getPassword()))
            return teacher;
        else
            throw new TeacherPasswordInvalidException(loginInfo.getPassword());
    }

    @Override
    public void delete(long id) throws TeacherIdNotFoundException {
        Teacher teacher = teacherRepository.findById(id).orElseThrow(() -> new TeacherIdNotFoundException(id));
        teacherRepository.delete(teacher);
    }

    @Override
    public void add(Teacher newTeacher) throws TeacherIdAlreadyExistsException, TeacherUsernameAlreadyExistsException {
        teacherValidator.validate(newTeacher);

        if (teacherRepository.findById(newTeacher.getId()).isPresent())
            throw new TeacherIdAlreadyExistsException(newTeacher.getId());
        else if (teacherRepository.findByUsername(newTeacher.getUsername()).isPresent())
            throw new TeacherUsernameAlreadyExistsException(newTeacher.getUsername());
        else
            teacherRepository.save(newTeacher);
    }

    @Override
    public void update(Teacher updatedTeacher) throws TeacherIdNotFoundException {
        Teacher teacher = teacherRepository.findById(updatedTeacher.getId())
                .orElseThrow(() -> new TeacherIdNotFoundException(updatedTeacher.getId()));

        teacherValidator.validate(updatedTeacher);

        teacherRepository.save(updatedTeacher);
    }
}
