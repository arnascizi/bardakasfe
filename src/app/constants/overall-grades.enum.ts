export enum OveralGrades {
  '< 2 not recommended' = 1,
  '2-3 average' = 2,
  '3-4 good' = 3,
  '4-5 very good' = 4,
}

export namespace OveralGrades {
  export function values() {
    return Object.keys(OveralGrades).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
