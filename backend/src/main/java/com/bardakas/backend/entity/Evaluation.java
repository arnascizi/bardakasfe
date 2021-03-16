package com.bardakas.backend.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "evaluation")
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @NotNull
    @Column(name = "stream")
    Stream stream;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    Teacher teacher;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    Student student;

    @NotNull
    @Column(name = "communication_grade")
    Grade communicationGrade;

    @Column(name = "communication_comments")
    String communicationComment;

    @NotNull
    @Column(name = "is_extramile")
    Boolean isExtraMile;

    @Column(name = "is_extramile_comments")
    String extraMileComments;

    @NotNull
    @Column(name = "is_motivated")
    Boolean isMotivated;

    @Column(name = "motivation_comments")
    String motivationComments;

    @Column(name = "direction_comments")
    String directionComments;

    @NotNull
    @Column(name = "ability_to_learn_grade")
    Grade abilityToLearnGrade;

    @Column(name = "ability_to_learn_comments")
    String abilityToLearnComments;

    @NotNull
    @Column(name = "overall_evaluation")
    OverallEvaluation overallEvaluation;

    @NotBlank
    @NotNull
    @Column(name = "overall_comments")
    String overallComments;

    @NotNull
    @Column(name = "created_at")
    Date createdAt;

    @Column(name = "updated_at")
    Date updatedAt;
}

