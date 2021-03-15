import Prop from '../Prop';
import PrevDepends from './PrevDepends';
import NextDepends from './NextDepends';
import BothDependencies from './BothDependencies';
import ValidatorProps, { PositionsProp } from './ValidatorProps';

export type AllDependences = BothDependencies | PrevDepends | NextDepends;

type PropsInfo = { hasProp: boolean; prop: Prop | undefined };

const usePropsInfo = Symbol();
const validator = Symbol();

export default class DependenciesManager<Dependeces extends AllDependences> {
  prevProp!: Dependeces['prev'] extends true ? Prop : never;

  nextProp!: Dependeces['next'] extends true ? Prop : never;

  [validator] = new ValidatorProps(this.operatorName);

  constructor(
    readonly operatorName: string,
    readonly hasPrevProp: Dependeces['prev'],
    readonly hasNextProp: Dependeces['next'],
  ) {}

  [usePropsInfo](pos: PositionsProp): PropsInfo;
  [usePropsInfo](pos: any): null;
  [usePropsInfo](pos: PositionsProp): PropsInfo | null {
    switch (pos) {
      case 'prev':
        return {
          hasProp: this.hasPrevProp,
          prop: this.prevProp,
        };
      case 'next':
        return {
          hasProp: this.hasNextProp,
          prop: this.nextProp,
        };
      default:
        return null;
    }
  }

  validPos(pos: PositionsProp): string[];
  validPos(pos: any): null;
  validPos(pos: PositionsProp): string[] | null {
    if (pos !== 'prev' && pos !== 'next') {
      return null;
    }
    const { hasProp, prop } = this[usePropsInfo](pos);
    const errors: string[] = [];

    if (hasProp) {
      errors.push(...this[validator].validPropRequire(pos, prop));
      errors.push(...this[validator].validPropAmbiguous(pos, prop));
    }

    return errors;
  }

  validate(getMessages?: false): boolean;
  validate(getMessages: true): string[];
  validate(getMessages: boolean = false): string[] | boolean {
    const passes = {
      prev: this.validPos('prev'),
      next: this.validPos('next'),
    };

    if (getMessages) {
      return Object.values(passes).reduce((arr, dep) => arr.concat(dep), []);
    }
    return !passes.prev.length && !passes.next.length;
  }
}
