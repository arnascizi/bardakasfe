export enum Streams {
  'BE',
  'FE',
  'UX',
  'QA',
}

export namespace Streams {
    export function values() {
      return Object.keys(Streams).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }