export enum OveralGrades {
  NOT_RECOMMENDED = '< 2 not recommended',
  AVERAGE = '2-3 average',
  GOOD = '3-4 good',
  VERY_GOOD = '4-5 very good',
}

export namespace OveralGrades {
  export function getOverAllGradeEnumString(overallGrade: string): string {
    switch (overallGrade) {
      case 'NOT_RECOMMENDED': {
        return OveralGrades.NOT_RECOMMENDED;
      }
      case 'AVERAGE': {
        return OveralGrades.AVERAGE;
      }
      case 'GOOD': {
        return OveralGrades.GOOD;
      }
      case 'VERY_GOOD': {
        return OveralGrades.VERY_GOOD;
      }
      default: {
        return '';
      }
    }
  }
}