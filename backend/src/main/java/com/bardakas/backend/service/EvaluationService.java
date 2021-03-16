package com.bardakas.backend.service;

import com.bardakas.backend.entity.*;
import com.bardakas.backend.exception.EvaluationNotFoundException;
import com.bardakas.backend.repository.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EvaluationService {

    private EvaluationRepository evaluationRepository;

    @Autowired
    public EvaluationService(EvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }

    public List<Evaluation> getAllEvaluations() {
        return evaluationRepository.findAll();
    }

    public Evaluation getEvaluationById(long id) throws EvaluationNotFoundException {
        return evaluationRepository.findById(id).orElseThrow(() -> new EvaluationNotFoundException(id));
    }

    public void deleteEvaluationById(long id) throws EvaluationNotFoundException {
        Evaluation evaluation = evaluationRepository.findById(id).orElseThrow(() -> new EvaluationNotFoundException(id));
        evaluationRepository.delete(evaluation);
    }

    public void updateEvaluation(Evaluation evaluation) throws EvaluationNotFoundException {
        long id = evaluation.getId();
        Optional<Evaluation> eval = evaluationRepository.findById(id);
        if (eval.isPresent()) {
            evaluationRepository.save(evaluation);
        } else {
            throw new EvaluationNotFoundException(id);
        }
    }

    public void createEvaluation(Evaluation evaluation) {
        evaluationRepository.save(evaluation);
    }
}
