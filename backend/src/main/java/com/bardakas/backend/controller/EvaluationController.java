package com.bardakas.backend.controller;

import com.bardakas.backend.entity.Evaluation;
import com.bardakas.backend.exception.EvaluationNotFoundException;
import com.bardakas.backend.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/evaluations")
public class EvaluationController {

    private final EvaluationService evaluationService;

    @Autowired
    public EvaluationController(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    @GetMapping
    public ResponseEntity<List<Evaluation>> getEvaluations() {
        List<Evaluation> list = evaluationService.getAllEvaluations();
        return new ResponseEntity<List<Evaluation>>(list, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Evaluation> getEvaluationById(@PathVariable("id") Long id) {
        try {
            Evaluation evaluation = evaluationService.getEvaluationById(id);
            return new ResponseEntity<Evaluation>(evaluation, HttpStatus.OK);
        } catch (EvaluationNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEvaluationById(@PathVariable("id") Long id) {
        try {
            evaluationService.deleteEvaluationById(id);
            return ResponseEntity.ok().build();
        } catch (EvaluationNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Evaluation> addEvaluation(@RequestBody Evaluation evaluation) {
        evaluationService.createEvaluation(evaluation);
        return new ResponseEntity<Evaluation>(evaluation, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Evaluation> updateEvaluation(@RequestBody Evaluation evaluation) {
        try {
            evaluationService.updateEvaluation(evaluation);
            return new ResponseEntity<Evaluation>(evaluation, HttpStatus.OK);
        } catch (EvaluationNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
