export interface Evaluation {
  id: number;
  stream: string;
  studentId: number;
  teacherId: number;
  communication_Grade: number;
  communication_comments: string;
  is_extramile: boolean;
  is_extramile_comments: string;
  is_motivated: boolean;
  motivation_comments: string;
  ability_to_learn_grade: number;
  ability_to_learn_comments: string;
  overall_comments: string;
  created_at: number;
  updated_at: number;
}
