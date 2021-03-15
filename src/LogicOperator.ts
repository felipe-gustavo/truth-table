import Prop from './Prop';
import DependenciesManager, { AllDependences } from './DependenciesManager';

export default abstract class LogicOperator<
  DependeceType extends AllDependences
> extends Prop {
  abstract dependencies: DependenciesManager<DependeceType>;
}
