export interface Evaluation {
  id: number;
  stream: string;
  studentId: number;
  teacherId: number;
  teacherComment?: string;
  communicationGrade: string;
  communicationComment?: string;
  isExtraMile: boolean;
  extraMileComments?: string;
  isMotivated: boolean;
  motivationComments?: string;
  abilityToLearnGrade: string;
  abilityToLearnComments?: string;
  directionComments:string;
  overallEvaluation: string;
  overallComments: string;
  createdAt?: number;
  updatedAt?: number;
}
