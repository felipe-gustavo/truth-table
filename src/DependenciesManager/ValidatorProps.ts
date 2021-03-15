import LogicOperator from '../LogicOperator';
import Prop from '../Prop';

export type PositionsProp = 'prev' | 'next';

export default class ValidatorPops {
  constructor(readonly operatorName: string) {}

  validPropRequire(propPos: PositionsProp, prop?: Prop): string[] {
    const messages: string[] = [];

    if (!prop) {
      messages.push(
        `The Logic Operator \`${this.operatorName}\` requires a ${propPos} proposition to resolve, must be a sentence or another Logic Operator`,
      );
    }

    return messages;
  }

  validPropAmbiguous(propPos: PositionsProp, prop?: Prop): string[] {
    const messages: string[] = [];

    if (prop instanceof LogicOperator) {
      const hasSameDep =
        propPos === 'prev'
          ? prop.dependencies.hasNextProp
          : prop.dependencies.hasPrevProp;

      if (hasSameDep) {
        const ambiguousOperatorName = prop.dependencies.operatorName;
        messages.push(
          `Has an ambiguous dependence between logic operators \`${ambiguousOperatorName}\`) and \`${this.operatorName}\``,
        );
      }
    }

    return messages;
  }
}
