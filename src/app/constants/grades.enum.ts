export enum Grades {
  '1. Good' = 1,
  '2. Avarage' = 2,
  '3. Weak' = 3,
}

export namespace Grades {
  export function values() {
    return Object.keys(Grades).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
