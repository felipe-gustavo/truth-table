import { factoryDependency } from '../DependenciesManager';
import LogicOperator from '../LogicOperator';
import BothDependencies from '../DependenciesManager/BothDependencies';

export default class And extends LogicOperator<BothDependencies> {
  dependencies = factoryDependency('and', 'both');
  resolve() {
    return true;
    // const { dependencies} = this;
    // if (dependencies.validate()) {

    // }

    // return this.dependencies.prevProp;
  }
}
